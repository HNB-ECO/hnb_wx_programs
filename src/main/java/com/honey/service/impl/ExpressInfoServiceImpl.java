package com.honey.service.impl;

import com.honey.entity.ExpressInfo;
import com.honey.entity.ExpressInfoExample;
import com.honey.mapper.ExpressInfoMapper;
import com.honey.pojo.response.ExpressResult;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.ExpressInfoService;
import com.honey.util.Constants;
import com.honey.util.DataUtils;
import com.honey.util.ExpressUtil;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2018/6/3.
 */
@Service
public class ExpressInfoServiceImpl implements ExpressInfoService {

    @Autowired
    private ExpressInfoMapper expressInfoMapper;

    @Override
    public Response createExpressInfo(Long workOrderId,String expressNo, String expressCode) {
        ExpressResult expressInfoPo = ExpressUtil.getExpressResult(expressNo, expressCode);
        if (DataUtils.isNullOrEmpty(expressInfoPo))
            return new Response(2L,"暂无物流信息！",null);
        ExpressInfo expressInfo = new ExpressInfo();
        expressInfo.setWorkOrderId(workOrderId);
        expressInfo.setExpCode(expressCode);
        expressInfo.setExpNo(expressNo);
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getIssign()))
            expressInfo.setIsSign(expressInfoPo.getIssign());
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getExpName()))
            expressInfo.setExpName(expressInfoPo.getExpName());
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getExpSite()))
            expressInfo.setExpSite(expressInfoPo.getExpSite());
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getExpPhone()))
            expressInfo.setExpPhone(expressInfoPo.getExpPhone());
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getDeliverystatus()))
            expressInfo.setDeliveryStatus(expressInfoPo.getDeliverystatus());
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getList()))
            expressInfo.setExpInfo(JSONArray.fromObject(expressInfoPo.getList()).toString());
        expressInfo.setCreateTime(new Date());
        expressInfo.setUpdateTime(new Date());
        expressInfo.setIsDelete(Constants.OBJECT_NOT_DELETE);
        Long expressInfoId = expressInfoMapper.insertIdBack(expressInfo);
        expressInfo = expressInfoMapper.selectByPrimaryKey(expressInfoId);
        return new Response(Code.SUCCESS,expressInfo);
    }

    @Override
    public Response updateExpressInfo(ExpressInfo expressInfo, String expressNo, String expressCode) {
        ExpressResult expressInfoPo = ExpressUtil.getExpressResult(expressNo, expressCode);
        if (DataUtils.isNullOrEmpty(expressInfoPo))
            return new Response(2L,"暂无物流信息！",null);
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getIssign()))
            expressInfo.setIsSign(expressInfoPo.getIssign());
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getExpName()))
            expressInfo.setExpName(expressInfoPo.getExpName());
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getExpSite()))
            expressInfo.setExpSite(expressInfoPo.getExpSite());
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getExpPhone()))
            expressInfo.setExpPhone(expressInfoPo.getExpPhone());
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getDeliverystatus()))
            expressInfo.setDeliveryStatus(expressInfoPo.getDeliverystatus());
        if(!DataUtils.isNullOrEmpty(expressInfoPo.getList()))
            expressInfo.setExpInfo(JSONArray.fromObject(expressInfoPo.getList()).toString());
        expressInfo.setUpdateTime(new Date());
        expressInfoMapper.updateByPrimaryKeySelective(expressInfo);
        return new Response(Code.SUCCESS,expressInfo);
    }

    public List<ExpressInfo> findShipExpress(Long workOrderId, String expressNo, String expressCode) {
        ExpressInfoExample example = new ExpressInfoExample();
        ExpressInfoExample.Criteria criteria = example.createCriteria();
        criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);
        criteria.andWorkOrderIdEqualTo(workOrderId);
        criteria.andExpNoEqualTo(expressNo);
        criteria.andExpCodeEqualTo(expressCode);
        return expressInfoMapper.selectByExample(example);
    }
}
