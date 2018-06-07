package com.honey.mapper;

import com.honey.entity.Order;
import com.honey.entity.OrderExample;
import java.util.List;

public interface OrderMapper {
    int countByExample(OrderExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Order record);

    int insertSelective(Order record);

    List<Order> selectByExample(OrderExample example);

    Order selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);

    long insertIdBack(Order order);
}