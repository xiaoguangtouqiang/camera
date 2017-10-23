package com.photo.util;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.util.UUID;

/**
 * Created by Administrator on 2017/8/13 0013.
 */
public class UUidGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        return UUID.randomUUID().toString().replace("-", "").toLowerCase();
    }

    public static String randomUUID(){
        return UUID.randomUUID().toString().replace("-", "").toLowerCase();
    }
}
