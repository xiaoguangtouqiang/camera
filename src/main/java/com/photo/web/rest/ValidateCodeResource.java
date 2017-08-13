package com.photo.web.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

/**
 * 验证码
 * Created by Administrator on 2017/8/13 0013.
 */
@RestController
@RequestMapping("/api")
public class ValidateCodeResource {

    private static final String VALIDATE_CODE = "validate_code";

    @RequestMapping(value = "/validate/image", method = RequestMethod.GET)
    public void getImageValidateCode(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "image/jpeg; charset=UTF-8");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", -1);
        HttpSession session = request.getSession();
        OutputStream outputStream = response.getOutputStream();
        BufferedImage image = getBufferedImage(session);
        ImageIO.write(image, "JPEG", outputStream);
    }

    private BufferedImage getBufferedImage(HttpSession session) {
        BufferedImage image = new BufferedImage(83, 35, BufferedImage.TYPE_INT_BGR);
        Graphics g = image.getGraphics();
        Color color = g.getColor();
        g.fillRect(0, 0, 83, 35);
        char[] ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".toCharArray();
        int length = ch.length;
        Random random = new Random();
        Font[] font = new Font[5];
        font[0] = new Font("Ravie", Font.PLAIN, 24);    //24Ϊ�����ϸ
        font[1] = new Font("Autique Olive Compact", Font.PLAIN, 24);
        font[2] = new Font("Forte", Font.PLAIN, 24);
        font[3] = new Font("Wide Latin", Font.PLAIN, 24);
        font[4] = new Font("Gill Sans Ultra Bold", Font.PLAIN, 24);
        Font nowFont = font[random.nextInt(5)];
        String validateCode = "";
        for (int i = 0; i < 4; i++) {
            g.setFont(nowFont);
            String rand = new Character(ch[random.nextInt(length)]).toString();
            validateCode += rand;
            g.setColor(new Color(random.nextInt(255), random.nextInt(255), random.nextInt(255)));
            g.drawString(rand, 20 * i + 6, 25);
        }
        //设置验证码
        session.setAttribute(VALIDATE_CODE, validateCode);
        for (int i = 0; i < 100; i++)    //100Ϊ�����ߵ�����
        {
            int x1 = random.nextInt(83);
            int y1 = random.nextInt(35);
            g.drawOval(x1, y1, 1, 3);
        }
        g.setColor(color);
        g.dispose();
        return image;
    }
}
