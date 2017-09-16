package com.photo.service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

/**
 * Created by wangdi on 2017/9/16.
 */
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ChunkFinishDTO {

    private List<ChunkFileDTO> chunkFiles;

    public List<ChunkFileDTO> getChunkFiles() {
        return chunkFiles;
    }

    public void setChunkFiles(List<ChunkFileDTO> chunkFiles) {
        this.chunkFiles = chunkFiles;
    }

    @Override
    public String toString() {
        return "ChunkFinishDTO{" +
            "chunkFiles=" + chunkFiles +
            '}';
    }
}
