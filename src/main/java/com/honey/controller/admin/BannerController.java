package com.honey.controller.admin;

import com.honey.entity.Banner;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.BannerService;
import com.honey.util.CommonUtil;
import com.honey.util.Constants;
import com.honey.util.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2018/5/18.
 */
@Controller("adminBannerController")
@RequestMapping(value = "/admin/banner")
public class BannerController {

    @Autowired
    private BannerService bannerService;

    /**
     * 进入活动页面
     * @return
     */
    @RequestMapping(value = "/intoBannerManage", method = RequestMethod.GET)
    public String intoGoodManage(HttpServletRequest request){
        return "/banner/list";
    }

    /**
     * 查询活动信息分页列表
     * @param pageNum 页数
     * @param pageSize 每页记录数
     * @param orderBy 排序条件
     * @param isDelete 是否下架
     * @return
     */
    @RequestMapping(value = "/pageAll", method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> pageAll(@RequestParam(value = "pageNum", defaultValue = Constants.DEFAULT_PAGE_NUM) Integer pageNum,
                                      @RequestParam(value = "pageSize", defaultValue = Constants.DEFAULT_PAGE_SIZE) Integer pageSize,
                                      @RequestParam(value = "orderBy", defaultValue = "id asc", required = false) String orderBy,
                                      @RequestParam(value = "isDelete", required = false) Integer isDelete,
                                      @RequestParam(value = "platformId", required = false) Long platformId,
                                      HttpServletRequest request){
        platformId = CommonUtil.getPlatformId(request,platformId);
        return bannerService.getPlatformBanners(pageNum, pageSize, orderBy, platformId, isDelete);
    }

    /**
     * 通过活动ID查询活动信息
     * @param bannerId
     * @return
     */
    @RequestMapping(value = "/getBannerInfo", method = RequestMethod.GET)
    @ResponseBody
    public Response getGoodsInfo(@RequestParam(value = "bannerId") Long bannerId){
        try {
            return bannerService.getBannerInfoByBannerId(bannerId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 增加活动
     * @param banner 活动
     * @param request
     * @return
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Response add(Banner banner,HttpServletRequest request){
        Long platformId = CommonUtil.getPlatformId(request,banner.getPlatformId());
        return bannerService.add(banner,platformId);
    }

    /**
     * 修改活动
     * @param banner 活动
     * @param request
     * @return
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public Response update(Banner banner,HttpServletRequest request){
        return bannerService.update(banner);
    }

    /**
     * 删除活动
     * @param bannerId 活动ID
     * @return
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Response delete(@RequestParam(value = "bannerId") String bannerId){
        return bannerService.delete(bannerId);
    }
}
