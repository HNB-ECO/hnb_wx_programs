package com.honey.service;

import com.honey.response.Response;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by ZYL on 2018/5/28.
 */
public interface IndexService {

    Response login(String userName,String password,HttpServletRequest request);
}
