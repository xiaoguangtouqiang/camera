package com.photo.service.dto;


import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the Photo entity.
 */
public class PhotoDTO extends EntityDTO implements Serializable {

    private String id;

    private String title;

    private String description;

    private String tags;

    private List<FileDTO> uploadFiles;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public List<FileDTO> getUploadFiles() {
        return uploadFiles;
    }

    public void setUploadFiles(List<FileDTO> uploadFiles) {
        this.uploadFiles = uploadFiles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PhotoDTO photoDTO = (PhotoDTO) o;
        if (photoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), photoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PhotoDTO{" +
            "id='" + id + '\'' +
            ", title='" + title + '\'' +
            ", description='" + description + '\'' +
            ", tags='" + tags + '\'' +
            "} " + super.toString();
    }
}
