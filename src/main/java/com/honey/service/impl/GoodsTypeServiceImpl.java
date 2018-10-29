package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.Goods;
import com.honey.entity.GoodsType;
import com.honey.entity.GoodsTypeExample;
import com.honey.entity.GoodsTypeExample.Criteria;
import com.honey.mapper.GoodDetailMapper;
import com.honey.mapper.GoodsMapper;
import com.honey.mapper.GoodsTypeMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.GoodsTypeService;
import com.honey.util.Constants;
import com.honey.util.DataUtils;
import com.honey.util.PageBean;
import com.honey.util.PageBeanExtra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by ZYL on 2018/4/25.
 * 商品类别 业务层接口实现类
 */
@Service
public class GoodsTypeServiceImpl implements GoodsTypeService {

    @Autowired
    private GoodsTypeMapper goodsTypeMapper;

    @Autowired
    private GoodsMapper goodsMapper;

    @Autowired
    private GoodDetailMapper goodDetailMapper;

    /**
     * 分页检索查询
     * @param pageNum
     * @param pageSize
     * @param orderBy
     * @param goodTypeName
     * @param isDelete
     * @param platformId
     * @return
     */
    public Response<PageBean> pageAll(Integer pageNum, Integer pageSize, String orderBy, String goodTypeName, Integer isDelete, Long platformId) {
        PageHelper.startPage(pageNum, pageSize);
        List<GoodsType> list = null;
        Integer all = 0;
        try {
            GoodsTypeExample example = new GoodsTypeExample();
            Criteria criteria = example.createCriteria();
            if(!DataUtils.isNullOrEmpty(goodTypeName))
                criteria.andGoodTypeNameLike("%"+goodTypeName+"%");
            if(!DataUtils.isNullOrEmpty(isDelete))
                criteria.andIsDeleteEqualTo(isDelete);
            if(!DataUtils.isNullOrEmpty(platformId))
                criteria.andPlatformIdEqualTo(platformId);
            if(!DataUtils.isNullOrEmpty(orderBy))
                example.setOrderByClause(orderBy);
            list = goodsTypeMapper.selectByExample(example);
        }catch (Exception e){
            e.printStackTrace();
            new Response(Code.PAGE_ERROR);
        }
        return new Response(new PageBeanExtra(list, all.longValue()));
    }

    /**
     * 列表检索查询
     * @param goodTypeName
     * @param fatherTypeId
     * @param platformId
     * @param orderBy
     * @return
     */
    public Response selectAll(String goodTypeName, Long fatherTypeId, Long platformId, String orderBy) {
        List<GoodsType> list = null;
        try {
            GoodsTypeExample example = new GoodsTypeExample();
            Criteria criteria = example.createCriteria();
            if(!DataUtils.isNullOrEmpty(goodTypeName))
                criteria.andGoodTypeNameLike("%"+goodTypeName+"%");
            if(!DataUtils.isNullOrEmpty(fatherTypeId))
                criteria.andFatherTypeIdEqualTo(fatherTypeId);
            if(!DataUtils.isNullOrEmpty(platformId))
                criteria.andPlatformIdEqualTo(platformId);
            criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);//未删除
            if(!DataUtils.isNullOrEmpty(orderBy))
                example.setOrderByClause(orderBy);
            list = goodsTypeMapper.selectByExample(example);
        }catch (Exception e){
            e.printStackTrace();
            new Response(Code.PAGE_ERROR);
        }
        return new Response(list);
    }

    /**
     * 只查询商品类别的ID和名称
     * @param platformId
     * @return
     */
    public Response getGoodsTypeIdAndName(Long platformId) {
        List<Map<String,Object>> list = null;
        if(platformId ==null)
            return new Response<PageBean>(Code.REQUEST_PARAM_INCOMPLETE);
        list = goodsTypeMapper.selectGoodsTypeIdAndName(platformId);
        return new Response(list);
    }

    /**
     * 添加
     * @param goodsType
     * @return
     */
    public Response add(GoodsType goodsType) {
        if (DataUtils.isNullOrEmpty(goodsType.getGoodTypeName()) ||
                DataUtils.isNullOrEmpty(goodsType.getPlatformId()) ||
                DataUtils.isNullOrEmpty(goodsType.getRanking())||
                DataUtils.isNullOrEmpty(goodsType.getDescription())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }

        goodsType.setCreateTime(new Date());
        goodsType.setUpdateTime(new Date());
        goodsType.setIsDelete(Constants.OBJECT_NOT_DELETE);
        goodsTypeMapper.insertIdBack(goodsType);
        return new Response(goodsType);
    }

    /**
     * 通过主键查询
     * @param id
     * @return
     */
    public Response queryOne(Long id) {
        GoodsType goodsType = goodsTypeMapper.selectByPrimaryKey(id);
        //判断对象是否不存在或者已经被删除
        if(DataUtils.isNullOrEmpty(goodsType)||goodsType.getIsDelete()== Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);

        return new Response(goodsType);
    }

    /**
     * 更新
     * @param goodsType
     * @return
     */
    public Response update(GoodsType goodsType) {
        if (DataUtils.isNullOrEmpty(goodsType.getGoodTypeName()) ||
                DataUtils.isNullOrEmpty(goodsType.getPlatformId()) ||
                DataUtils.isNullOrEmpty(goodsType.getRanking())||
                DataUtils.isNullOrEmpty(goodsType.getDescription())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }

        goodsType.setUpdateTime(new Date());
        goodsTypeMapper.updateByPrimaryKeySelective(goodsType);
        return new Response(goodsType);
    }

    /**
     * 删除
     * @param typeIds
     * @return
     */
    public Response delete(String typeIds) {
        String [] ids = typeIds.contains(",")?typeIds.split(","):new String[]{typeIds};

        for (String id : ids){
            GoodsType goodsType = goodsTypeMapper.selectByPrimaryKey(Long.valueOf(id));
            if(DataUtils.isNullOrEmpty(goodsType)||goodsType.getIsDelete()== Constants.OBJECT_IS_DELETE)
                return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
            goodsType.setIsDelete(Constants.OBJECT_IS_DELETE);
            goodsType.setUpdateTime(new Date());
            goodsTypeMapper.updateByPrimaryKeySelective(goodsType);

            Long goodsTypeId = goodsType.getId();
            List<Goods> goodsList = goodsType.getGoodsList();
            //删除对应的goodsDetail
            for(Goods g:goodsList){
                Long goodsId = g.getId();
                goodDetailMapper.userDeleteByGoodId(goodsId);
            }
            //删除对应的goods
            goodsMapper.userDeleteGoodsByGoodsType(goodsTypeId);
        }

        return new Response(Code.SUCCESS);
    }
}
