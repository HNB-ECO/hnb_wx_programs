package com.honey.controller.webservice;

import com.honey.entity.User;
import com.honey.entity.UserAddress;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.ChargeRecordService;
import com.honey.service.UserAddressService;
import com.honey.service.UserService;
import com.honey.util.PageBean;
import com.honey.util.PayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;

/**
 * Created by ZYL on 2018/4/26.
 */
@RestController
@RequestMapping("/webservice/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAddressService userAddressService;

    @Autowired
    private ChargeRecordService chargeRecordService;

    /**
     * 验证用户信息是否存在
     * @param userId
     * @return
     */
    @RequestMapping(value = "/loginValidate", method = RequestMethod.POST)
    @ResponseBody
    public Response loginValidate(@RequestParam(value = "userId") Long userId){
        try {
            return userService.loginValidate(userId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 创建用户信息
     * @param user
     * @return
     */
    @RequestMapping(value = "/userLogin", method = RequestMethod.POST)
    @ResponseBody
    public Response userLogin(User user){
        try {
            return userService.createUser(user);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }


    /**
     * 确认下单前查询用户信息和地址信息
     * @param userId
     * @return
     */
    @RequestMapping(value = "/getUserOrderInfo", method = RequestMethod.GET)
    @ResponseBody
    public Response getUserOrderInfo(@RequestParam(value = "userId") Long userId){
        try {
            return userService.getUserInfoById(userId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 获取用户所有的收货地址
     * @param userId
     * @return
     */
    @RequestMapping(value = "/getUserAllAddress", method = RequestMethod.GET)
    @ResponseBody
    public Response getUserAllAddress(@RequestParam(value = "userId") Long userId){
        return userService.getUserAllAddress(userId);
    }

    /**
     * 添加或编辑收货地址
     * @return
     */
    @RequestMapping(value = "/addOrUpdateUserAddress",method = RequestMethod.POST)
    @ResponseBody
    public Response addOrUpdateUserAddress(UserAddress userAddress){
        return userAddressService.addOrUpdate(userAddress);
    }

    /**
     * 设置默认地址
     * @param userId
     * @param userAddressId
     * @return
     */
    @RequestMapping(value = "/updateDefaultAddress",method = RequestMethod.POST)
    @ResponseBody
    public Response updateDefaultAddress(@RequestParam(value = "userId") Long userId,
                                         @RequestParam(value = "userAddressId") Long userAddressId){
        return userAddressService.updateToDefault(userId,userAddressId);
    }

    /**
     * 删除地址
     * @param userAddressId
     * @return
     */
    @RequestMapping(value = "/deleteAddress",method = RequestMethod.POST)
    @ResponseBody
    public Response deleteAddress(@RequestParam(value = "userAddressId") Long userAddressId){
        return userAddressService.deleteAddress(userAddressId);
    }

    /**
     * 进入编辑页面，查询明细
     * @param userAddressId
     * @return
     */
    @RequestMapping(value = "/addressDetail",method = RequestMethod.GET)
    @ResponseBody
    public Response addressDetail(@RequestParam(value = "userAddressId") Long userAddressId){
        return userAddressService.addressDetail(userAddressId);
    }

    /**
     * 查询HNB的交易流水
     * @param pageNum
     * @param pageSize
     * @param userId
     * @param platformId
     * @return
     */
    @RequestMapping(value = "/userChargeRecord",method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> userChargeRecord(@RequestParam(value ="pageNum") Integer pageNum ,
                                               @RequestParam(value ="pageSize") Integer pageSize,
                                               @RequestParam(value ="userId") Long userId,
                                               @RequestParam(value ="platformId") Long platformId){
        try {
            return chargeRecordService.recordPageList(pageNum,pageSize,userId,platformId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.PAGE_ERROR);
        }
    }

    /**
     * 查询用户钱包信息
     * @param userId
     * @return
     */
    @RequestMapping(value = "/getUserPackage",method = RequestMethod.GET)
    @ResponseBody
    public Response getUserPackage(@RequestParam(value ="userId") Long userId){
        try {
            return userService.getUserPackage(userId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 获取用户信息及地址
     * @param userId
     * @return
     */
    @RequestMapping(value = "/getUserWithAddress")
    @ResponseBody
    public Response getUserWithAddress(@RequestParam(value ="userId") Long userId){
        return userService.getUserWithAddress(userId);
    }


    /**
     * 充值
     * @param userId
     * @param price
     * @return
     */
    @RequestMapping(value = "/userRecharge",method = RequestMethod.POST)
    @ResponseBody
    public Response userRecharge(@RequestParam(value = "userId") Long userId,
                                 @RequestParam(value = "price") BigDecimal price,
                                 @RequestParam(value = "openId") String openId,
                                 HttpServletRequest request) {
        try {
            String clientIP = PayUtil.getClientIp(request);
            return userService.userRecharge(userId, price, openId, clientIP);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.USER_RECHARGE_ERROR);
        }
    }

    /**
     * 用户绑定手机号码
     * @param userId
     * @param phone
     * @return
     */
    @RequestMapping(value = "/bindUserPhone",method = RequestMethod.POST)
    @ResponseBody
    public Response bindUserPhone(@RequestParam(value ="userId") Long userId,@RequestParam(value ="phone") String phone){
        try {
            return userService.bindUserPhone(userId,phone);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 用户绑定钱包地址
     * @param userId
     * @param walletAddress
     * @return
     */
    @RequestMapping(value = "/bindUserWalletAddress",method = RequestMethod.POST)
    @ResponseBody
    public Response bindUserWalletAddress(@RequestParam(value ="userId") Long userId,@RequestParam(value ="walletAddress") String walletAddress){
        try {
            return userService.bindUserWalletAddress(userId, walletAddress);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }
}
