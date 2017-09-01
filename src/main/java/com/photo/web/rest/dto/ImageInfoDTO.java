package com.photo.web.rest.dto;

import java.io.Serializable;
import java.util.Objects;


/**
 * A DTO for the ImageInfo entity.
 */
public class ImageInfoDTO implements Serializable {

    private String id;

    private String path;


    private String groupid;


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
    public String getGroupid() {
        return groupid;
    }

    public void setGroupid(String groupid) {
        this.groupid = groupid;
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

        if ( ! Objects.equals(id, imageInfoDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ImageInfoDTO{" +
            "id=" + id +
            ", path='" + path + "'" +
            ", groupid='" + groupid + "'" +
            '}';
    }
}
