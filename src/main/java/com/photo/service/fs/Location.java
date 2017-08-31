package com.photo.service.fs;


import com.photo.util.DateUtil;

/**
 * Created by DiDi on 2017/8/31.
 */
public class Location {

    //根目录
    private static String basePath = "/config/%s";

    //用户目录
    public static String getUserPath(String userId) {
        return String.format(basePath, userId);
    }

    public static String getUserUploadPath(String userId) {
        StringBuilder stringBuilder = new StringBuilder(getUserPath(userId));
        stringBuilder.append("/").append(DateUtil.getNowYMD()).append("/");
        return stringBuilder.toString();
    }

}
