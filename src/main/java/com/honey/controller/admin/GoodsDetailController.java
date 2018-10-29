package com.honey.controller.admin;

import com.honey.entity.GoodDetail;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.GoodDetailService;
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
 * Created by Administrator on 2018/5/29.
 */

@Controller("adminGoodsDetailController")
@RequestMapping(value = "/admin/goodsDetail")
public class GoodsDetailController {

    @Autowired
    private GoodDetailService goodDetailService;

    /**
     * 进入商品详情页面
     * @return
     */
    @RequestMapping(value = "/intoGoodsDetailManage", method = RequestMethod.GET)
    public String intoGoodsDetailManage(HttpServletRequest request){
        return "/goodsDetail/list";
    }

    /**
     * 查询商品详情列表
     *
     * @param pageNum  页数
     * @param pageSize 每页记录数
     * @param orderBy  排序条件
     * @param goodsId  商品ID
     * @param request
     * @return
     */
    @RequestMapping(value = "/getGoodsDetailList", method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> getGoodsDetailList(@RequestParam(value = "pageNum", defaultValue = Constants.DEFAULT_PAGE_NUM) Integer pageNum,
                                           @RequestParam(value = "pageSize", defaultValue = Constants.DEFAULT_PAGE_SIZE) Integer pageSize,
                                           @RequestParam(value = "orderBy", defaultValue = "id asc", required = false) String orderBy,
                                           @RequestParam(value = "goodsId") Long goodsId,
                                           HttpServletRequest request) {
        try {
            return goodDetailService.getGoodsDetailList(pageNum, pageSize, orderBy, goodsId);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 通过商品ID查询商品规格及明细
     *
     * @param goodsDetailId
     * @return
     */
    @RequestMapping(value = "/getGoodDetail", method = RequestMethod.GET)
    @ResponseBody
    public Response getGoodDetail(@RequestParam(value = "goodsDetailId") Long goodsDetailId) {
        try {
            return goodDetailService.getByGoodsDetailById(goodsDetailId);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.LIST_ERROR);
        }
    }

    /**
     * 创建商品详情信息
     *
     * @param goodsDetail
     * @return
     */
    @RequestMapping(value = "/createGoodsDetail", method = RequestMethod.POST)
    @ResponseBody
    public Response createGoodsDetail(GoodDetail goodsDetail, HttpServletRequest request) {
        try {
            return goodDetailService.createGoodsDetail(goodsDetail);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 更新商品详情信息
     *
     * @param goodsDetail
     * @return
     */
    @RequestMapping(value = "/updateGoodsDetail", method = RequestMethod.POST)
    @ResponseBody
    public Response updateGoodsDetail(GoodDetail goodsDetail, HttpServletRequest request) {
        try {
            return goodDetailService.updateGoodsDetail(goodsDetail);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 逻辑删除商品详情信息
     *
     * @param goodsDetailId
     * @return
     */
    @RequestMapping(value = "/deleteGoodsDetail", method = RequestMethod.POST)
    @ResponseBody
    public Response deleteGoodsDetail(String goodsDetailId, HttpServletRequest request) {
        try {
            return goodDetailService.deleteGoodsDetail(goodsDetailId);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }
}
