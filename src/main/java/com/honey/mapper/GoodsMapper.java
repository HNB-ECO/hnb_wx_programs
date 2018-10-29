package com.honey.mapper;

import com.honey.entity.Goods;
import com.honey.entity.GoodsExample;
import java.util.List;

public interface GoodsMapper {
    int countByExample(GoodsExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Goods record);

    int insertSelective(Goods record);

    List<Goods> selectByExample(GoodsExample example);

    Goods selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Goods record);

    int updateByPrimaryKey(Goods record);

    List<Goods> selectByGoodTypeId(Long goodTypeId);

    long insertIdBack(Goods goods);

    Long sumGoodSales(Long goodId);

    int userDeleteGoodsByGoodsType(Long goodsTypeId);
}