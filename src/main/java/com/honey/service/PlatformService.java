package com.honey.service;

import com.honey.entity.Platform;
import com.honey.response.Response;
import com.honey.util.PageBean;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/*
 *Created by ZYL on 2018/4/21.
 * 平台业务层接口
 */
public interface PlatformService  {

    /**
     * 分页查询
     * @return
     */
    Response <PageBean> pageAll(Integer pageNum, Integer pageSize, String orderBy, String platformName, String platformOwner);

    /**
     * 列表查询
     * @return
     */
    Response selectAll(String orderFields, String orderDirection, String platformName, String platformOwner);

    /**
     *查询平台ID和Name
     * @return
     */
    Response getPlatformIdAndName();
    /**
     * 添加
     * @return
     */
    Response add(Platform platform);

    /**
     * 根据ID查询
     * @param id
     * @return
     */
    Response queryOne(Long id);

    /**
     * 更新
     * @param platform
     * @return
     */
    Response update(Platform platform);

    /**
     * 删除
     * @param ids
     * @return
     */
    Response delete(String ids);

    /**
     * 通过平台ID查询首页信息
     * @param platformId
     * @return
     */
    Response getPlatformMain(Long platformId);

    /**
     * 平台用户登录
     * @param userName
     * @param password
     * @return
     */
    Response platformLogin(String userName,String password,HttpServletRequest request);

    /**
     * 查询所有未被删除的平台
     * @return
     */
    List<Platform> findUndeletePlatforms();

    /**
     * 通过ID查询信息
     * @param platformId
     * @return
     */
    Platform getPlatformById(Long platformId);

}
