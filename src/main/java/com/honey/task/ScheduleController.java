package com.honey.task;

import com.honey.entity.ExpressInfo;
import com.honey.entity.WorkOrder;
import com.honey.service.ExpressInfoService;
import com.honey.service.WorkOrderService;
import com.honey.util.Constant;
import com.honey.util.Constants;
import com.honey.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

/**
 * Created by ZYL on 2018/6/3.
 */
@Component
public class ScheduleController {

    @Autowired
    private WorkOrderService workOrderService;

    @Autowired
    private ExpressInfoService expressInfoService;

    /**
     * 每天凌晨自动执行物流已完成但用户没有点击完成并超过一周的订单
     */
    @Scheduled(cron = "0 59 23 * * ?")
    public void expressTask(){
        System.out.print("每日快递检查任务被执行。。。");
        Date lessDate = DateUtil.addDay(new Date(),-7);//获取当前时间7天前的时间

        List<WorkOrder> list = workOrderService.checkReceiptWorkOrder(lessDate);//查询出所有符合条件的工单
        //迭代订单信息
        for (WorkOrder workOrder : list){
            List<ExpressInfo> expressInfoList = expressInfoService.findShipExpress(workOrder.getId(),workOrder.getExpressNo(),workOrder.getExpress());
            if(expressInfoList.size()>0){
                ExpressInfo info = expressInfoList.get(0);//获取物流信息
                if(Constants.DELIVERY_STATUS_FINISH.equals(info.getDeliveryStatus())){//判断状态是否为完成
                    //当状态为已完成时，将工单状态更新为已签收待评价
                    workOrder.setStatus(Constants.WORKORDER_STATUS_COMMENT);
                    workOrderService.update(workOrder);
                    System.out.println("工单号："+workOrder.getWorkOrderNo()+"状态被更新为已收货");
                }
            }
        }
    }
}
