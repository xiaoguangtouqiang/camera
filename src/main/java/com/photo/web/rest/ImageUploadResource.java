package com.photo.web.rest;

import com.photo.service.ImageUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created by wangdi on 2017/8/16.
 */
@RestController
@RequestMapping("/api")
public class ImageUploadResource {

    @Autowired
    private ImageUploadService imageUploadService;

    @RequestMapping("/image/upload")
    public ResponseEntity upload(String id,
                                 String name,
                                 String type,
                                 int size,
                                 @RequestParam(value = "file") final MultipartFile file) throws IOException {

        imageUploadService.upload(file);
        return new ResponseEntity("ssss", HttpStatus.OK);
    }
}
