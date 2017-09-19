package com.photo.web.rest;

import com.photo.CameraApp;

import com.photo.domain.Photo;
import com.photo.repository.PhotoRepository;
import com.photo.service.PhotoService;
import com.photo.service.dto.PhotoDTO;
import com.photo.service.mapper.PhotoMapper;
import com.photo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PhotoResource REST controller.
 *
 * @see PhotoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CameraApp.class)
public class PhotoResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_TAGS = "AAAAAAAAAA";
    private static final String UPDATED_TAGS = "BBBBBBBBBB";

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private PhotoMapper photoMapper;

    @Autowired
    private PhotoService photoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPhotoMockMvc;

    private Photo photo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PhotoResource photoResource = new PhotoResource(photoService);
        this.restPhotoMockMvc = MockMvcBuilders.standaloneSetup(photoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Photo createEntity(EntityManager em) {
        Photo photo = new Photo()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .tags(DEFAULT_TAGS);
        return photo;
    }

    @Before
    public void initTest() {
        photo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPhoto() throws Exception {
        int databaseSizeBeforeCreate = photoRepository.findAll().size();

        // Create the Photo
        PhotoDTO photoDTO = photoMapper.toDto(photo);
        restPhotoMockMvc.perform(post("/api/photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photoDTO)))
            .andExpect(status().isCreated());

        // Validate the Photo in the database
        List<Photo> photoList = photoRepository.findAll();
        assertThat(photoList).hasSize(databaseSizeBeforeCreate + 1);
        Photo testPhoto = photoList.get(photoList.size() - 1);
        assertThat(testPhoto.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testPhoto.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPhoto.getTags()).isEqualTo(DEFAULT_TAGS);
    }

    @Test
    @Transactional
    public void createPhotoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = photoRepository.findAll().size();

        // Create the Photo with an existing ID
        photo.setId("1");
        PhotoDTO photoDTO = photoMapper.toDto(photo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPhotoMockMvc.perform(post("/api/photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Photo> photoList = photoRepository.findAll();
        assertThat(photoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPhotos() throws Exception {
        // Initialize the database
        photoRepository.saveAndFlush(photo);

        // Get all the photoList
        restPhotoMockMvc.perform(get("/api/photos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(photo.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].tags").value(hasItem(DEFAULT_TAGS.toString())));
    }

    @Test
    @Transactional
    public void getPhoto() throws Exception {
        // Initialize the database
        photoRepository.saveAndFlush(photo);

        // Get the photo
        restPhotoMockMvc.perform(get("/api/photos/{id}", photo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(photo.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.tags").value(DEFAULT_TAGS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPhoto() throws Exception {
        // Get the photo
        restPhotoMockMvc.perform(get("/api/photos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePhoto() throws Exception {
        // Initialize the database
        photoRepository.saveAndFlush(photo);
        int databaseSizeBeforeUpdate = photoRepository.findAll().size();

        // Update the photo
        Photo updatedPhoto = photoRepository.findOne(photo.getId());
        updatedPhoto
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .tags(UPDATED_TAGS);
        PhotoDTO photoDTO = photoMapper.toDto(updatedPhoto);

        restPhotoMockMvc.perform(put("/api/photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photoDTO)))
            .andExpect(status().isOk());

        // Validate the Photo in the database
        List<Photo> photoList = photoRepository.findAll();
        assertThat(photoList).hasSize(databaseSizeBeforeUpdate);
        Photo testPhoto = photoList.get(photoList.size() - 1);
        assertThat(testPhoto.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testPhoto.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPhoto.getTags()).isEqualTo(UPDATED_TAGS);
    }

    @Test
    @Transactional
    public void updateNonExistingPhoto() throws Exception {
        int databaseSizeBeforeUpdate = photoRepository.findAll().size();

        // Create the Photo
        PhotoDTO photoDTO = photoMapper.toDto(photo);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPhotoMockMvc.perform(put("/api/photos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(photoDTO)))
            .andExpect(status().isCreated());

        // Validate the Photo in the database
        List<Photo> photoList = photoRepository.findAll();
        assertThat(photoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePhoto() throws Exception {
        // Initialize the database
        photoRepository.saveAndFlush(photo);
        int databaseSizeBeforeDelete = photoRepository.findAll().size();

        // Get the photo
        restPhotoMockMvc.perform(delete("/api/photos/{id}", photo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Photo> photoList = photoRepository.findAll();
        assertThat(photoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Photo.class);
        Photo photo1 = new Photo();
        photo1.setId("1");
        Photo photo2 = new Photo();
        photo2.setId(photo1.getId());
        assertThat(photo1).isEqualTo(photo2);
        photo2.setId("2");
        assertThat(photo1).isNotEqualTo(photo2);
        photo1.setId(null);
        assertThat(photo1).isNotEqualTo(photo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PhotoDTO.class);
        PhotoDTO photoDTO1 = new PhotoDTO();
        photoDTO1.setId("1");
        PhotoDTO photoDTO2 = new PhotoDTO();
        assertThat(photoDTO1).isNotEqualTo(photoDTO2);
        photoDTO2.setId(photoDTO1.getId());
        assertThat(photoDTO1).isEqualTo(photoDTO2);
        photoDTO2.setId("2");
        assertThat(photoDTO1).isNotEqualTo(photoDTO2);
        photoDTO1.setId(null);
        assertThat(photoDTO1).isNotEqualTo(photoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(photoMapper.fromId("42").getId()).isEqualTo("42");
        assertThat(photoMapper.fromId(null)).isNull();
    }
}
