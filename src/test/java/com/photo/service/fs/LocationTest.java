package com.photo.service.fs;

import org.junit.Test;

/**
 * Created by wangdi on 2017/8/31.
 */
public class LocationTest {
    @Test
    public void getUserUploadPath() throws Exception {
        System.out.printf(Location.getUserUploadPath("o小野蛮o"));
    }

}
