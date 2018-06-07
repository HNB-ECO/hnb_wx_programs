package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.Order;
import com.honey.entity.WorkOrder;
import com.honey.entity.WorkOrderExample;
import com.honey.mapper.OrderMapper;
import com.honey.mapper.WorkOrderMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.WorkOrderService;
import com.honey.util.Constant;
import com.honey.util.Constants;
import com.honey.util.DataUtils;
import com.honey.util.PageBean;
import com.honey.util.PageBeanExtra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.zip.CRC32;

/**
 * Created by Administrator on 2018/5/25.
 */
@Service
public class WorkOrderServiceImpl implements WorkOrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private WorkOrderMapper workOrderMapper;

    /**
     * 查询对应平台的工单及对应的订单
     * @param pageNum 页数
     * @param pageSize 每页记录数
     * @param platformId 平台ID
     * @param orderStatus 订单状态
     * @return
     */
    public Response<PageBean> getPlatformOrders(Integer pageNum, Integer pageSize,String orderBy, Long platformId, Integer orderStatus,String workOrderNo) {
        PageHelper.startPage(pageNum, pageSize);
        List<WorkOrder> list = null;
        Integer all = 0;
        WorkOrderExample workOrderExample = new WorkOrderExample();
        WorkOrderExample.Criteria workOrderCriteria = workOrderExample.createCriteria();
        if (!DataUtils.isNullOrEmpty(platformId))
            workOrderCriteria.andPlatformIdEqualTo(platformId);
        if (!DataUtils.isNullOrEmpty(orderStatus))
            workOrderCriteria.andStatusEqualTo(orderStatus);
        if (!DataUtils.isNullOrEmpty(workOrderNo))
            workOrderCriteria.andWorkOrderNoLike(workOrderNo+"%");
        if (!DataUtils.isNullOrEmpty(orderBy))
            workOrderExample.setOrderByClause(orderBy);
        list = workOrderMapper.selectByExample(workOrderExample);
        all = workOrderMapper.countByExample(workOrderExample);
        for(WorkOrder w:list){
            Long orderId = w.getOrderId();
            Order order = orderMapper.selectByPrimaryKey(orderId);
            w.setOrder(order);
        }
        return new Response(new PageBeanExtra(list, all.longValue()));
    }

    public Response getWorkOrderWithOrderInfo(Long workOrderId) {
        WorkOrder workOrder = workOrderMapper.selectByPrimaryKey(workOrderId);
        //判断对象是否不存在或者已经被删除
        if(DataUtils.isNullOrEmpty(workOrder)||workOrder.getIsDelete()== Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        Long orderId = workOrder.getOrderId();
        Order order = orderMapper.selectByPrimaryKey(orderId);
        if(DataUtils.isNullOrEmpty(order)||order.getIsDelete()== Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        workOrder.setOrder(order);
        return new Response(workOrder);
    }

    public Response shipOrderChangeStatus(Long workOrderId,String express,String expressNo) {
        WorkOrder workOrder = workOrderMapper.selectByPrimaryKey(workOrderId);
        //判断对象是否不存在或者已经被删除
        if(DataUtils.isNullOrEmpty(workOrder)||workOrder.getIsDelete()== Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        Integer workOrderStatus = workOrder.getStatus();
        if(!Constants.WORKORDER_STATUS_SHIP.equals(workOrderStatus))
            return new Response(2l,"工单目前状态不是待发货，无法更改！",null);
        /**暂时使order的状态同步workOrder的状态，以后对应多个工单时则不需要更新订单状态**/
        Long orderId = workOrder.getOrderId();
        Order order = orderMapper.selectByPrimaryKey(orderId);
        if(DataUtils.isNullOrEmpty(order)||order.getIsDelete()== Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        Integer orderStatus = order.getOrderStatus();
        if(!Constants.ORDER_STATUS_SHIP.equals(orderStatus))
            return new Response(3l,"订单目前状态不是待发货，无法更改！",null);
        order.setOrderStatus(Constants.ORDER_STATUS_RECEIPT);
        order.setExpress(express);
        order.setExpressNo(expressNo);
        order.setUpdateTime(new Date());
        orderMapper.updateByPrimaryKeySelective(order);
        /***************************************************************************/
        workOrder.setStatus(Constants.WORKORDER_STATUS_RECEIPT);
        workOrder.setExpress(express);
        workOrder.setExpressNo(expressNo);
        workOrder.setShipTime(new Date());
        workOrder.setUpdateTime(new Date());
        workOrderMapper.updateByPrimaryKeySelective(workOrder);
        return new Response(Code.SUCCESS);
    }


    /**
     * 查询工单列表
     * @param lessDate 当前时间一周之前的时间
     * @return
     */
    public List<WorkOrder> checkReceiptWorkOrder(Date lessDate) {
        WorkOrderExample example = new WorkOrderExample();
        WorkOrderExample.Criteria criteria = example.createCriteria();
        criteria.andStatusEqualTo(Constants.ORDER_STATUS_RECEIPT);
        criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);
        criteria.andShipTimeLessThan(lessDate);
        return workOrderMapper.selectByExample(example);
    }

    public void update(WorkOrder workOrder) {

    }
}
