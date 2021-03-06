package com.photo.domain;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Objects;

/**
 * A ImageInfo.
 */
@Entity
@Table(name = "image_info")
public class ImageInfo extends AbstractAuditingEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "com.photo.util.UUidGenerator")
    private String id;

    @Column(name = "path")
    private String path;

    @Column(name = "photo_Id")
    private String photoId;

    @Column(name = "name")
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
        ImageInfo imageInfo = (ImageInfo) o;
        if (imageInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imageInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImageInfo{" +
            "id='" + id + '\'' +
            ", path='" + path + '\'' +
            ", photoId='" + photoId + '\'' +
            ", name='" + name + '\'' +
            "} " + super.toString();
    }
}
