package com.photo.repository;

import com.photo.domain.ImageInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ImageInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImageInfoRepository extends JpaRepository<ImageInfo,Long> {
    
}
