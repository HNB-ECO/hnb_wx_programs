package com.honey.mapper;

import com.honey.entity.GoodsComment;
import com.honey.entity.GoodsCommentExample;
import java.util.List;

public interface GoodsCommentMapper {
    int countByExample(GoodsCommentExample example);

    int deleteByPrimaryKey(Long id);

    int insert(GoodsComment record);

    int insertSelective(GoodsComment record);

    List<GoodsComment> selectByExample(GoodsCommentExample example);

    GoodsComment selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(GoodsComment record);

    int updateByPrimaryKey(GoodsComment record);
}