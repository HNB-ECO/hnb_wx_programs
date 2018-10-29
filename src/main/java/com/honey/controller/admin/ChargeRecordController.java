package com.honey.controller.admin;

import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.ChargeRecordService;
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
 * Created by Administrator on 2018/6/6.
 */
@Controller("adminChargeRecordController")
@RequestMapping(value = "/admin/chargeRecord")
public class ChargeRecordController {

    @Autowired
    private ChargeRecordService chargeRecordService;


    /**
     * 进入充值流水管理页面
     * @return
     */
    @RequestMapping(value = "/intChargeRecordManage", method = RequestMethod.GET)
    public String intoChargeRecordManage(HttpServletRequest request){
        return "/chargeRecord/list";
    }

    /**
     * 查询充值流水消费列表
     * @param pageNum 页数
     * @param pageSize 每页记录数
     * @param orderBy 排序条件
     * @param orderName 订单号
     * @param orderType 订单类型（1.收入，2.支出）
     * @param request
     * @return
     */
    @RequestMapping(value = "/getChargeRecordList", method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> getChargeRecordList(@RequestParam(value = "pageNum", defaultValue = Constants.DEFAULT_PAGE_NUM) Integer pageNum,
                                           @RequestParam(value = "pageSize", defaultValue = Constants.DEFAULT_PAGE_SIZE) Integer pageSize,
                                           @RequestParam(value = "orderBy", defaultValue = "id desc", required = false) String orderBy,
                                           @RequestParam(value = "orderName", required = false) String orderName,
                                           @RequestParam(value = "orderType", required = false) Integer orderType,
                                           @RequestParam(value = "platformId", required = false) Long platformId,
                                           HttpServletRequest request) {
        try {
            platformId = CommonUtil.getPlatformId(request, platformId);
            return chargeRecordService.getChargeRecordList(pageNum, pageSize, orderBy, platformId, orderName, orderType);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }
}
