package com.honey.mapper;

import com.honey.entity.ExpressInfo;
import com.honey.entity.ExpressInfoExample;
import java.util.List;

public interface ExpressInfoMapper {
    int countByExample(ExpressInfoExample example);

    int deleteByPrimaryKey(Long id);

    int insert(ExpressInfo record);

    int insertSelective(ExpressInfo record);

    List<ExpressInfo> selectByExample(ExpressInfoExample example);

    ExpressInfo selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ExpressInfo record);

    int updateByPrimaryKey(ExpressInfo record);

    Long insertIdBack(ExpressInfo record);
}