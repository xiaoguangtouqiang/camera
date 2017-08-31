package com.photo.web.rest;

import com.photo.domain.User;
import com.photo.repository.UserRepository;
import com.photo.security.SecurityUtils;
import com.photo.service.fs.Location;
import com.photo.web.rest.errors.CustomParameterizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

/**
 * Created by wangdi on 2017/8/16.
 */
@RestController
@RequestMapping("/api")
public class ImageUploadResource {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/image/upload")
    public ResponseEntity upload(String id,
                                 String name,
                                 String type,
                                 int size,
                                 @RequestParam(value = "file") final MultipartFile file) throws IOException {
        String login = SecurityUtils.getCurrentUserLogin();
        Optional<User> optional = userRepository.findOneByLogin(login);
        if (!optional.isPresent()) {
            throw new CustomParameterizedException("用户不存在");
        }
        String userUploadPath = Location.getUserUploadPath(optional.get().getId());

        File directory = new File(userUploadPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        Path path = Paths.get(userUploadPath);

        try (InputStream inputStream = file.getInputStream()) {
            Path targetPath = path.resolve(file.getOriginalFilename());
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        }
        return new ResponseEntity("ssss", HttpStatus.OK);
    }
}
