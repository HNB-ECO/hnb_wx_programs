package com.honey.mapper;

import com.honey.entity.WxChargeRecord;
import com.honey.entity.WxChargeRecordExample;
import java.util.List;

public interface WxChargeRecordMapper {
    int countByExample(WxChargeRecordExample example);

    int deleteByPrimaryKey(Long id);

    int insert(WxChargeRecord record);

    int insertSelective(WxChargeRecord record);

    List<WxChargeRecord> selectByExample(WxChargeRecordExample example);

    WxChargeRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(WxChargeRecord record);

    int updateByPrimaryKey(WxChargeRecord record);
}