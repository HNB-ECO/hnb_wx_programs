package com.honey.mapper;

import com.honey.entity.Goods;
import com.honey.entity.GoodsType;
import com.honey.entity.GoodsTypeExample;

import java.util.List;
import java.util.Map;

public interface GoodsTypeMapper {
    int countByExample(GoodsTypeExample example);

    int deleteByPrimaryKey(Long id);

    int insert(GoodsType record);

    int insertSelective(GoodsType record);

    List<GoodsType> selectByExample(GoodsTypeExample example);

    GoodsType selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(GoodsType record);

    int updateByPrimaryKey(GoodsType record);

    List<GoodsType> selectByPlatformId(Long platformId);

    List<Map<String,Object>> selectGoodsTypeIdAndName(Long platformId);

    long insertIdBack(GoodsType goodsType);
}