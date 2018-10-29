package com.honey.service;

import com.honey.entity.Order;
import com.honey.entity.WxChargeRecord;
import com.honey.response.Response;

import java.math.BigDecimal;
import java.util.Map;

/**
 * 微信支付调用
 * Created by Administrator on 2018/5/8.
 */
public interface WxPayService {

    public Map<String, Object> executeWxPrepay(String openId, BigDecimal price, String clientIP, String payTypeString, Long orderIdOrUserId);

    public Response updateOrderAfterZhifu(String orderIdString ,WxChargeRecord wxChargeRecord);

    public Response updateOrderAfterChongzhi(String userIdString, Long price ,WxChargeRecord wxChargeRecord);

    public Map<String, Object> executeWxRefund(Order order) throws Exception;
}
