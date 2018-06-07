package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.Admin;
import com.honey.entity.AdminExample;
import com.honey.mapper.AdminMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.AdminService;
import com.honey.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

/**
 * Created by ZYL on 2018/5/17.
 */

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private AdminMapper adminMapper;


    /**
     * 管理员登录后台
     * @param userName
     * @param password
     * @return
     */
    public Response adminLogin(String userName, String password,HttpServletRequest request) {
        AdminExample example = new AdminExample();
        AdminExample.Criteria criteria = example.createCriteria();
        criteria.andUsernameEqualTo(userName);
        criteria.andPasswordEqualTo(Md5Utils.toMd5(password));
        criteria.andStatusEqualTo(0);
        List<Admin> adminList = adminMapper.selectByExample(example);

        if(adminList.size()!=1)//未查寻出记录或记录不知一条
            return new Response(Code.PLATFORM_USER_LOGIN_ERROR);

        //将登录信息放入session中
        HttpSession session = request.getSession();
        session.setAttribute(Constants.ADMINI_LOGIN_INFO,adminList.get(0));
        session.setAttribute("type",1);
        return new Response(adminList.get(0));
    }

    /**
     * 查询管理员列表
     * @param pageNum
     * @param pageSize
     * @param orderBy
     * @param userName
     * @return
     */
    public Response<PageBean> pageList(Integer pageNum, Integer pageSize, String orderBy, String userName) {
        PageHelper.startPage(pageNum, pageSize);
        List<Admin> list;
        Integer all;

        AdminExample example = new AdminExample();
        AdminExample.Criteria criteria = example.createCriteria();
        criteria.andStatusNotEqualTo(2);
        if(!DataUtils.isNullOrEmpty(userName)){
            criteria.andUsernameLike(userName);
        }
        list = adminMapper.selectByExample(example);
        all = adminMapper.countByExample(example);

        return new Response(new PageBeanExtra(list, all.longValue()));
    }

    /**
     * 创建系统管理员
     * @param admin
     * @return
     */
    public Response createUser(Admin admin) {
        if(DataUtils.isNullOrEmpty(admin.getUsername())||
                DataUtils.isNullOrEmpty(admin.getPassword())||
                DataUtils.isNullOrEmpty(admin.getRole())){
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }

        admin.setPassword(Md5Utils.toMd5(admin.getPassword()));
        admin.setCreateTime(new Date());
        admin.setUpdateTime(new Date());
        admin.setStatus(Constants.USER_STATUS_ACTIVE);
        admin.setDepartment("1");
        admin.setAddress("1");
        adminMapper.insert(admin);

        return new Response(Code.SUCCESS);
    }

    /**
     * 更新系统管理员状态
     * @param adminIds
     * @param status
     * @return
     */
    public Response updateStatus(String adminIds , Integer status){
        String [] ids = adminIds.contains(",")?adminIds.split(","):new String [] {adminIds};
        for(String id : ids){
            Admin admin = adminMapper.selectByPrimaryKey(Long.valueOf(id));//查询出对应的系统管理员账号
            if(DataUtils.isNullOrEmpty(admin))
                return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
            admin.setUpdateTime(new Date());
            admin.setStatus(status);
            adminMapper.updateByPrimaryKeySelective(admin);
        }
        return new Response(Code.SUCCESS);
    }

    /**
     * 更新管理原密码
     * @param adminId
     * @param password
     * @return
     */
    public Response updateAdmin(Long adminId , String password){
        Admin admin = adminMapper.selectByPrimaryKey(adminId);//查询出对应的系统管理员账号
        if(DataUtils.isNullOrEmpty(admin))
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        admin.setUpdateTime(new Date());
        admin.setPassword(Md5Utils.toMd5(password));
        adminMapper.updateByPrimaryKeySelective(admin);

        return new Response(Code.SUCCESS);
    }

    /**
     * 通过ID查询管理员账号信息
     * @param adminId
     * @return
     */
    public Response getAdminById(Long adminId) {
        Admin admin = adminMapper.selectByPrimaryKey(adminId);
        if(DataUtils.isNullOrEmpty(admin)){//为空
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
        return new Response(admin);
    }
}
