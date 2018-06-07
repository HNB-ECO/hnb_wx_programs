package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.GoodDetail;
import com.honey.entity.GoodDetailExample;
import com.honey.entity.GoodDetailExample.Criteria;
import com.honey.entity.Goods;
import com.honey.mapper.GoodDetailMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.GoodDetailService;
import com.honey.util.Constants;
import com.honey.util.DataUtils;
import com.honey.util.PageBean;
import com.honey.util.PageBeanExtra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by ZYL on 2018/4/26.
 */
@Service
public class GoodDetailServiceImpl implements GoodDetailService {

    @Autowired
    private GoodDetailMapper goodDetailMapper;

    /**
     * 通过商品ID 查询商品明细及规格
     *
     * @param goodsId
     * @return
     */
    public Response getByGoodsId(Long goodsId) {
        List<GoodDetail> list;
        GoodDetailExample example = new GoodDetailExample();
        Criteria criteria = example.createCriteria();
        criteria.andGoodIdEqualTo(goodsId);
        list = goodDetailMapper.selectByExample(example);
        return new Response(list);
    }

    public Response<PageBean> getGoodsDetailList(Integer pageNum, Integer pageSize, String orderBy, Long goodsId) {
        PageHelper.startPage(pageNum, pageSize);
        List<GoodDetail> list = null;
        Integer all = 0;
        GoodDetailExample example = new GoodDetailExample();
        GoodDetailExample.Criteria criteria = example.createCriteria();
        if (DataUtils.isNullOrEmpty(goodsId)) {
            return new Response<PageBean>(Code.REQUEST_PARAM_INCOMPLETE);
        }
        criteria.andGoodIdEqualTo(goodsId);
        if (!DataUtils.isNullOrEmpty(orderBy)) {
            example.setOrderByClause(orderBy);
        }
        list = goodDetailMapper.selectByExample(example);
        all = goodDetailMapper.countByExample(example);

        return new Response(new PageBeanExtra(list, all.longValue()));
    }

    public Response getByGoodsDetailById(Long goodsDetailId) {
        GoodDetail goodDetail = goodDetailMapper.selectByPrimaryKey(goodsDetailId);
        if (DataUtils.isNullOrEmpty(goodDetail) || goodDetail.getIsDelete() == Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        return new Response(goodDetail);
    }

    public Response createGoodsDetail(GoodDetail goodsDetail) {
        if (DataUtils.isNullOrEmpty(goodsDetail.getGoodId()) ||
                DataUtils.isNullOrEmpty(goodsDetail.getPrice()) ||
                DataUtils.isNullOrEmpty(goodsDetail.getCoinPrice()) ||
                (DataUtils.isNullOrEmpty(goodsDetail.getColor()) &&
                        DataUtils.isNullOrEmpty(goodsDetail.getWeight()) &&
                        DataUtils.isNullOrEmpty(goodsDetail.getSieze()) &&
                        DataUtils.isNullOrEmpty(goodsDetail.getVolume())) ||
                DataUtils.isNullOrEmpty(goodsDetail.getDescription()) ||
                DataUtils.isNullOrEmpty(goodsDetail.getInventory()) ||
                DataUtils.isNullOrEmpty(goodsDetail.getImageUrl())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }

        goodsDetail.setCreateTime(new Date());
        goodsDetail.setUpdateTime(new Date());
        goodsDetail.setIsDelete(Constants.OBJECT_NOT_DELETE);
        goodDetailMapper.insert(goodsDetail);
        return new Response(Code.SUCCESS);
    }

    public Response updateGoodsDetail(GoodDetail goodsDetail) {
        if (DataUtils.isNullOrEmpty(goodsDetail.getId()) ||
                DataUtils.isNullOrEmpty(goodsDetail.getGoodId()) ||
                DataUtils.isNullOrEmpty(goodsDetail.getPrice()) ||
                DataUtils.isNullOrEmpty(goodsDetail.getCoinPrice()) ||
                (DataUtils.isNullOrEmpty(goodsDetail.getColor()) &&
                        DataUtils.isNullOrEmpty(goodsDetail.getWeight()) &&
                        DataUtils.isNullOrEmpty(goodsDetail.getSieze()) &&
                        DataUtils.isNullOrEmpty(goodsDetail.getVolume())) ||
                DataUtils.isNullOrEmpty(goodsDetail.getDescription()) ||
                DataUtils.isNullOrEmpty(goodsDetail.getInventory()) ||
                DataUtils.isNullOrEmpty(goodsDetail.getImageUrl())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }

        goodsDetail.setUpdateTime(new Date());
        goodDetailMapper.updateByPrimaryKeySelective(goodsDetail);
        return new Response(Code.SUCCESS);
    }

    public Response deleteGoodsDetail(String goodsDetailIds) {
        if (DataUtils.isNullOrEmpty(goodsDetailIds))
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        String [] ids = goodsDetailIds.contains(",")?goodsDetailIds.split(","):new String [] {goodsDetailIds};
        for (String id : ids){
            GoodDetail goodDetail = goodDetailMapper.selectByPrimaryKey(Long.valueOf(id));
            goodDetail.setIsDelete(Constants.OBJECT_IS_DELETE);
            goodDetail.setUpdateTime(new Date());
            goodDetailMapper.updateByPrimaryKeySelective(goodDetail);
        }
        return new Response(Code.SUCCESS);
    }
}
