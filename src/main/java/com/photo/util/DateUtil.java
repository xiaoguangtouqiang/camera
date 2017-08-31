package com.photo.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by wangdi on 2017/8/31.
 */
public class DateUtil {

    public static String getNowYMD() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date now = new Date();
        return simpleDateFormat.format(now);
    }


}
