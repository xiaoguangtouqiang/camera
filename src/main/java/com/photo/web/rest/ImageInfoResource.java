package com.photo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.photo.service.ImageInfoService;
import com.photo.web.rest.util.HeaderUtil;
import com.photo.web.rest.util.PaginationUtil;
import com.photo.service.dto.ImageInfoDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    private static final String ENTITY_NAME = "imageInfo";

    private final ImageInfoService imageInfoService;

    public ImageInfoResource(ImageInfoService imageInfoService) {
        this.imageInfoService = imageInfoService;
    }

    /**
     * POST  /image-infos : Create a new imageInfo.
     *
     * @param imageInfoDTO the imageInfoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imageInfoDTO, or with status 400 (Bad Request) if the imageInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/image-infos")
    @Timed
    public ResponseEntity<ImageInfoDTO> createImageInfo(@RequestBody ImageInfoDTO imageInfoDTO) throws URISyntaxException {
        log.debug("REST request to save ImageInfo : {}", imageInfoDTO);
        if (imageInfoDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new imageInfo cannot already have an ID")).body(null);
        }
        ImageInfoDTO result = imageInfoService.save(imageInfoDTO);
        return ResponseEntity.created(new URI("/api/image-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /image-infos : Updates an existing imageInfo.
     *
     * @param imageInfoDTO the imageInfoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imageInfoDTO,
     * or with status 400 (Bad Request) if the imageInfoDTO is not valid,
     * or with status 500 (Internal Server Error) if the imageInfoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/image-infos")
    @Timed
    public ResponseEntity<ImageInfoDTO> updateImageInfo(@RequestBody ImageInfoDTO imageInfoDTO) throws URISyntaxException {
        log.debug("REST request to update ImageInfo : {}", imageInfoDTO);
        if (imageInfoDTO.getId() == null) {
            return createImageInfo(imageInfoDTO);
        }
        ImageInfoDTO result = imageInfoService.save(imageInfoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imageInfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /image-infos : get all the imageInfos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of imageInfos in body
     */
    @GetMapping("/image-infos")
    @Timed
    public ResponseEntity<List<ImageInfoDTO>> getAllImageInfos(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ImageInfos");
        Page<ImageInfoDTO> page = imageInfoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/image-infos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /image-infos/:id : get the "id" imageInfo.
     *
     * @param id the id of the imageInfoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imageInfoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/image-infos/{id}")
    @Timed
    public ResponseEntity<ImageInfoDTO> getImageInfo(@PathVariable String id) {
        log.debug("REST request to get ImageInfo : {}", id);
        ImageInfoDTO imageInfoDTO = imageInfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(imageInfoDTO));
    }

    /**
     * DELETE  /image-infos/:id : delete the "id" imageInfo.
     *
     * @param id the id of the imageInfoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/image-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteImageInfo(@PathVariable String id) {
        log.debug("REST request to delete ImageInfo : {}", id);
        imageInfoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
