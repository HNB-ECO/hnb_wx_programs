package com.honey.mapper;

import com.honey.entity.ChargeRecord;
import com.honey.entity.ChargeRecordExample;
import java.util.List;

public interface ChargeRecordMapper {
    int countByExample(ChargeRecordExample example);

    int deleteByPrimaryKey(Long id);

    int insert(ChargeRecord record);

    int insertSelective(ChargeRecord record);

    List<ChargeRecord> selectByExample(ChargeRecordExample example);

    ChargeRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ChargeRecord record);

    int updateByPrimaryKey(ChargeRecord record);

    long insertIdBack(ChargeRecord record);
}