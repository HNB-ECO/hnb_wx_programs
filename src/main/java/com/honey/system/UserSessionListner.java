package com.honey.system;

import com.honey.service.AdminService;
import com.honey.service.PlatformService;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Created by ZYL on 2018/5/28.
 */
public class UserSessionListner implements HttpSessionListener {

    private PlatformService platformService;

    private AdminService adminService;


    @Override
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {

    }

    @Override
    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
        //监听session 过期事件 TODO
    }
}
