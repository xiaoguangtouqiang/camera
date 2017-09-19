package com.photo.service.mapper;

import com.photo.domain.*;
import com.photo.service.dto.PhotoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Photo and its DTO PhotoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PhotoMapper extends EntityMapper <PhotoDTO, Photo> {


    default Photo fromId(String id) {
        if (id == null) {
            return null;
        }
        Photo photo = new Photo();
        photo.setId(id);
        return photo;
    }
}
