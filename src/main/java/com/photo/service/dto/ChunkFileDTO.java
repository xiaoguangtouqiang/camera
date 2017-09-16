package com.photo.service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Created by wangdi on 2017/9/16.
 */
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ChunkFileDTO {

    private String uid;
    private String md5;
    private int chunks;
    private int chunk;
    private String id;
    private String name;
    private String type;
    private String ext;
    private int size;


    public String getFileId() {
        return  uid + "-" + id;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getMd5() {
        return md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }

    public int getChunks() {
        return chunks;
    }

    public void setChunks(int chunks) {
        this.chunks = chunks;
    }

    public int getChunk() {
        return chunk;
    }

    public void setChunk(int chunk) {
        this.chunk = chunk;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    @Override
    public String toString() {
        return "ChunkFileDTO{" +
            "uid='" + uid + '\'' +
            ", md5='" + md5 + '\'' +
            ", chunks=" + chunks +
            ", chunk=" + chunk +
            ", id='" + id + '\'' +
            ", name='" + name + '\'' +
            ", type='" + type + '\'' +
            ", ext='" + ext + '\'' +
            ", size=" + size +
            '}';
    }
}
