package com.honey.service;

import com.honey.entity.GoodsType;
import com.honey.response.Response;
import com.honey.util.PageBean;

/**
 * Created by ZYL on 2018/4/25.
 * 货物类别 业务层接口
 */
public interface GoodsTypeService {

    /**
     * 分页查询
     * @return
     */
    Response<PageBean> pageAll(Integer pageNum, Integer pageSize, String orderBy, String goodTypeName, Integer isDelete, Long platformId);


    /**
     * 列表查询
     * @return
     */
    Response selectAll(String goodTypeName, Long fatherTypeId, Long platformId, String orderBy);

    /**
     * 查询商品类型的ID和Name
     * @param platformId
     * @return
     */
    Response getGoodsTypeIdAndName(Long platformId);
    /**
     * 添加
     * @return
     */
    Response add(GoodsType goodsType);

    /**
     * 根据ID查询
     * @param id
     * @return
     */
    Response queryOne(Long id);

    /**
     * 更新
     * @param goodsType
     * @return
     */
    Response update(GoodsType goodsType);

    /**
     * 删除
     * @param id
     * @return
     */
    Response delete(String ids);

}
