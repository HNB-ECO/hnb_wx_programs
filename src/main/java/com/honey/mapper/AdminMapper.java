package com.honey.mapper;

import com.honey.entity.Admin;
import com.honey.entity.AdminExample;
import java.util.List;

public interface AdminMapper {
    int countByExample(AdminExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Admin record);

    int insertSelective(Admin record);

    List<Admin> selectByExample(AdminExample example);

    Admin selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Admin record);

    int updateByPrimaryKey(Admin record);
}