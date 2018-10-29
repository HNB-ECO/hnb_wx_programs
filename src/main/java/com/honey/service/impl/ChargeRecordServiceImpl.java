package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.ChargeRecord;
import com.honey.entity.ChargeRecordExample;
import com.honey.entity.ChargeRecordExample.Criteria;
import com.honey.mapper.ChargeRecordMapper;
import com.honey.response.Response;
import com.honey.service.ChargeRecordService;
import com.honey.util.Constants;
import com.honey.util.DataUtils;
import com.honey.util.PageBean;
import com.honey.util.PageBeanExtra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by ZYL on 2018/4/28.
 */
@Service
public class ChargeRecordServiceImpl implements ChargeRecordService {

    @Autowired
    private ChargeRecordMapper chargeRecordMapper;

    /**
     * 用户查询HNB充值消费记录
     * @param userId
     * @param platformId
     * @return
     */
    public Response<PageBean> recordPageList(Integer pageNum,Integer pageSize,Long userId, Long platformId) {
        PageHelper.startPage(pageNum,pageSize);
        List<ChargeRecord> list;
        Integer all;

        ChargeRecordExample example = new ChargeRecordExample();
        Criteria criteria = example.createCriteria();
        criteria.andUserIdEqualTo(userId);
        criteria.andPlatformIdEqualTo(platformId);
        criteria.andOrderNameLike(Constants.USER_RECHARGE_PREFIX+"%");//之查找充值的流水记录
        //查询列表信息
        list = chargeRecordMapper.selectByExample(example);
        //查询总数量
        all = chargeRecordMapper.countByExample(example);
        return new Response(new PageBeanExtra(list,all.longValue()));
    }

    /**
     * 后台管理查询HNB充值消费记录
     * @param pageNum
     * @param pageSize
     * @param orderBy
     * @param platformId
     * @param orderName
     * @param orderType
     * @return
     */
    @Override
    public Response<PageBean> getChargeRecordList(Integer pageNum, Integer pageSize, String orderBy, Long platformId, String orderName, Integer orderType) {
        PageHelper.startPage(pageNum,pageSize);
        List<ChargeRecord> list;
        Integer all;

        ChargeRecordExample example = new ChargeRecordExample();
        Criteria criteria = example.createCriteria();
        if (!DataUtils.isNullOrEmpty(platformId)) {
            criteria.andPlatformIdEqualTo(platformId);
        }
        if (!DataUtils.isNullOrEmpty(orderType)) {
            criteria.andOrderTypeEqualTo(orderType);
        }
        if (!DataUtils.isNullOrEmpty(orderName)) {
            criteria.andOrderNameLike("%" + orderName + "%");
        }
        if (!DataUtils.isNullOrEmpty(orderBy)) {
            example.setOrderByClause(orderBy);
        }
        //查询列表信息
        list = chargeRecordMapper.selectByExample(example);
        //查询总数量
        all = chargeRecordMapper.countByExample(example);
        return new Response(new PageBeanExtra(list,all.longValue()));
    }
}
