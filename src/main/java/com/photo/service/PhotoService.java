package com.photo.service;

import com.photo.domain.ImageInfo;
import com.photo.domain.Photo;
import com.photo.repository.PhotoRepository;
import com.photo.security.SecurityUtils;
import com.photo.service.dto.FileDTO;
import com.photo.service.dto.PhotoDTO;
import com.photo.service.fs.Location;
import com.photo.service.mapper.PhotoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
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

    public PhotoService(PhotoRepository photoRepository, PhotoMapper photoMapper) {
        this.photoRepository = photoRepository;
        this.photoMapper = photoMapper;
    }

    /**
     * Save a photo.
     *
     * @param photoDTO the entity to save
     * @return the persisted entity
     */
    public PhotoDTO save(PhotoDTO photoDTO) {
        log.debug("Request to save Photo : {}", photoDTO);
        Photo photo = photoMapper.toEntity(photoDTO);
        photo = photoRepository.save(photo);
        //
        String login = SecurityUtils.getCurrentUserLogin();
        String photoId = photo.getId();
        List<FileDTO> uploadFiles = photoDTO.getUploadFiles();
        for (int i = 0; i < uploadFiles.size(); i++) {
            ImageInfo imageInfo = new ImageInfo();
            imageInfo.setPhotoId(photoId);
            imageInfo.setName(uploadFiles.get(i).getName());
            File sourceFile = new File(uploadFiles.get(i).getPath());
            File targetFile = new File(Location.getUserUploadPath(login));
//            imageInfo.setPath();
        }


        return photoMapper.toDto(photo);
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
        return photoMapper.toDto(photo);
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
}
