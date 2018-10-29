package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.GoodDetail;
import com.honey.entity.GoodDetailExample;
import com.honey.entity.Goods;
import com.honey.entity.GoodsExample;
import com.honey.mapper.GoodDetailMapper;
import com.honey.mapper.GoodsMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.GoodsService;
import com.honey.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by ZYL on 2018/4/25.
 */
@Service
public class GoodsServiceImpl implements GoodsService {

    @Autowired
    private GoodsMapper goodsMapper;

    @Autowired
    private GoodDetailMapper goodDetailMapper;

    /**
     * 用于小程序端查看详情，会增加商品查看次数
     * @param goodId
     * @return
     */
    public Response queryOne(Long goodId) {
        Goods goods = goodsMapper.selectByPrimaryKey(goodId);
        if (DataUtils.isNullOrEmpty(goods) || goods.getIsDelete() == Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        //更新商品查看次数
        Goods newGoods = new Goods();
        newGoods.setId(goods.getId());
        newGoods.setViewCount(goods.getViewCount()+1l);
        newGoods.setUpdateTime(new Date());
        goodsMapper.updateByPrimaryKeySelective(newGoods);
        return new Response(goods);
    }

    /**
     * 用于后台管理查看详情，不会增加查看次数
     * @param goodsId
     * @return
     */
    public Response getGoodsInfoByGoodsId(Long goodsId) {
        Goods goods = goodsMapper.selectByPrimaryKey(goodsId);
        if (DataUtils.isNullOrEmpty(goods) || goods.getIsDelete() == Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        return new Response(goods);
    }

    public Response<PageBean> getGoodsList(Integer pageNum, Integer pageSize, String orderBy, Long platformId, Long goodTypeId, String goodName) {
        PageHelper.startPage(pageNum, pageSize);
        List<Goods> list = null;
        Integer all = 0;
        GoodsExample example = new GoodsExample();
        GoodsExample.Criteria criteria = example.createCriteria();
        if (!DataUtils.isNullOrEmpty(platformId)) {
            criteria.andPlatformIdEqualTo(platformId);
        }
        if (!DataUtils.isNullOrEmpty(goodTypeId)) {
            criteria.andGoodTypeIdEqualTo(goodTypeId);
        }
        if (!DataUtils.isNullOrEmpty(goodName)) {
            criteria.andNameLike("%" + goodName + "%");
        }
        if (!DataUtils.isNullOrEmpty(orderBy)) {
            example.setOrderByClause(orderBy);
        }
        list = goodsMapper.selectByExample(example);
        all = goodsMapper.countByExample(example);

        return new Response(new PageBeanExtra(list, all.longValue()));
    }

    public Response createGoods(Goods goods) {
        if (DataUtils.isNullOrEmpty(goods.getName()) ||
                DataUtils.isNullOrEmpty(goods.getShortName()) ||
                DataUtils.isNullOrEmpty(goods.getPlatformId()) ||
                DataUtils.isNullOrEmpty(goods.getGoodTypeId()) ||
                DataUtils.isNullOrEmpty(goods.getAccPay()) ||
                DataUtils.isNullOrEmpty(goods.getImageUrl()) ||
                DataUtils.isNullOrEmpty(goods.getInfoUrl())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }

        goods.setCreateTime(new Date());
        goods.setUpdateTime(new Date());
        goods.setIsDelete(Constants.OBJECT_NOT_DELETE);
        goods.setSales(0l);
        goodsMapper.insertIdBack(goods);
        return new Response(goods);
    }

    public Response updateGoods(Goods goods) {
        if (DataUtils.isNullOrEmpty(goods.getName()) ||
                DataUtils.isNullOrEmpty(goods.getShortName()) ||
                DataUtils.isNullOrEmpty(goods.getPlatformId()) ||
                DataUtils.isNullOrEmpty(goods.getGoodTypeId()) ||
                DataUtils.isNullOrEmpty(goods.getAccPay()) ||
                DataUtils.isNullOrEmpty(goods.getImageUrl()) ||
                DataUtils.isNullOrEmpty(goods.getInfoUrl())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }

        goods.setUpdateTime(new Date());
        goodsMapper.updateByPrimaryKeySelective(goods);
        return new Response(goods);
    }

    public Response deleteGoods(String goodsIds) {
        if (DataUtils.isNullOrEmpty(goodsIds))
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        String [] ids = goodsIds.contains(",")?goodsIds.split(","):new String[]{goodsIds};
        for (String id : ids){
            Goods goods = goodsMapper.selectByPrimaryKey(Long.valueOf(id));
            goods.setIsDelete(Constants.OBJECT_IS_DELETE);
            goods.setUpdateTime(new Date());
            goodsMapper.updateByPrimaryKeySelective(goods);
            //修改goods对应的goodsDetail状态
            goodDetailMapper.userDeleteByGoodId(goods.getId());
        }
        return new Response(Code.SUCCESS);
    }

    public List<Goods> getByPlatformId(Long platformId) {
        GoodsExample example = new GoodsExample();
        GoodsExample.Criteria criteria = example.createCriteria();
        criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);
        criteria.andPlatformIdEqualTo(platformId);
        return goodsMapper.selectByExample(example);
    }

    public Long sumGoodsSales(Long goodsId) {
        return goodsMapper.sumGoodSales(goodsId);
    }

}
