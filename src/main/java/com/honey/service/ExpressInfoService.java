package com.honey.service;

import com.honey.entity.ExpressInfo;
import com.honey.response.Response;

import java.util.List;

/**
 * Created by Administrator on 2018/6/3.
 */
public interface ExpressInfoService {

    Response createExpressInfo(Long workOrderId,String expressNo,String expressCode);

    Response updateExpressInfo(ExpressInfo expressInfo,String expressNo,String expressCode);

    List<ExpressInfo> findShipExpress(Long workOrderId,String expressNo,String expressCode);
}
