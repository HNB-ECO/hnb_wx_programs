package com.honey.mapper;

import com.honey.entity.Banner;
import com.honey.entity.BannerExample;
import java.util.List;

public interface BannerMapper {
    int countByExample(BannerExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Banner record);

    int insertSelective(Banner record);

    List<Banner> selectByExample(BannerExample example);

    Banner selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Banner record);

    int updateByPrimaryKey(Banner record);

    List<Banner> selectByPlatformId(Long platformId);
}