package com.honey.controller.webservice;

import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.PlatformService;
import com.honey.util.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 平台信息移动端接口
 * Created by ZYL on 2018/4/21.
 * */



@RestController
@RequestMapping("/webservice/platform")
public class PlatformController {

    @Autowired
    private PlatformService platformService;



    /**
     * 查询平台信息列表
     * @param orderFields
     * @param orderDirection
     * @param platformName
     * @param platformOwner
     * @return
     */
    @RequestMapping(value = "/listAll", method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> listAll(@RequestParam(value = "orderFields") String orderFields,
                                      @RequestParam(value = "orderDirection",defaultValue = "asc") String orderDirection,
                                      @RequestParam(value = "platformName") String platformName,
                                      @RequestParam(value = "platformOwner") String platformOwner){
        return platformService.selectAll(orderFields,orderDirection,platformName,platformOwner);
    }

    /**
     * 查询首页信息
     * @param platformId
     * @return
     */
    @RequestMapping(value="/getMainInfo",method = RequestMethod.GET)
    @ResponseBody
    public Response getMainInfo(@RequestParam(value = "platformId") Long platformId){
        try {
            return platformService.getPlatformMain(platformId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }
}
