package com.honey.controller.admin;

import com.honey.entity.Goods;
import com.honey.entity.GoodsType;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.GoodsTypeService;
import com.honey.util.CommonUtil;
import com.honey.util.Constants;
import com.honey.util.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2018/5/24.
 */
@Controller("adminGoodsTypeController")
@RequestMapping(value = "/admin/goodsType")
public class GoodTypeController {

    @Autowired
    private GoodsTypeService goodsTypeService;

    /**
     * 进入商品类别页面
     * @return
     */
    @RequestMapping(value = "/intoGoodClassify", method = RequestMethod.GET)
    public String intoGoodClassify(HttpServletRequest request){
        return "/goods/classifyList";
    }

    /**
     * 获得商品类型下拉表
     * @return
     */
    @RequestMapping(value = "/getGoodsTypeSelect", method = RequestMethod.GET)
    @ResponseBody
    public Response getGoodsTypeSelect( @RequestParam(value = "platformId", required = false) Long platformId,
                                  HttpServletRequest request){
        platformId = CommonUtil.getPlatformId(request, platformId);
        return goodsTypeService.getGoodsTypeIdAndName(platformId);
    }

    /**
     * 获得商品类型列表
     * @param pageNum 页数
     * @param pageSize 每页记录数
     * @param orderBy 排序条件
     * @param platformId 平台ID
     * @param request
     * @return
     */
    @RequestMapping(value = "/pageAll", method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> pageAll(@RequestParam(value = "pageNum", defaultValue = Constants.DEFAULT_PAGE_NUM) Integer pageNum,
                                      @RequestParam(value = "pageSize", defaultValue = Constants.DEFAULT_PAGE_SIZE) Integer pageSize,
                                      @RequestParam(value = "orderBy", defaultValue = "id asc", required = false) String orderBy,
                                      @RequestParam(value = "goodsTypeName", required = false) String goodsTypeName,
                                      @RequestParam(value = "isDelete", required = false) Integer isDelete,
                                      @RequestParam(value = "platformId", required = false) Long platformId,
                                      HttpServletRequest request){
        platformId = CommonUtil.getPlatformId(request,platformId);
        return goodsTypeService.pageAll(pageNum, pageSize, orderBy, goodsTypeName, isDelete,platformId );
    }

    /**
     * 通过商品类型ID查询商品类型信息
     * @param goodsTypeId
     * @return
     */
    @RequestMapping(value = "/getGoodsTypeInfo", method = RequestMethod.GET)
    @ResponseBody
    public Response getGoodInfo(@RequestParam(value = "goodsTypeId") Long goodsTypeId){
        try {
            return goodsTypeService.queryOne(goodsTypeId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 创建商品类型信息
     * @param goodsType
     * @return
     */
    @RequestMapping(value = "/createGoodsType", method = RequestMethod.POST)
    @ResponseBody
    public Response createGoods(GoodsType goodsType,HttpServletRequest request){
        try {
            Long platformId = CommonUtil.getPlatformId(request,goodsType.getPlatformId());
            goodsType.setPlatformId(platformId);
            return goodsTypeService.add(goodsType);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 修改商品类型信息
     * @param goodsType
     * @return
     */
    @RequestMapping(value = "/updateGoodsType", method = RequestMethod.POST)
    @ResponseBody
    public Response updateGoodsType(GoodsType goodsType){
        try {
            return goodsTypeService.update(goodsType);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 删除商品信息
     * @param goodsTypeId
     * @return
     */
    @RequestMapping(value = "/deleteGoodsType", method = RequestMethod.POST)
    @ResponseBody
    public Response deleteGoodsType(@RequestParam(value = "goodsTypeId") String goodsTypeId){
        try {
            return goodsTypeService.delete(goodsTypeId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }
}
