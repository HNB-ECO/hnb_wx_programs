package com.honey.mapper;

import com.honey.entity.AdminMenu;
import com.honey.entity.AdminMenuExample;
import java.util.List;

public interface AdminMenuMapper {
    int countByExample(AdminMenuExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(AdminMenu record);

    int insertSelective(AdminMenu record);

    List<AdminMenu> selectByExample(AdminMenuExample example);

    AdminMenu selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AdminMenu record);

    int updateByPrimaryKey(AdminMenu record);

    List<AdminMenu> selectByRole(List<String> roles);

    List<AdminMenu> selectByFatherId(Long fatherId);
}