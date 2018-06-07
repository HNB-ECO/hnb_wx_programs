package com.honey.controller.webservice;

import com.honey.entity.Goods;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.GoodDetailService;
import com.honey.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * HNB小程序平台商品接口
 * Created by ZYL on 2018/4/25.
 */
@RestController
@RequestMapping(value = "/webservice/good")
public class GoodController {

    @Autowired
    private GoodsService goodsService;

    @Autowired
    private GoodDetailService goodDetailService;

    /**
     * 通过商品ID查询商品信息
     * @param goodId
     * @return
     */
    @RequestMapping(value = "/getGoodInfo", method = RequestMethod.GET)
    @ResponseBody
    public Response getGoodInfo(@RequestParam(value = "goodId") Long goodId){
        try {
            return goodsService.queryOne(goodId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 通过商品ID查询商品规格及明细
     * @param goodId
     * @return
     */
    @RequestMapping(value = "/getGoodDetail", method = RequestMethod.GET)
    @ResponseBody
    public Response getGoodDetail(@RequestParam(value = "goodId") Long goodId){
        try {
            return goodDetailService.getByGoodsId(goodId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.LIST_ERROR);
        }
    }

}
