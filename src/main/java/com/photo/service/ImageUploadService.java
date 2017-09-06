package com.photo.service;

import com.photo.domain.User;
import com.photo.repository.UserRepository;
import com.photo.security.SecurityUtils;
import com.photo.service.dto.ImageInfoDTO;
import com.photo.service.fs.Location;
import com.photo.web.rest.errors.CustomParameterizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.Optional;

/**
 * Created by wangdi on 2017/9/6.
 */
@Service
@Transactional
public class ImageUploadService {

    @Autowired
    private ImageInfoService imageInfoService;

    @Autowired
    private UserRepository userRepository;

    private static final String suffer = ".jpg";

    public void upload(MultipartFile file) throws IOException {
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
            String savedFileName = new Date().getTime() + suffer;
            String originFileName = file.getOriginalFilename();
            Path targetPath = path.resolve(savedFileName);
            ImageInfoDTO imageInfoDTO = new ImageInfoDTO();
            imageInfoDTO.setPath(targetPath.toString());
            imageInfoDTO.setName(originFileName);
            imageInfoService.save(imageInfoDTO);
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        }
    }
}



























