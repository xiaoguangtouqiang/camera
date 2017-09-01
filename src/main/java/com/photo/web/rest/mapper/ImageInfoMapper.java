package com.photo.web.rest.mapper;

import com.photo.domain.*;
import com.photo.web.rest.dto.ImageInfoDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity ImageInfo and its DTO ImageInfoDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ImageInfoMapper {

    ImageInfoDTO imageInfoToImageInfoDTO(ImageInfo imageInfo);

    List<ImageInfoDTO> imageInfosToImageInfoDTOs(List<ImageInfo> imageInfos);

    ImageInfo imageInfoDTOToImageInfo(ImageInfoDTO imageInfoDTO);

    List<ImageInfo> imageInfoDTOsToImageInfos(List<ImageInfoDTO> imageInfoDTOs);
}
