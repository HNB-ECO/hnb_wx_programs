package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.Banner;
import com.honey.entity.Platform;
import com.honey.entity.PlatformExample;
import com.honey.mapper.PlatformMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.PlatformService;
import com.honey.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

//import com.sun.tools.internal.jxc.ap.Const;

/**
 * Created by ZYL on 2018/4/23.
 */

@Service
public class PlatformServiceImpl implements PlatformService {

    @Autowired
    private PlatformMapper platformMapper;


    /**
     * 分页查询平台用户信息
     *
     * @param pageNum
     * @param pageSize
     * @param orderBy
     * @param platformName
     * @param platformOwner
     * @return
     */
    public Response<PageBean> pageAll(Integer pageNum, Integer pageSize, String orderBy, String platformName, String platformOwner) {
        PageHelper.startPage(pageNum, pageSize);
        List<Platform> list;
        Integer all;

        PlatformExample example = new PlatformExample();
        PlatformExample.Criteria criteria = example.createCriteria();
        if (!DataUtils.isNullOrEmpty(platformName)) {
            criteria.andPlatformNameLike("%" + platformName + "%");
        }
        if (!DataUtils.isNullOrEmpty(platformOwner)) {
            criteria.andPlatformOwnerLike("%" + platformOwner + "%");
        }
        example.setOrderByClause(orderBy);
        list = platformMapper.selectByExample(example);
        all = platformMapper.countByExample(example);

        return new Response(new PageBeanExtra(list, all.longValue()));
    }

    public Response selectAll(String orderFields, String orderDirection, String platformName, String platformOwner) {
        PlatformExample example = new PlatformExample();
        PlatformExample.Criteria criteria = example.createCriteria();
        if (!DataUtils.isNullOrEmpty(platformName)) {
            criteria.andPlatformNameLike("%" + platformName + "%");
        }
        if (!DataUtils.isNullOrEmpty(platformOwner)) {
            criteria.andPlatformOwnerLike("%" + platformOwner + "%");
        }
        if (!DataUtils.isNullOrEmpty(orderFields)) {
            if (!DataUtils.isNullOrEmpty(orderDirection))
                example.setOrderByClause(orderFields + " " + orderDirection);
            else
                example.setOrderByClause(orderFields);
        }
        List<Platform> list = platformMapper.selectByExample(example);
        return new Response(list);
    }

    public Response getPlatformIdAndName() {
        List<Map<String, Object>> list = platformMapper.selectPlatformIdAndName();
        return new Response(list);
    }

    /**
     * 创建平台用户
     *
     * @return
     */
    public Response add(Platform platform) {
        //验证参数完整性
        if (DataUtils.isNullOrEmpty(platform.getPlatformName())
                || DataUtils.isNullOrEmpty(platform.getPlatformOwner())
                || DataUtils.isNullOrEmpty(platform.getUsername())
                || DataUtils.isNullOrEmpty(platform.getPassword())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }
        //创建平台用户默认充值20000积分
        platform.setCoin(new BigDecimal(200000));
        platform.setWithdrawCoin(new BigDecimal(0));
        String MD5pass = Md5Utils.toMd5(platform.getPassword());
        platform.setPassword(MD5pass);
        platform.setIsDelete(Constants.OBJECT_NOT_DELETE);
        platform.setCreateTime(new Date());
        platform.setUpdateTime(new Date());
        platformMapper.insert(platform);
        return new Response(platform);
    }

    public Response queryOne(Long id) {
        return null;
    }

    /**
     * 更新平台
     *
     * @param platform
     * @return
     */
    public Response update(Platform platform) {
        //验证参数完整性
        if (DataUtils.isNullOrEmpty(platform.getId())
                || DataUtils.isNullOrEmpty(platform.getPlatformName())
                || DataUtils.isNullOrEmpty(platform.getPlatformOwner())
                || DataUtils.isNullOrEmpty(platform.getUsername())
                || DataUtils.isNullOrEmpty(platform.getPassword())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }
        String MD5pass = Md5Utils.toMd5(platform.getPassword());
        platform.setPassword(MD5pass);
        platform.setUpdateTime(new Date());
        platformMapper.updateByPrimaryKeySelective(platform);
        return new Response(platform);
    }

    /**
     * 删除平台
     *
     * @param platformIds 平台ID
     * @return
     */
    public Response delete(String platformIds) {
        String[] ids = platformIds.contains(",") ? platformIds.split(",") : new String[]{platformIds};
        for (String id : ids) {
            Platform platform = platformMapper.selectByPrimaryKey(Long.valueOf(id));
            platform.setIsDelete(Constants.OBJECT_IS_DELETE);
            platform.setUpdateTime(new Date());
            platformMapper.updateByPrimaryKeySelective(platform);
        }
        return new Response(Code.SUCCESS);
    }

    /**
     * 查询首页
     *
     * @param platformId
     * @return
     */
    public Response getPlatformMain(Long platformId) {
        Platform platform = platformMapper.getPlatformMain(platformId);
        return new Response(platform);
    }

    /**
     * 平台用户登录
     *
     * @param userName
     * @param password
     * @return
     */
    public Response platformLogin(String userName, String password, HttpServletRequest request) {
        if (DataUtils.isNullOrEmpty(userName) || DataUtils.isNullOrEmpty(password)) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }

        //添加检索条件
        PlatformExample example = new PlatformExample();
        PlatformExample.Criteria criteria = example.createCriteria();
        criteria.andUsernameEqualTo(userName);
        criteria.andPasswordEqualTo(Md5Utils.toMd5(password));
        criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);

        List<Platform> list = platformMapper.selectByExample(example);
        if (list.size() != 1)//未查寻出记录或记录不知一条
            return new Response(Code.PLATFORM_USER_LOGIN_ERROR);

        //将登陆信息放入session中
        HttpSession session = request.getSession();
        session.setAttribute(Constants.PLATFORM_LOGIN_INFO, list.get(0));
        session.setAttribute("type", 2);
        return new Response(list.get(0));
    }

    /**
     * 查询所有没有被删除的平台
     *
     * @return
     */
    public List<Platform> findUndeletePlatforms() {
        PlatformExample example = new PlatformExample();
        PlatformExample.Criteria criteria = example.createCriteria();
        criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);
        return platformMapper.selectByExample(example);
    }


}
