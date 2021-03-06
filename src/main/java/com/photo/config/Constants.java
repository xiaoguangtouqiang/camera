package com.photo.config;

/**
 * Application constants.
 */
public final class Constants {

    //Regex for acceptable logins
    public static final String LOGIN_REGEX = "^[_'.@A-Za-z0-9-]*$";

    public static final String SYSTEM_ACCOUNT = "system";
    public static final String ANONYMOUS_USER = "anonymoususer";

    // 根目录
    public static final String CAMERA = "camera";
    //用户上传图片
    public static final String UPLOAD_IMAGES = "images";

    private Constants() {
    }
}
