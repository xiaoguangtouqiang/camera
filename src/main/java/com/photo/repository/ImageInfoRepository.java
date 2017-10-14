package com.photo.repository;

import com.photo.domain.ImageInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the ImageInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImageInfoRepository extends JpaRepository<ImageInfo, String> {

    List<ImageInfo> findAllByPhotoId(String photoId);
}
