package com.photo.service.fs;


import com.photo.security.SecurityUtils;

/**
 * Created by DiDi on 2017/8/31.
 */
public class Location {

    private static String ROOT = "/var/volummes/";

    private static String IMAGE = "images";

    public static String getUserUploadPath(String login) {
        return appendPath(getImageUploadPath(), login);
    }

    public static String getUploadImagePath(String fileName) {
        String userUploadPath = getUserUploadPath(SecurityUtils.getCurrentUserLogin());
        return appendPath(userUploadPath, fileName);
    }

    private static String getImageUploadPath() {
        return appendPath(ROOT, IMAGE);
    }

    private static String appendPath(String path, String... more) {
        StringBuilder sb = new StringBuilder(path);
        for (String str : more) {
            if (sb.charAt(sb.length() - 1) != '/') {
                sb.append("/");
            }
            sb.append(str);
        }
        return sb.toString();
    }
}
