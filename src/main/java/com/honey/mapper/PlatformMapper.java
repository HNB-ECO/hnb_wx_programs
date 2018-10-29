package com.honey.mapper;

import com.honey.entity.Platform;
import com.honey.entity.PlatformExample;

import java.util.List;
import java.util.Map;

public interface PlatformMapper {
    int countByExample(PlatformExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Platform record);

    int insertSelective(Platform record);

    List<Platform> selectByExample(PlatformExample example);

    Platform selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Platform record);

    int updateByPrimaryKey(Platform record);

    Platform getPlatformMain(Long id);

    List<Map<String,Object>> selectPlatformIdAndName();

}