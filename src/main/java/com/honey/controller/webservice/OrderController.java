package com.honey.controller.webservice;

import com.honey.pojo.request.CreateOrderRequest;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.OrderService;
import com.honey.util.PayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by ZYL on 2018/4/27.
 */
@RestController
@RequestMapping("/webservice/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * 通过状态查询订单信息
     * @param pageNum
     * @param pageSize
     * @param userId
     * @param orderStatus
     * @return
     */
    @RequestMapping(value = "/getOrderByStatus", method = RequestMethod.GET)
    @ResponseBody
    public Response getOrderByStatus(@RequestParam(value ="pageNum") Integer pageNum,
                                     @RequestParam(value ="pageSize") Integer pageSize,
                                     @RequestParam(value ="userId") Long userId,
                                     @RequestParam(value ="orderStatus",required = false) Integer orderStatus,
                                     @RequestParam(value ="orderBy", defaultValue = "id desc", required = false) String orderBy){
        try {
            return orderService.getUserOrders(pageNum,pageSize,userId,orderStatus,orderBy);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.PAGE_ERROR);
        }
    }

    /**
     * 创建订单信息
     * @param createOrderRequest
     * @return
     */
    @RequestMapping(value = "/createOrder", method = RequestMethod.POST)
    @ResponseBody
    public Response createOrder(CreateOrderRequest createOrderRequest){
        try {
            return orderService.createOrder(createOrderRequest);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 支付订单
     * @param orderId
     * @param paymentType
     * @return
     */
    @RequestMapping(value = "/orderPay", method = RequestMethod.POST)
    @ResponseBody
    public Response orderPay(@RequestParam(value ="orderId") Long orderId,
                             @RequestParam(value = "payment_type") String paymentType,
                             @RequestParam(value = "openId" , required = false) String openId, HttpServletRequest request) {
        try {
            String clientIP = PayUtil.getClientIp(request);
            return orderService.orderPay(orderId, paymentType, clientIP, openId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 取消订单
     * @param orderId
     * @return
     */
    @RequestMapping(value = "/cancelOrder", method = RequestMethod.POST)
    @ResponseBody
    public Response cancelOrder(@RequestParam(value ="orderId") Long orderId,HttpServletRequest request) {
        try {
            return orderService.cancelOrder(orderId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 查看物流
     * @param workOrderId
     * @return
     */
    @RequestMapping(value = "/checkExpress", method = RequestMethod.POST)
    @ResponseBody
    public Response checkExpress(@RequestParam(value ="workOrderId") Long workOrderId,HttpServletRequest request) {
        try {
            return orderService.checkExpress(workOrderId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }

    /**
     * 确认收货
     * @param workOrderId
     * @return
     */
    @RequestMapping(value = "/confirmReceive", method = RequestMethod.POST)
    @ResponseBody
    public Response confirmReceive(@RequestParam(value ="workOrderId") Long workOrderId,HttpServletRequest request) {
        try {
            return orderService.confirmReceive(workOrderId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.ADD_OR_UPDATE_OBJECT_FAILED);
        }
    }
}
