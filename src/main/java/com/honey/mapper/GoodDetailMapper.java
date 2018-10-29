package com.honey.mapper;

import com.honey.entity.GoodDetail;
import com.honey.entity.GoodDetailExample;
import java.util.List;

public interface GoodDetailMapper {
    int countByExample(GoodDetailExample example);

    int deleteByPrimaryKey(Long id);

    int insert(GoodDetail record);

    int insertSelective(GoodDetail record);

    List<GoodDetail> selectByExample(GoodDetailExample example);

    GoodDetail selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(GoodDetail record);

    int updateByPrimaryKey(GoodDetail record);

    int userDeleteByGoodId(Long goodId);
}