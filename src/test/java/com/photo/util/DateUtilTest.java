package com.photo.util;

import org.junit.Test;

/**
 * Created by wangdi on 2017/8/31.
 */
public class DateUtilTest {
    @Test
    public void getNowYMD() throws Exception {
        System.out.printf(DateUtil.getNowYMD());
    }

    @Test
    public void testTmepPath() {
        System.out.printf("tempFile:" + System.getProperty("java.io.tmpdir"));
    }

}
