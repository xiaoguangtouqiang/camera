package com.photo.service.fs;

import org.junit.Test;

/**
 * Created by wangdi on 2017/8/31.
 */
public class LocationTest {

    @Test
    public void testUserUploadImagePath() {
        System.out.printf("ss:" + Location.getUploadImagePath("o野蛮o").path().toString());
    }

}
