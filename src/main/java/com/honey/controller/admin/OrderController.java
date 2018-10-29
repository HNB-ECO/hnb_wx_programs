package com.honey.controller.admin;

import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.ExpressService;
import com.honey.service.WorkOrderService;
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
 * Created by Administrator on 2018/5/18.
 */

@Controller("adminOrderController")
@RequestMapping(value = "/admin/order")
public class OrderController {

    @Autowired
    private WorkOrderService workOrderService;

    @Autowired
    private ExpressService expressService;


    @RequestMapping(value = "/getExpressCompanySelect", method = RequestMethod.GET)
    @ResponseBody
    public Response getExpressCompanySelect() {
        return expressService.getExpressCompanySelect();
    }

    /**
     * 查询订单信息分页列表
     *
     * @param pageNum     页数
     * @param pageSize    每页记录数
     * @param orderBy     排序条件
     * @param orderStatus 订单状态
     * @return
     */
    @RequestMapping(value = "/pageAll", method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> pageAll(@RequestParam(value = "pageNum", defaultValue = Constants.DEFAULT_PAGE_NUM) Integer pageNum,
                                      @RequestParam(value = "pageSize", defaultValue = Constants.DEFAULT_PAGE_SIZE) Integer pageSize,
                                      @RequestParam(value = "orderBy", defaultValue = "id desc", required = false) String orderBy,
                                      @RequestParam(value = "orderStatus", required = false) Integer orderStatus,
                                      @RequestParam(value = "platformId", required = false) Long platformId,
                                      @RequestParam(value = "workOrderNo", required = false) String workOrderNo,
                                      HttpServletRequest request) {
        platformId = CommonUtil.getPlatformId(request, platformId);
        return workOrderService.getPlatformOrders(pageNum, pageSize, orderBy, platformId, orderStatus, workOrderNo);
    }

    /**
     * 通过工单ID查询工单及订单信息
     *
     * @param workOrderId
     * @return
     */
    @RequestMapping(value = "/getWorkOrderWithOrderInfo", method = RequestMethod.GET)
    @ResponseBody
    public Response getWorkOrderWithOrderInfo(@RequestParam(value = "workOrderId") Long workOrderId) {
        try {
            return workOrderService.getWorkOrderWithOrderInfo(workOrderId);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 修改未发货订单为已发货
     *
     * @param workOrderId 工单ID
     * @param express     快递公司名称
     * @param expressNo   快递单号
     * @return
     */
    @RequestMapping(value = "/shipOrderChangeStatus", method = RequestMethod.POST)
    @ResponseBody
    public Response shipOrderChangeStatus(@RequestParam(value = "workOrderId") Long workOrderId,
                                          @RequestParam(value = "express") String express,
                                          @RequestParam(value = "expressNo") String expressNo) {
        try {
            return workOrderService.shipOrderChangeStatus(workOrderId, express, expressNo);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 进入订单页面
     *
     * @return
     */
    @RequestMapping(value = "/getOrderByStatus", method = RequestMethod.GET)
    public String getOrderByStatus(HttpServletRequest request) {
        return "/orders/list";
    }


}
