package com.honey.service;

import com.honey.entity.UserAddress;
import com.honey.response.Response;

/**
 * Created by ZYL on 2018/4/27.
 */
public interface UserAddressService {

    Response addOrUpdate(UserAddress userAddress);

    Response deleteAddress(Long userAddressId);

    Response updateToDefault(Long userId , Long userAddressId);

    Response addressDetail(Long userAddressId);

}
