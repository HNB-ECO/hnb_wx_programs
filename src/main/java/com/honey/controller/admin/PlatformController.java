package com.honey.controller.admin;

import com.honey.entity.Platform;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.PlatformService;
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
 * Created by ZYL on 2018/5/17.
 */

@Controller("adminPlatformController")
@RequestMapping(value = "/admin/platform")
public class PlatformController {


    @Autowired
    private PlatformService platformService;

    /**
     * 进入平台管理页面
     * @return
     */
    @RequestMapping(value = "/intoPlatformManage", method = RequestMethod.GET)
    public String intoPlatformManage(HttpServletRequest request){
        return "/platform/list";
    }

    /**
     * 获得商品类型下拉表
     * @return
     */
    @RequestMapping(value = "/getPlatformSelect", method = RequestMethod.GET)
    @ResponseBody
    public Response getPlatformSelect(HttpServletRequest request){
        return platformService.getPlatformIdAndName();
    }


    /**
     * 查询平台信息分页列表
     * @param pageNum
     * @param pageSize
     * @param platformName
     * @param platformOwner
     * @param orderBy
     * @return
     */
    @RequestMapping(value = "/pageAll", method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> pageAll(@RequestParam(value = "pageNum",defaultValue = Constants.DEFAULT_PAGE_NUM) Integer pageNum,
                                      @RequestParam(value = "pageSize",defaultValue = Constants.DEFAULT_PAGE_SIZE) Integer pageSize,
                                      @RequestParam(value = "orderBy",defaultValue = "id asc",required = false) String orderBy,
                                      @RequestParam(value = "platformName",required = false) String platformName,
                                      @RequestParam(value = "platformOwner",required = false) String platformOwner){
        return platformService.pageAll(pageNum, pageSize,orderBy,platformName,platformOwner);
    }

    /**
     * 获得平台信息列表
     * @param platformName
     * @param platformOwner
     * @return
     */
    @RequestMapping(value = "/getPlatformList", method = RequestMethod.GET)
    @ResponseBody
    public Response getPlatformList(@RequestParam(value = "platformName",required = false) String platformName,
                                      @RequestParam(value = "platformOwner",required = false) String platformOwner){
        return platformService.selectAll("id",null,platformName,platformOwner);
    }


    /**
     * 超管及系统管理员新建平台
     * @param platform
     * @return
     */
    @RequestMapping(value = "/createPlatform", method = RequestMethod.POST)
    @ResponseBody
    public Response createPlatform(Platform platform,HttpServletRequest request){
        Integer type = (Integer) request.getSession().getAttribute("type");
        if(1!=type)
            return new Response(Code.HAVE_NO_PRIVILEGE);
        else
            return platformService.add(platform);
    }

    /**
     * 超管及系统管理员更新平台
     * @param platform
     * @return
     */
    @RequestMapping(value = "/updatePlatform", method = RequestMethod.POST)
    @ResponseBody
    public Response updatePlatform(Platform platform,HttpServletRequest request){
        Integer type = (Integer) request.getSession().getAttribute("type");
        if(1!=type)
            return new Response(Code.HAVE_NO_PRIVILEGE);
        else
            return platformService.update(platform);
    }

    /**
     * 超管及系统管理员逻辑删除平台
     * @param platformIds
     * @return
     */
    @RequestMapping(value = "/deletePlatform", method = RequestMethod.POST)
    @ResponseBody
    public Response deletePlatform(@RequestParam(value = "platformId") String platformIds,
                                   HttpServletRequest request){
        Integer type = (Integer) request.getSession().getAttribute("type");
        if(1!=type)
            return new Response(Code.HAVE_NO_PRIVILEGE);
        else
            return platformService.delete(platformIds);
    }


}
