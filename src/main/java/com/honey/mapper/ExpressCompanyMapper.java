package com.honey.mapper;

import com.honey.entity.ExpressCompany;
import com.honey.entity.ExpressCompanyExample;

import java.util.List;
import java.util.Map;

public interface ExpressCompanyMapper {
    int countByExample(ExpressCompanyExample example);

    int deleteByPrimaryKey(Long id);

    int insert(ExpressCompany record);

    int insertSelective(ExpressCompany record);

    List<ExpressCompany> selectByExample(ExpressCompanyExample example);

    ExpressCompany selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ExpressCompany record);

    int updateByPrimaryKey(ExpressCompany record);

    List<Map<String,Object>> getExpressCompanySelect();

}