package com.honey.service;

import com.honey.entity.Goods;
import com.honey.response.Response;
import com.honey.util.PageBean;

import java.util.List;

/**
 * 商品信息业务接口
 * Created by ZYL on 2018/4/25.
 */
public interface GoodsService {

    /**
     * 通过ID查询
     * @param goodId
     * @return
     */
    Response queryOne(Long goodId);

    Response getGoodsInfoByGoodsId(Long goodsId);

    Response<PageBean> getGoodsList(Integer pageNum,Integer pageSize,String orderBy,Long platformId,Long goodTypeId,String goodName);

    Response createGoods(Goods goods);

    Response updateGoods(Goods goods);

    Response deleteGoods(String goodsIds);

    List<Goods> getByPlatformId (Long platformId);

    Long sumGoodsSales(Long goodsId);
}
