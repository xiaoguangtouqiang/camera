package com.photo.service;

import com.photo.domain.ImageInfo;
import com.photo.domain.Photo;
import com.photo.repository.ImageInfoRepository;
import com.photo.repository.PhotoRepository;
import com.photo.service.dto.FileDTO;
import com.photo.service.dto.PhotoDTO;
import com.photo.service.fs.Location;
import com.photo.service.mapper.ImageInfoMapper;
import com.photo.service.mapper.PhotoMapper;
import com.photo.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;


/**
 * Service Implementation for managing Photo.
 */
@Service
@Transactional
public class PhotoService {

    private final Logger log = LoggerFactory.getLogger(PhotoService.class);

    private final PhotoRepository photoRepository;

    private final PhotoMapper photoMapper;

    @Autowired
    private ImageInfoMapper imageInfoMapper;

    private final ImageInfoRepository imageInfoRepository;

    public PhotoService(PhotoRepository photoRepository, PhotoMapper photoMapper, ImageInfoRepository imageInfoRepository) {
        this.photoRepository = photoRepository;
        this.photoMapper = photoMapper;
        this.imageInfoRepository = imageInfoRepository;
    }

    /**
     * Save a photo.
     *
     * @param photoDTO the entity to save
     * @return the persisted entity
     */
    @Transactional
    public PhotoDTO save(PhotoDTO photoDTO) throws IOException {
        log.debug("Request to save Photo : {}", photoDTO);
        Photo photo = photoMapper.toEntity(photoDTO);
        photo = photoRepository.save(photo);

        String photoId = photo.getId();
        List<FileDTO> uploadFiles = photoDTO.getUploadFiles();
        if (uploadFiles == null || uploadFiles.size() == 0) {
            throw new CustomParameterizedException("请上传图片!");
        }
        for (FileDTO uploadFile : uploadFiles) {
            String name = transferImageName(uploadFile.getName());
            String targetPath = saveFile(uploadFile.getPath(), name);
            ImageInfo imageInfo = new ImageInfo();
            imageInfo.setPhotoId(photoId);
            imageInfo.setName(name);
            imageInfo.setPath(targetPath);
            imageInfoRepository.save(imageInfo);
        }
        return photoMapper.toDto(photo);
    }

    private String saveFile(String sourcePath, String name) throws IOException {
        File source = new File(sourcePath);
        File target = Location.getUploadImagePath(name).toFile();
        if (!target.getParentFile().exists()) {
            target.getParentFile().mkdirs();
        }
        Files.move(source.toPath(), target.toPath(), StandardCopyOption.REPLACE_EXISTING);
        return target.getPath();
    }

    private String transferImageName(String name) {
        return new Date().getTime() + "_" + name;
    }

    /**
     * Get all the photos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PhotoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Photos");
        return photoRepository.findAll(pageable)
            .map(photoMapper::toDto);
    }

    /**
     * Get one photo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PhotoDTO findOne(String id) {
        log.debug("Request to get Photo : {}", id);
        Photo photo = photoRepository.findOne(id);
        PhotoDTO photoDTO = photoMapper.toDto(photo);

        return photoDTO;
    }

    /**
     * Delete the  photo by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Photo : {}", id);
        photoRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public Page<PhotoDTO> listPhotosByUser(Pageable pageable, String user) {
        Page<Photo> photos = photoRepository.findAllByCreatedBy(pageable, user);
        Page<PhotoDTO> photoDTOS = photos.map(t -> photoMapper.toDto(t));
        photoDTOS.forEach(p -> {
            List<ImageInfo> imageInfos = imageInfoRepository.findAllByPhotoId(p.getId());
            p.setImages(imageInfoMapper.toDto(imageInfos));
        });
        return photoDTOS;
    }
}
