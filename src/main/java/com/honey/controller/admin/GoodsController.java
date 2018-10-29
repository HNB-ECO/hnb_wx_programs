package com.honey.controller.admin;

import com.honey.entity.Goods;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.GoodDetailService;
import com.honey.service.GoodsService;
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
 * Created by Administrator on 2018/5/21.
 */

@Controller("adminGoodsController")
@RequestMapping(value = "/admin/goods")
public class GoodsController {

    @Autowired
    private GoodsService goodsService;


    /**
     * 进入商品页面
     * @return
     */
    @RequestMapping(value = "/intoGoodManage", method = RequestMethod.GET)
    public String intoGoodManage(HttpServletRequest request){
        return "/goods/list";
    }

    /**
     * 查询商品列表
     * @param pageNum 页数
     * @param pageSize 每页记录数
     * @param orderBy 排序条件
     * @param goodTypeId 商品类型ID
     * @param goodName 商品名称
     * @param request
     * @return
     */
    @RequestMapping(value = "/getGoodsList", method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> getGoodsList(@RequestParam(value = "pageNum", defaultValue = Constants.DEFAULT_PAGE_NUM) Integer pageNum,
                                           @RequestParam(value = "pageSize", defaultValue = Constants.DEFAULT_PAGE_SIZE) Integer pageSize,
                                           @RequestParam(value = "orderBy", defaultValue = "id asc", required = false) String orderBy,
                                           @RequestParam(value = "goodTypeId", required = false) Long goodTypeId,
                                           @RequestParam(value = "goodName", required = false) String goodName,
                                           @RequestParam(value = "platformId", required = false) Long platformId,
                                           HttpServletRequest request) {
        try {
            platformId = CommonUtil.getPlatformId(request,platformId);
            return goodsService.getGoodsList(pageNum, pageSize, orderBy, platformId, goodTypeId, goodName);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 通过商品ID查询商品信息
     * @param goodsId
     * @return
     */
    @RequestMapping(value = "/getGoodsInfo", method = RequestMethod.GET)
    @ResponseBody
    public Response getGoodsInfo(@RequestParam(value = "goodsId") Long goodsId){
        try {
            return goodsService.getGoodsInfoByGoodsId(goodsId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 创建商品信息
     * @param goods
     * @return
     */
    @RequestMapping(value = "/createGoods", method = RequestMethod.POST)
    @ResponseBody
    public Response createGoods(Goods goods,HttpServletRequest request){
        try {
            Long platformId = CommonUtil.getPlatformId(request,goods.getPlatformId());
            goods.setPlatformId(platformId);
            return goodsService.createGoods(goods);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 修改商品信息
     * @param goods
     * @return
     */
    @RequestMapping(value = "/updateGoods", method = RequestMethod.POST)
    @ResponseBody
    public Response updateGoods(Goods goods){
        try {
            return goodsService.updateGoods(goods);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 删除商品信息
     * @param goodsId
     * @return
     */
    @RequestMapping(value = "/deleteGoods", method = RequestMethod.POST)
    @ResponseBody
    public Response deleteGoods(@RequestParam(value = "goodsId") String goodsId){
        try {
            return goodsService.deleteGoods(goodsId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }
}
