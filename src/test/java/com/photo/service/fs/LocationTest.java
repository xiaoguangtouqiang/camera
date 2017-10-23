package com.photo.service.fs;

import org.junit.Test;

import static com.photo.config.Constants.UPLOAD_IMAGES;

/**
 * Created by wangdi on 2017/8/31.
 */
public class LocationTest {

    @Test
    public void testUserUploadImagePath() {
        System.out.printf("ss:" + Location.getUploadImagePath("o野蛮o").path().toString());
    }

    @Test
    public void testRelativizePath() {
        String s = Location.getUploadImagePath("1234", "1.jpg").relativize().toString();
        System.out.printf("s:"+s);
    }

    @Test
    public void testRelativizeImagePath() {
        String s = Location.getUploadImagePath("1234", "1.jpg").relativize(UPLOAD_IMAGES).toString();
        System.out.printf("s:"+s);
    }
}
