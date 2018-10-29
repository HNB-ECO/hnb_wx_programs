package com.honey.service;

import com.honey.entity.WorkOrder;
import com.honey.response.Response;
import com.honey.util.PageBean;

import java.util.Date;
import java.util.List;

/**
 * Created by ZYL on 2018/5/25.
 */
public interface WorkOrderService {

    Response<PageBean> getPlatformOrders(Integer pageNum,Integer pageSize,String orderBy,Long platformId,Integer orderStatus,String workOrderNo);

    Response getWorkOrderWithOrderInfo(Long workOrderId);

    Response shipOrderChangeStatus(Long workOrderId,String express,String expressNo);

    List<WorkOrder> checkReceiptWorkOrder(Date lessDate);

    void update(WorkOrder workOrder);

}
