package com.honey.service;

import com.honey.pojo.request.CreateOrderRequest;
import com.honey.response.Response;
import com.honey.util.PageBean;

import java.util.Date;

/**
 * 订单业务逻辑
 * Created by ZYL on 2018/4/27.
 */
public interface OrderService {

    Response<PageBean> getUserOrders(Integer pageNum,Integer pageSize,Long userId,Integer orderStatus,String orderBy);

    Response createOrder(CreateOrderRequest createOrderRequest);

    Response orderPay(Long orderId, String paymentType, String clientIP, String openId);

    Response cancelOrder(Long orderId) throws Exception;

    Response checkExpress(Long workOrderId);

    Response confirmReceive(Long workOrderId);

    //通过平台ID和创建日期查询当日订单量
    int countByDate(String platformId , Date startDate , Date endDate);


}
