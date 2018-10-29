package com.honey.mapper;

import com.honey.entity.UserAddress;
import com.honey.entity.UserAddressExample;
import java.util.List;

public interface UserAddressMapper {
    int countByExample(UserAddressExample example);

    int deleteByPrimaryKey(Long id);

    int insert(UserAddress record);

    int insertSelective(UserAddress record);

    List<UserAddress> selectByExample(UserAddressExample example);

    UserAddress selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(UserAddress record);

    int updateByPrimaryKey(UserAddress record);

    List<UserAddress> selectByUserId(Long userId);
}