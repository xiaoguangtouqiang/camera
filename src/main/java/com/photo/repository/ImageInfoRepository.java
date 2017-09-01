package com.photo.repository;

import com.photo.domain.ImageInfo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the ImageInfo entity.
 */
public interface ImageInfoRepository extends JpaRepository<ImageInfo,String> {

}
