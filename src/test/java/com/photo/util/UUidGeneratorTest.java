package com.photo.util;

import org.junit.Test;

import java.util.UUID;

/**
 * Created by Administrator on 2017/8/13 0013.
 */
public class UUidGeneratorTest {
    @Test
    public void generate() throws Exception {
        UUidGenerator uUidGenerator = new UUidGenerator();
        System.out.printf("uUidGenerator:"+ UUID.randomUUID().toString().replace("-", "").toUpperCase());
    }

}
