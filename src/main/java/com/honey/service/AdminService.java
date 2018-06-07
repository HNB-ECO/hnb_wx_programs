package com.honey.service;

import com.honey.entity.Admin;
import com.honey.response.Response;
import com.honey.util.PageBean;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by ZYL on 2018/5/17.
 */
public interface AdminService {

    Response adminLogin(String userName,String password,HttpServletRequest request);

    Response<PageBean> pageList(Integer pageNum,Integer pageSize,String orderBy,String userName);

    Response createUser(Admin admin);

    Response updateStatus(String adminId , Integer status);

    Response updateAdmin(Long adminId , String password);

    Response getAdminById(Long adminId);
}
