package com.photo.service.mapper;

import com.photo.domain.ImageInfo;
import com.photo.service.dto.ImageInfoDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity ImageInfo and its DTO ImageInfoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ImageInfoMapper extends EntityMapper <ImageInfoDTO, ImageInfo> {

    default ImageInfo fromId(String id) {
        if (id == null) {
            return null;
        }
        ImageInfo imageInfo = new ImageInfo();
        imageInfo.setId(id);
        return imageInfo;
    }
}
