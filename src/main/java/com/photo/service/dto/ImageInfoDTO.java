package com.photo.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ImageInfo entity.
 */
public class ImageInfoDTO extends EntityDTO implements Serializable {

    private String id;

    private String path;

    private String groupId;

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

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
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
        if(imageInfoDTO.getId() == null || getId() == null) {
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
            ", groupId='" + groupId + '\'' +
            '}';
    }
}
