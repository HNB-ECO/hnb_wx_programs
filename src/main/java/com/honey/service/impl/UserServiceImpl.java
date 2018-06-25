package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.User;
import com.honey.entity.UserAddress;
import com.honey.entity.UserExample;
import com.honey.entity.WithdrawChargeRecord;
import com.honey.mapper.UserAddressMapper;
import com.honey.mapper.UserMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.UserService;
import com.honey.service.WithdrawService;
import com.honey.service.WxPayService;
import com.honey.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by ZYL on 2018/4/26.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserAddressMapper userAddressMapper;

    @Autowired
    private WxPayService wxPayService;

    @Autowired
    private WithdrawService withdrawService;

    /**
     * 创建用户信息
     *
     * @param user
     * @return
     */
    public Response createUser(User user) {
        if (DataUtils.isNullOrEmpty(user.getAvatar()) ||
                DataUtils.isNullOrEmpty(user.getNickName()) ||
                DataUtils.isNullOrEmpty(user.getThirdPartId()) ||
                DataUtils.isNullOrEmpty(user.getPlatformId()) ||
                DataUtils.isNullOrEmpty(user.getThirdPartType())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }
        //openId为thirdPartID
        /**
         * 当前测试版本 支付功能暂未开通所以用户登录后先送200HNB,更新：已开通支付功能，目前不送了
         */
        UserExample userExample = new UserExample();
        UserExample.Criteria userCriteria = userExample.createCriteria();
        userCriteria.andThirdPartIdEqualTo(user.getThirdPartId());
        userCriteria.andThirdPartTypeEqualTo(user.getThirdPartType());
        List<User> userList = userMapper.selectByExample(userExample);
        if(userList.size()>0) {
            User userInDB = userList.get(0);
            userInDB.setLastLoginTime(new Date());
            userMapper.updateByPrimaryKeySelective(userInDB);
            return new Response(userInDB);
        }
        user.setBalance(new BigDecimal(0));
        user.setCoinBalance(new BigDecimal(0));
        user.setCreateTime(new Date());
        user.setUpdateTime(new Date());
        user.setStatus(Constants.OBJECT_NOT_DELETE);
        user.setIsDelete(Constants.OBJECT_NOT_DELETE);
        user.setLastLoginType(user.getThirdPartType());
        user.setLastLoginTime(new Date());
        userMapper.insertBackId(user);
        return new Response(user);
    }

    /**
     * 通过用户ID查询用户信息
     *
     * @param userId
     * @return
     */
    public Response getUserInfoById(Long userId) {
        Map<String, Object> map = new HashMap<String, Object>();

        User user = userMapper.selectByPrimaryKey(userId);
        map.put("userId", user.getId());
        map.put("nickName", user.getNickName());
        map.put("coinBalance", user.getCoinBalance());
        map.put("balance", user.getBalance());
        List<UserAddress> addressList = user.getUserAddresses();
        for (UserAddress userAddress : addressList) {
            if (userAddress.getIsDefault().equals(Constants.DEFAULT_ADDRESS)) {
                map.put("userAddress", userAddress);
                break;
            }
        }
        return new Response(map);
    }

    /**
     * 查询用户所有收货地址
     *
     * @param userId
     * @return
     */
    public Response getUserAllAddress(Long userId) {
        List<UserAddress> list;
        try {
            list = userAddressMapper.selectByUserId(userId);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.LIST_ERROR);
        }
        return new Response(list);
    }

    /**
     * 查询用户钱包信息
     *
     * @param userId
     * @return
     */
    public Response getUserPackage(Long userId) {
        if (DataUtils.isNullOrEmpty(userId))
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        Map<String, Object> map = new HashMap<String, Object>();
        System.out.print("userId:"+userId);
        User user = userMapper.selectByPrimaryKey(userId);
        if (DataUtils.isNullOrEmpty(user) || user.getIsDelete() == Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        map.put("id", user.getId());
        map.put("nickName", user.getNickName());
        map.put("thirdPartId", user.getThirdPartId());
        map.put("platformId", user.getPlatformId());
        map.put("coinBalance", user.getCoinBalance());
        map.put("balance", user.getBalance());
        map.put("walletAddress",user.getWalletAddress());

        //获得冻结的画呗数量
        List<WithdrawChargeRecord> withdrawList = withdrawService.getUnCompleteWithdrawListByUserId(userId);
        BigDecimal blockCoin = new BigDecimal(0);
        for(WithdrawChargeRecord w:withdrawList){
            blockCoin = blockCoin.add(w.getWithdrawAmount());
        }
        map.put("blockCoin", blockCoin);
        return new Response(map);
    }

    public Response getUserWithAddress(Long userId) {
        User user = null;
        try {
            user = userMapper.getUserWithAddresses(userId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new Response(user);
    }

    /**
     * 用户充值HNB
     *
     * @param userId
     * @param price
     * @return
     */
    public Response userRecharge(Long userId, BigDecimal price, String openId, String clientIP) {
        //查询用户信息
        User user = userMapper.selectByPrimaryKey(userId);
        /**
         * 调起微信支付
         *
         */
        Map<String, Object> orderInfoMap = wxPayService.executeWxPrepay(openId, price, clientIP, Constants.WX_PAY_TYPE_CHONGZHI, userId);
        return new Response((Long) orderInfoMap.get("code"), (String) orderInfoMap.get("message"), orderInfoMap);
    }

    /**
     * 绑定用户手机号码
     *
     * @param userId
     * @param phone
     * @return
     */
    public Response bindUserPhone(Long userId, String phone) {
        User user = userMapper.selectByPrimaryKey(userId);
        user.setPhone(phone);
        userMapper.updateByPrimaryKey(user);
        return new Response(Code.SUCCESS);
    }

    /**
     * 根据平台获取每日新增客户
     *
     * @param platformId
     * @param startDate
     * @param endDate
     * @return
     */
    public int countByDate(Long platformId, Date startDate, Date endDate) {
        UserExample example = new UserExample();
        UserExample.Criteria criteria = example.createCriteria();
        criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);
        criteria.andPlatformIdEqualTo(platformId);
        criteria.andCreateTimeBetween(startDate, endDate);
        return userMapper.countByExample(example);
    }

    public Response getUserList(Integer pageNum, Integer pageSize, String orderBy, Long platformId, String nickName) {
        PageHelper.startPage(pageNum, pageSize);
        List<User> list = null;
        Integer all = 0;
        UserExample example = new UserExample();
        UserExample.Criteria criteria = example.createCriteria();
        if (!DataUtils.isNullOrEmpty(platformId)) {
            criteria.andPlatformIdEqualTo(platformId);
        }
        if (!DataUtils.isNullOrEmpty(nickName)) {
            criteria.andNickNameEqualTo(nickName);
        }
        if (!DataUtils.isNullOrEmpty(orderBy)) {
            example.setOrderByClause(orderBy);
        }
        list = userMapper.selectByExample(example);
        all = userMapper.countByExample(example);

        return new Response(new PageBeanExtra(list, all.longValue()));
    }

    public Response getUserInfoByUserId(Long userId) {
        User user = userMapper.selectByPrimaryKey(userId);
        if (DataUtils.isNullOrEmpty(user) || user.getIsDelete() == Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        return new Response(user);
    }

    public Response blockUser(String userIds) {
        String[] ids = userIds.contains(",")?userIds.split(","):new String[]{userIds};
        for (String id : ids){
            User user = userMapper.selectByPrimaryKey(Long.valueOf(id));
            if (DataUtils.isNullOrEmpty(user) || user.getIsDelete() == Constants.OBJECT_IS_DELETE)
                return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
            user.setStatus(Constants.USER_STATUS_BLOCK);
            user.setUpdateTime(new Date());
            userMapper.updateByPrimaryKeySelective(user);
        }
        return new Response(Code.SUCCESS);
    }

    @Override
    public Response loginValidate(Long userId) {
        if (DataUtils.isNullOrEmpty(userId))
            return new Response(Code.SUCCESS);
        User user = userMapper.selectByPrimaryKey(userId);
        if (DataUtils.isNullOrEmpty(user) || user.getIsDelete() == Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        return new Response(Code.SUCCESS);
    }

    @Override
    public Response bindUserWalletAddress(Long userId, String walletAddress) {
        User user = userMapper.selectByPrimaryKey(userId);
        user.setWalletAddress(walletAddress);
        user.setUpdateTime(new Date());
        userMapper.updateByPrimaryKeySelective(user);
        return new Response(Code.SUCCESS);
    }
}