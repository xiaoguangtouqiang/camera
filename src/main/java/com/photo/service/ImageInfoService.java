package com.photo.service;

import com.photo.domain.ImageInfo;
import com.photo.repository.ImageInfoRepository;
import com.photo.service.dto.ImageInfoDTO;
import com.photo.service.mapper.ImageInfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ImageInfo.
 */
@Service
@Transactional
public class ImageInfoService {

    private final Logger log = LoggerFactory.getLogger(ImageInfoService.class);

    private ImageInfoRepository imageInfoRepository;

    private ImageInfoMapper imageInfoMapper;

    public ImageInfoService(ImageInfoRepository imageInfoRepository, ImageInfoMapper imageInfoMapper) {
        this.imageInfoRepository = imageInfoRepository;
        this.imageInfoMapper = imageInfoMapper;
    }

    /**
     * Save a imageInfo.
     *
     * @param imageInfoDTO the entity to save
     * @return the persisted entity
     */
    public ImageInfoDTO save(ImageInfoDTO imageInfoDTO) {
        log.debug("Request to save ImageInfo : {}", imageInfoDTO);
        ImageInfo imageInfo = imageInfoMapper.toEntity(imageInfoDTO);
        imageInfo = imageInfoRepository.save(imageInfo);
        return imageInfoMapper.toDto(imageInfo);
    }

    /**
     *  Get all the imageInfos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ImageInfoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ImageInfos");
        return imageInfoRepository.findAll(pageable)
            .map(imageInfoMapper::toDto);
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
        return imageInfoMapper.toDto(imageInfo);
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
