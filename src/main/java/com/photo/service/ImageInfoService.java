package com.photo.service;

import com.photo.domain.ImageInfo;
import com.photo.repository.ImageInfoRepository;
import com.photo.web.rest.dto.ImageInfoDTO;
import com.photo.web.rest.mapper.ImageInfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;

/**
 * Service Implementation for managing ImageInfo.
 */
@Service
@Transactional
public class ImageInfoService {

    private final Logger log = LoggerFactory.getLogger(ImageInfoService.class);

    @Inject
    private ImageInfoRepository imageInfoRepository;

    @Inject
    private ImageInfoMapper imageInfoMapper;

    /**
     * Save a imageInfo.
     *
     * @param imageInfoDTO the entity to save
     * @return the persisted entity
     */
    public ImageInfoDTO save(ImageInfoDTO imageInfoDTO) {
        log.debug("Request to save ImageInfo : {}", imageInfoDTO);
        ImageInfo imageInfo = imageInfoMapper.imageInfoDTOToImageInfo(imageInfoDTO);
        imageInfo = imageInfoRepository.save(imageInfo);
        ImageInfoDTO result = imageInfoMapper.imageInfoToImageInfoDTO(imageInfo);
        return result;
    }

    /**
     *  Get all the imageInfos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ImageInfo> findAll(Pageable pageable) {
        log.debug("Request to get all ImageInfos");
        Page<ImageInfo> result = imageInfoRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one imageInfo by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public ImageInfoDTO findOne(String id) {
        log.debug("Request to get ImageInfo : {}", id);
        ImageInfo imageInfo = imageInfoRepository.findOne(id);
        ImageInfoDTO imageInfoDTO = imageInfoMapper.imageInfoToImageInfoDTO(imageInfo);
        return imageInfoDTO;
    }

    /**
     *  Delete the  imageInfo by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete ImageInfo : {}", id);
        imageInfoRepository.delete(id);
    }
}
