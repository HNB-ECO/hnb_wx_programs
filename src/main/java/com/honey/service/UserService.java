package com.honey.service;

import com.honey.entity.User;
import com.honey.response.Response;
import com.honey.util.PageBean;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 用户相关信息接口
 * Created by ZYL on 2018/4/26.
 */
public interface UserService {

    Response createUser(User user);

    Response getUserInfoById(Long userId);

    Response getUserAllAddress(Long userId);

    Response getUserPackage(Long userId);

    Response getUserWithAddress(Long userId);

    Response userRecharge(Long userId, BigDecimal price, String openId, String clientIP);

    Response bindUserPhone(Long userId , String phone);

    int countByDate(Long platformId , Date startDate , Date endDate);

    Response<PageBean> getUserList(Integer pageNum,Integer pageSize,String orderBy,Long platformId,String nickName);

    Response getUserInfoByUserId(Long userId);

    Response bindUserWalletAddress(Long userId , String walletAddress);

    Response blockUser(String userIds);
}
