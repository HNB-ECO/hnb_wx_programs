package com.honey.service.impl;

import com.honey.entity.Admin;
import com.honey.entity.AdminExample;
import com.honey.entity.AdminExample.Criteria;
import com.honey.entity.Platform;
import com.honey.entity.PlatformExample;
import com.honey.mapper.AdminMapper;
import com.honey.mapper.PlatformMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.IndexService;
import com.honey.util.Constants;
import com.honey.util.DataUtils;
import com.honey.util.Md5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by ZYL on 2018/5/28.
 */
@Service
public class IndexServiceImpl implements IndexService{

    @Autowired
    private PlatformMapper platformMapper;

    @Autowired
    private AdminMapper adminMapper;


    @Override
    public Response login(String userName, String password, HttpServletRequest request) {
        if(DataUtils.isNullOrEmpty(userName)||DataUtils.isNullOrEmpty(password)){
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }

        //先查看是否是平台登录
        //添加检索条件
        PlatformExample example = new PlatformExample();
        PlatformExample.Criteria criteria = example.createCriteria();
        criteria.andUsernameEqualTo(userName);
        criteria.andPasswordEqualTo(Md5Utils.toMd5(password));
        criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);

        List<Platform> list = platformMapper.selectByExample(example);
        if(list.size()==0){//未查寻出记录查看是否是管理员登录
            AdminExample adminExample= new AdminExample();
            AdminExample.Criteria adminCriteria = adminExample.createCriteria();
            adminCriteria.andUsernameEqualTo(userName);
            adminCriteria.andPasswordEqualTo(Md5Utils.toMd5(password));
            adminCriteria.andStatusEqualTo(0);
            List<Admin> adminList = adminMapper.selectByExample(adminExample);

            if(adminList.size()!=1)//未查寻出记录或记录不知一条
                return new Response(Code.PLATFORM_USER_LOGIN_ERROR);

            //将登录信息放入session中
            HttpSession session = request.getSession();
            session.setAttribute(Constants.ADMINI_LOGIN_INFO,adminList.get(0));
            session.setAttribute("type",1);
            return new Response(adminList.get(0));

        }else if (list.size()==1){
            //将登陆信息放入session中
            HttpSession session = request.getSession();
            session.setAttribute(Constants.PLATFORM_LOGIN_INFO,list.get(0));
            session.setAttribute("type",2);
            return new Response(list.get(0));
        }
        return null;
    }
}
