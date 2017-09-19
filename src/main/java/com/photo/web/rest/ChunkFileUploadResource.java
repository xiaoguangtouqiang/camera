package com.photo.web.rest;

import com.photo.service.ChunkFileService;
import com.photo.service.dto.ChunkFileDTO;
import com.photo.service.dto.ChunkFinishDTO;
import com.photo.service.dto.FileDTO;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * Created by wangdi on 2017/8/16.
 */
@RestController
@RequestMapping("/api")
public class ChunkFileUploadResource {
    @Autowired
    private ChunkFileService chunkFileService;

    @RequestMapping(value = "/file/upload/chunk", method = RequestMethod.POST)
    public ResponseEntity<ChunkFileDTO> upload(String uid,
                                               String id,
                                               String name,
                                               String type,
                                               String chunk,
                                               String chunks,
                                               int size,
                                               @RequestParam(value = "file") final MultipartFile file) throws IOException {
        ChunkFileDTO chunkFileDTO = getChunkFileDTO(uid, chunks, chunk, id, name, type, size);
        ChunkFileDTO result = chunkFileService.save(chunkFileDTO, file);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    private ChunkFileDTO getChunkFileDTO(String uid, String chunks, String chunk, String id, String name, String type, int size) {
        ChunkFileDTO chunkFile = new ChunkFileDTO();
        chunkFile.setUid(uid);
        chunkFile.setId(id);
        chunkFile.setName(name);
        chunkFile.setType(type);
        chunkFile.setExt(FilenameUtils.getExtension(name));
        chunkFile.setSize(size);
        chunkFile.setChunk(StringUtils.isEmpty(chunk) ? 0 : Integer.valueOf(chunk));
        chunkFile.setChunks(StringUtils.isEmpty(chunks) ? 0 : Integer.valueOf(chunks));
        return chunkFile;
    }

    @RequestMapping(value = "/file/upload/chunk", method = RequestMethod.PUT)
    public ResponseEntity upload(@RequestBody ChunkFinishDTO finishDTO) throws IOException {
        List<FileDTO> result = chunkFileService.finish(finishDTO);
        return new ResponseEntity(result, HttpStatus.OK);
    }

}
