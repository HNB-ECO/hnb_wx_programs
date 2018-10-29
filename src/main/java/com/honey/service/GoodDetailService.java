package com.honey.service;

import com.honey.entity.GoodDetail;
import com.honey.entity.Goods;
import com.honey.response.Response;
import com.honey.util.PageBean;

/**
 * Created by ZYL on 2018/4/26.
 */
public interface GoodDetailService {

    Response getByGoodsId(Long goodsId);

    Response<PageBean> getGoodsDetailList(Integer pageNum, Integer pageSize,String orderBy, Long goodsId);

    Response getByGoodsDetailById(Long goodsDetailId);

    Response createGoodsDetail(GoodDetail goodsDetail);

    Response updateGoodsDetail(GoodDetail goodsDetail);

    Response deleteGoodsDetail(String goodsDetailIds);

}
