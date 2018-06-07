package com.honey.mapper;

import com.honey.entity.WithdrawChargeRecord;
import com.honey.entity.WithdrawChargeRecordExample;
import java.util.List;

public interface WithdrawChargeRecordMapper {
    int countByExample(WithdrawChargeRecordExample example);

    int deleteByPrimaryKey(Long id);

    int insert(WithdrawChargeRecord record);

    int insertSelective(WithdrawChargeRecord record);

    List<WithdrawChargeRecord> selectByExample(WithdrawChargeRecordExample example);

    WithdrawChargeRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(WithdrawChargeRecord record);

    int updateByPrimaryKey(WithdrawChargeRecord record);
}