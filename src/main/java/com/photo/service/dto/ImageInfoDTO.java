package com.photo.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ImageInfo entity.
 */
public class ImageInfoDTO extends EntityDTO implements Serializable {

    private String id;

    private String path;

    private String photoId;

    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getPhotoId() {
        return photoId;
    }

    public void setPhotoId(String photoId) {
        this.photoId = photoId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ImageInfoDTO imageInfoDTO = (ImageInfoDTO) o;
        if (imageInfoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imageInfoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImageInfoDTO{" +
            "id='" + id + '\'' +
            ", path='" + path + '\'' +
            ", photoId='" + photoId + '\'' +
            ", name='" + name + '\'' +
            "} " + super.toString();
    }
}
