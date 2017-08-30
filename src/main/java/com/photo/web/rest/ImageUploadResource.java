package com.photo.web.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * Created by wangdi on 2017/8/16.
 */
@RestController
@RequestMapping("/api")
public class ImageUploadResource {

    @RequestMapping("/image/upload")
    public ResponseEntity upload(String uid,
                                 String md5,
                                 String chunks,
                                 String chunk,
                                 String id,
                                 String name,
                                 String type,
                                 int size,
                                 @RequestParam(value = "file") final MultipartFile file) throws IOException {
        File file1 = new File("D:/"+file.getOriginalFilename());
        file.transferTo(file1);
        return new ResponseEntity("ssss", HttpStatus.OK);
    }
}
