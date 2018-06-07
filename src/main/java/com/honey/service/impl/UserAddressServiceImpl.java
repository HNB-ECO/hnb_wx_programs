package com.honey.service.impl;

import com.honey.entity.UserAddress;
import com.honey.entity.UserAddressExample;
import com.honey.entity.UserAddressExample.Criteria;
import com.honey.mapper.UserAddressMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.UserAddressService;
import com.honey.util.Constants;
import com.honey.util.DataUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by ZYL on 2018/4/27.
 */
@Service
public class UserAddressServiceImpl implements UserAddressService {

    @Autowired
    private UserAddressMapper userAddressMapper;

    /**
     * 添加或更新收货地址
     * @param userAddress
     * @return
     */
    public Response addOrUpdate(UserAddress userAddress) {
        int result;
        try {
            if(DataUtils.isNullOrEmpty(userAddress.getId())){//添加
                userAddress.setCreateTime(new Date());
                userAddress.setUpdateTime(new Date());
                userAddress.setIsDelete(Constants.OBJECT_NOT_DELETE);
                //判断用户是否有地址
                Boolean hasAddress = hasAddress(userAddress.getUserId());
                if(hasAddress){
                    //用户有地址设置为普通地址
                    userAddress.setIsDefault(Constants.NOT_DEFAULT_ADDRESS);
                }else {
                    //如果用户没有地址设置为默认地址
                    userAddress.setIsDefault(Constants.DEFAULT_ADDRESS);
                }
                result = userAddressMapper.insert(userAddress);
            }else {//编辑
                UserAddress userAddressDB = userAddressMapper.selectByPrimaryKey(userAddress.getId());
                userAddressDB.setUserId(userAddress.getUserId());
                userAddressDB.setName(userAddress.getName());
                userAddressDB.setPhone(userAddress.getPhone());
                userAddressDB.setProvince(userAddress.getProvince());
                userAddressDB.setCity(userAddress.getCity());
                userAddressDB.setArea(userAddress.getArea());
                userAddressDB.setAddress(userAddress.getAddress());
                result = userAddressMapper.updateByPrimaryKey(userAddressDB);
            }
            if(result!=1) {
                return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
        return new Response(Code.SUCCESS);
    }

    /**
     * 删除地址
     * @param userAddressId
     * @return
     */
    public Response deleteAddress(Long userAddressId) {
        try {
            UserAddress userAddress = userAddressMapper.selectByPrimaryKey(userAddressId);//查询要删除的地址是否存在
            if(DataUtils.isNullOrEmpty(userAddress)||userAddress.getIsDelete()== Constants.OBJECT_IS_DELETE)
                return new Response(Code.DELETE_BY_PRIMARY_KEY_ERROR);

            userAddress.setIsDelete(Constants.OBJECT_IS_DELETE);//状态更新为已删除
            userAddressMapper.updateByPrimaryKeySelective(userAddress);//更新实体类
        }catch (Exception e){
            e.printStackTrace();
        }
        return new Response(Code.SUCCESS);
    }

    /**
     * 更新为默认地址
     * @param userAddressId
     * @return
     */
    public Response updateToDefault(Long userId ,Long userAddressId) {

        try {
            UserAddress userAddress = userAddressMapper.selectByPrimaryKey(userAddressId);//查询要删除的地址是否存在
            if(DataUtils.isNullOrEmpty(userAddress)||userAddress.getIsDelete()== Constants.OBJECT_IS_DELETE)
                return new Response(Code.DELETE_BY_PRIMARY_KEY_ERROR);
            if(userAddress.getIsDefault()==Constants.DEFAULT_ADDRESS)//状态已经是默认地址了
                return new Response(Code.OBJECT_UPDATE_STATUS_ERROR);

            //查询用户是否已经有默认地址
            UserAddressExample example = new UserAddressExample();
            Criteria criteria = example.createCriteria();
            criteria.andUserIdEqualTo(userId);
            criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);
            criteria.andIsDefaultEqualTo(Constants.DEFAULT_ADDRESS);
            List<UserAddress> defaultA = userAddressMapper.selectByExample(example);
            if(defaultA.size() > 1) {
                return new Response(Code.UPDATE_DEFAULT_ADDRESS_FAILED);
            }
            if(defaultA.size() ==1){
                UserAddress defaultAddress = defaultA.get(0);
                //更新默认地址为普通地址
                defaultAddress.setIsDefault(Constants.NOT_DEFAULT_ADDRESS);
                userAddressMapper.updateByPrimaryKeySelective(defaultAddress);
            }

            //更新当前地址为默认地址
            userAddress.setIsDefault(Constants.DEFAULT_ADDRESS);
            userAddressMapper.updateByPrimaryKeySelective(userAddress);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.UPDATE_DEFAULT_ADDRESS_FAILED);
        }
        return new Response(Code.SUCCESS);
    }

    /**
     * 查询地址信息
     * @param userAddressId
     * @return
     */
    public Response addressDetail(Long userAddressId) {
        UserAddress userAddress = null;
        try {
            userAddress = userAddressMapper.selectByPrimaryKey(userAddressId);
            if(DataUtils.isNullOrEmpty(userAddress)||userAddress.getIsDelete()==Constants.OBJECT_IS_DELETE);
                return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new Response(userAddress);
    }


    /**
     * 查询用户是否已经拥有地址
     * @param userId
     * @return
     */
    private boolean hasAddress(Long userId) {
        List<UserAddress> list;
        try {
            //查询该用户是否有未删除的地址信息
            UserAddressExample example = new UserAddressExample();
            UserAddressExample.Criteria criteria = example.createCriteria();
            criteria.andUserIdEqualTo(userId);
            criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);
            list = userAddressMapper.selectByExample(example);
            if(list.size()<1)
                return false;
        }catch (Exception e){
            e.printStackTrace();
        }
        return true;
    }
}
