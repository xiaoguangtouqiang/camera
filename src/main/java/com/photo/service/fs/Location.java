package com.photo.service.fs;


/**
 * Created by DiDi on 2017/8/31.
 */
public class Location {

    //根目录
    private static String basePath = "/config/%s";

    //用户目录
    public static String getUserPath(String login) {
        return String.format(basePath, login);
    }

    public static String getUserUploadPath(String login) {
        StringBuilder stringBuilder = new StringBuilder(getUserPath(login));
//        stringBuilder.append("/").append(DateUtil.getNowYMD()).append("/");
        return stringBuilder.toString();
    }

}
