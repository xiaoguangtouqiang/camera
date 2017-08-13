package com.photo.service;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

/**
 * Created by Administrator on 2017/8/13 0013.
 */
@Service
public class ValidateCodeService {

    private static final String VALIDATE_CODE = "validate_code";

    public BufferedImage getBufferedImage(HttpSession session) {
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

    public boolean check(HttpSession session, String requestValidate) {
        boolean check = false;
        if (session != null) {
            String validateCode = session.getAttribute(VALIDATE_CODE).toString();
            if (validateCode.equalsIgnoreCase(requestValidate)) {
                check = true;
            }
        }
        return check;
    }

}
