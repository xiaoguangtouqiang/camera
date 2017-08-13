package com.photo.web.rest;

import com.photo.service.ValidateCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;

/**
 * 验证码
 * Created by Administrator on 2017/8/13 0013.
 */
@RestController
@RequestMapping("/api")
public class ValidateCodeResource {

    @Autowired
    private ValidateCodeService validateCodeService;

    @RequestMapping(value = "/validate/image", method = RequestMethod.GET)
    public void getImageValidateCode(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "image/jpeg; charset=UTF-8");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", -1);
        HttpSession session = request.getSession();
        OutputStream outputStream = response.getOutputStream();
        BufferedImage image = validateCodeService.getBufferedImage(session);
        ImageIO.write(image, "JPEG", outputStream);
    }
}
