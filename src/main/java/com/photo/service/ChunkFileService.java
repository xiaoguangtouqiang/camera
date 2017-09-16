package com.photo.service;

import com.photo.service.dto.ChunkFileDTO;
import com.photo.service.dto.ChunkFinishDTO;
import com.photo.service.dto.FileDTO;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by wangdi on 2017/9/16.
 */
@Service
public class ChunkFileService {

    private static final Logger log = LoggerFactory.getLogger(ChunkFileService.class);
    public static final String root = System.getProperty("java.io.tmpdir");

    public ChunkFileDTO save(final ChunkFileDTO chunkFile, MultipartFile file) throws IOException {

        String fileId = chunkFile.getFileId();
        log.info("save chunk file {}", fileId);
        int chunks = chunkFile.getChunks();
        int seq = chunkFile.getChunk();
        String ext = chunkFile.getExt();
        Path path = Paths.get(root, chunkFile.getUid(), chunkFile.getId());
        File dir = path.toFile();
        if (!dir.exists()) {
            boolean mkdirs = dir.mkdirs();
            log.info("createBatch chunk dir {} : {}", mkdirs, path.toAbsolutePath());
        }
        try (InputStream inputStream = file.getInputStream()) {
            String chunkFileName = chunkFile.getName();
            if (chunks > 1) {
                chunkFileName = seq + "." + ext;
            }
            Path targetPath = path.resolve(chunkFileName);
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        }

        return seq + 1 >= chunks ? chunkFile : null;

    }

    public List<FileDTO> finish(ChunkFinishDTO chunkFinishDTO) throws IOException {
        List<FileDTO> files = new ArrayList<>();
        for (ChunkFileDTO chunkFileDTO : chunkFinishDTO.getChunkFiles()) {
            files.add(finish(chunkFileDTO));
        }
        return files;
    }

    public FileDTO finish(final ChunkFileDTO chunkFile) throws IOException {
        log.info("request to finish upload chunk file :{}", chunkFile);
        FileDTO fileDTO;

        if (chunkFile.getChunks() > 0) {
            fileDTO = merge(chunkFile);
        } else {
            Path chunkDir = Paths.get(root, chunkFile.getUid(), chunkFile.getId());
            fileDTO = Files
                .list(chunkDir)
                .findAny()
                .map(p -> {
                    FileDTO chunkFileDTO = new FileDTO();
                    chunkFileDTO.setId(chunkFile.getId());
                    chunkFileDTO.setName(chunkFile.getName());
                    chunkFileDTO.setType(chunkFile.getType());
                    chunkFileDTO.setPath(p.toAbsolutePath().toString());
                    chunkFileDTO.setSize(p.toFile().length());
                    return chunkFileDTO;
                })
                .orElseGet(null);
        }

        log.info("finished upload chunk file :{}", fileDTO);

        return fileDTO;
    }

    private FileDTO merge(ChunkFileDTO chunkFile) throws IOException {
        Path chunkDir = Paths.get(root, chunkFile.getUid(), chunkFile.getId());
        List<Path> paths = Files.list(chunkDir)
            .distinct()
            .sorted(Comparator.comparing(p -> {
                String name = p.toFile().getName();
                String baseName = FilenameUtils.getBaseName(name);
                return Integer.valueOf(baseName);
            }))
            .collect(Collectors.toList());
        if (!paths.isEmpty()) {
            Path merge = chunkDir.resolve(chunkFile.getName());
            try (OutputStream outputStream = Files.newOutputStream(merge, StandardOpenOption.CREATE_NEW, StandardOpenOption.APPEND)) {
                for (Path path : paths) {
                    Files.copy(path, outputStream);
                    Files.delete(path);
                }
            }
            FileDTO fileDTO = new FileDTO();
            fileDTO.setId(chunkFile.getId());
            fileDTO.setName(chunkFile.getName());
            fileDTO.setPath(merge.toAbsolutePath().toString());
            fileDTO.setSize(merge.toFile().length());
            return fileDTO;
        }
        return null;

    }
}
