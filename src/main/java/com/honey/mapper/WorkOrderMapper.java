package com.honey.mapper;

import com.honey.entity.WorkOrder;
import com.honey.entity.WorkOrderExample;
import java.util.List;

public interface WorkOrderMapper {
    int countByExample(WorkOrderExample example);

    int deleteByPrimaryKey(Long id);

    int insert(WorkOrder record);

    int insertSelective(WorkOrder record);

    List<WorkOrder> selectByExample(WorkOrderExample example);

    WorkOrder selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(WorkOrder record);

    int updateByPrimaryKey(WorkOrder record);

    List<WorkOrder> selectByOrderId(Long orderId);
}