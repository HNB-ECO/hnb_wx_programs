package com.honey.service;

import com.honey.entity.AdminMenu;
import com.honey.response.Response;

import java.util.List;

/**
 * Created by ZYL on 2018/5/23.
 */
public interface AdminMenuService {

    List<AdminMenu> selectByRole(List<String> roles);

    List<AdminMenu> selectByFatherId(Long fatherId);

    Response selectChildMenu(List<String> roles);

}
