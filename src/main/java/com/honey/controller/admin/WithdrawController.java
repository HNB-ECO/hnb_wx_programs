package com.honey.controller.admin;

import com.honey.entity.Admin;
import com.honey.entity.Platform;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.WithdrawService;
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
 * Created by Administrator on 2018/6/1.
 */
@Controller("adminWithdrawController")
@RequestMapping("/admin/withdraw")
public class WithdrawController {

    @Autowired
    private WithdrawService withdrawService;

    /**
     * 进入提现管理页面
     * @return
     */
    @RequestMapping(value = "/intoWithdrawManage", method = RequestMethod.GET)
    public String intoUserManage(HttpServletRequest request){
        return "/recharge/list";
    }

    /**
     * 查询提现记录列表
     * @param pageNum 页数
     * @param pageSize 每页记录数
     * @param orderBy 排序条件
     * @param platformId 平台ID
     * @param request
     * @return
     */
    @RequestMapping(value = "/getWithdrawChargeList", method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> getGoodsList(@RequestParam(value = "pageNum", defaultValue = Constants.DEFAULT_PAGE_NUM) Integer pageNum,
                                           @RequestParam(value = "pageSize", defaultValue = Constants.DEFAULT_PAGE_SIZE) Integer pageSize,
                                           @RequestParam(value = "orderBy", defaultValue = "id asc", required = false) String orderBy,
                                           @RequestParam(value = "platformId", required = false) Long platformId,
                                           HttpServletRequest request) {
        try {
            platformId = CommonUtil.getPlatformId(request, platformId);
            return withdrawService.getWithdrawChargeList(pageNum, pageSize, orderBy, platformId);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 确定提现成功或失败
     *
     * @param withdrawChargeId ID
     * @param withdrawResult 提现结果
     * @return
     */
    @RequestMapping(value = "/completeWithdraw", method = RequestMethod.POST)
    @ResponseBody
    public Response completeWithdraw(@RequestParam(value = "withdrawChargeId") Long withdrawChargeId,
                                     @RequestParam(value = "withdrawResult") Integer withdrawResult,
                                     HttpServletRequest request) {
        try {
            String operateName = null;
            Integer type = (Integer)request.getSession().getAttribute("type");
            if(1==type) {
                Admin admin = (Admin) request.getSession().getAttribute(Constants.ADMINI_LOGIN_INFO);
                operateName = admin.getUsername();
            }else if(2==type){
                Platform platform = (Platform) request.getSession().getAttribute(Constants.PLATFORM_LOGIN_INFO);
                operateName = platform.getPlatformOwner();
            }
            return withdrawService.completeWithdraw(withdrawChargeId, withdrawResult, operateName);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

}
