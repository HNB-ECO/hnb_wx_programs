package com.honey.service.impl;

import com.honey.entity.AdminExample;
import com.honey.entity.AdminMenu;
import com.honey.entity.AdminMenuExample;
import com.honey.mapper.AdminMenuMapper;
import com.honey.response.Response;
import com.honey.service.AdminMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Zyl on 2018/5/23.
 */
@Service
public class AdminMenuServiceImpl implements AdminMenuService {

    @Autowired
    private AdminMenuMapper adminMenuMapper;

    public List<AdminMenu> selectByRole(List<String> roles) {
        return adminMenuMapper.selectByRole(roles);
    }

    public List<AdminMenu> selectByFatherId(Long fatherId) {
        return adminMenuMapper.selectByFatherId(fatherId);
    }

    /**
     * 查询所有子菜单
     * @param roles
     * @return
     */
    public Response selectChildMenu(List<String> roles) {
        AdminMenuExample example = new AdminMenuExample();
        AdminMenuExample.Criteria criteria = example.createCriteria();
        criteria.andFatherIdIsNotNull();
        criteria.andRoleIn(roles);
        List<AdminMenu> menu = adminMenuMapper.selectByExample(example);
        return new Response(menu);
    }

}
