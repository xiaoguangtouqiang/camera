package com.photo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.photo.domain.ImageInfo;
import com.photo.service.ImageInfoService;
import com.photo.web.rest.dto.ImageInfoDTO;
import com.photo.web.rest.mapper.ImageInfoMapper;
import com.photo.web.rest.util.HeaderUtil;
import com.photo.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ImageInfo.
 */
@RestController
@RequestMapping("/api")
public class ImageInfoResource {

    private final Logger log = LoggerFactory.getLogger(ImageInfoResource.class);

    @Inject
    private ImageInfoService imageInfoService;

    @Inject
    private ImageInfoMapper imageInfoMapper;

    /**
     * POST  /image-infos : Create a new imageInfo.
     *
     * @param imageInfoDTO the imageInfoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imageInfoDTO, or with status 400 (Bad Request) if the imageInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/image-infos",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ImageInfoDTO> createImageInfo(@RequestBody ImageInfoDTO imageInfoDTO) throws URISyntaxException {
        log.debug("REST request to save ImageInfo : {}", imageInfoDTO);
        if (imageInfoDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("imageInfo", "idexists", "A new imageInfo cannot already have an ID")).body(null);
        }
        ImageInfoDTO result = imageInfoService.save(imageInfoDTO);
        return ResponseEntity.created(new URI("/api/image-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("imageInfo", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /image-infos : Updates an existing imageInfo.
     *
     * @param imageInfoDTO the imageInfoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imageInfoDTO,
     * or with status 400 (Bad Request) if the imageInfoDTO is not valid,
     * or with status 500 (Internal Server Error) if the imageInfoDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/image-infos",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ImageInfoDTO> updateImageInfo(@RequestBody ImageInfoDTO imageInfoDTO) throws URISyntaxException {
        log.debug("REST request to update ImageInfo : {}", imageInfoDTO);
        if (imageInfoDTO.getId() == null) {
            return createImageInfo(imageInfoDTO);
        }
        ImageInfoDTO result = imageInfoService.save(imageInfoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("imageInfo", imageInfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /image-infos : get all the imageInfos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of imageInfos in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/image-infos",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional(readOnly = true)
    public ResponseEntity<List<ImageInfoDTO>> getAllImageInfos(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of ImageInfos");
        Page<ImageInfo> page = imageInfoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/image-infos");
        return new ResponseEntity<>(imageInfoMapper.imageInfosToImageInfoDTOs(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /image-infos/:id : get the "id" imageInfo.
     *
     * @param id the id of the imageInfoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imageInfoDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/image-infos/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ImageInfoDTO> getImageInfo(@PathVariable String id) {
        log.debug("REST request to get ImageInfo : {}", id);
        ImageInfoDTO imageInfoDTO = imageInfoService.findOne(id);
        return Optional.ofNullable(imageInfoDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /image-infos/:id : delete the "id" imageInfo.
     *
     * @param id the id of the imageInfoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/image-infos/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteImageInfo(@PathVariable String id) {
        log.debug("REST request to delete ImageInfo : {}", id);
        imageInfoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("imageInfo", id.toString())).build();
    }

}
