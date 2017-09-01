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

    @Column(name = "groupid")
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
        ImageInfo imageInfo = (ImageInfo) o;
        if (imageInfo.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, imageInfo.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ImageInfo{" +
            "id='" + id + '\'' +
            ", path='" + path + '\'' +
            ", groupId='" + groupId + '\'' +
            "} " + super.toString();
    }
}
