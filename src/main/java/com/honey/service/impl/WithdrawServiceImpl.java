package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.User;
import com.honey.entity.WithdrawChargeRecord;
import com.honey.entity.WithdrawChargeRecordExample;
import com.honey.mapper.UserMapper;
import com.honey.mapper.WithdrawChargeRecordMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.WithdrawService;
import com.honey.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2018/6/1.
 */
@Service
public class WithdrawServiceImpl implements WithdrawService{


    @Autowired
    private WithdrawChargeRecordMapper withdrawChargeMapper;

    @Autowired
    private UserMapper userMapper;

    @Override
    public Response<PageBean> getWithdrawChargeList(Integer pageNum, Integer pageSize, String orderBy, Long platformId) {
        PageHelper.startPage(pageNum, pageSize);
        List<WithdrawChargeRecord> list = null;
        Integer all = 0;
        WithdrawChargeRecordExample example = new WithdrawChargeRecordExample();
        WithdrawChargeRecordExample.Criteria criteria = example.createCriteria();
        if (!DataUtils.isNullOrEmpty(platformId)) {
            criteria.andPlatformIdEqualTo(platformId);
        }
        criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);
        if (!DataUtils.isNullOrEmpty(orderBy)) {
            example.setOrderByClause(orderBy);
        }
        list = withdrawChargeMapper.selectByExample(example);
        all = withdrawChargeMapper.countByExample(example);

        return new Response(new PageBeanExtra(list, all.longValue()));
    }

    @Override
    public Response completeWithdraw(Long withdrawChargeId, Integer withdrawResult, String operateName) {
        WithdrawChargeRecord withdrawCharge = withdrawChargeMapper.selectByPrimaryKey(withdrawChargeId);
        if(DataUtils.isNullOrEmpty(withdrawCharge)||withdrawCharge.getIsDelete() == Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        withdrawCharge.setIsComplete(Constants.COMPLETE_STATUS_YES);
        withdrawCharge.setWithdrawResult(withdrawResult);
        withdrawCharge.setUpdateTime(new Date());
        withdrawCharge.setWithdrawTime(new Date());
        withdrawCharge.setOperateName(operateName);
        withdrawChargeMapper.updateByPrimaryKeySelective(withdrawCharge);
        //如果提币成功，则用户减去相应画呗
        if(Constants.WITHDRAW_RESULT_SUCCESS.equals(withdrawResult)){
            User user = userMapper.selectByPrimaryKey(withdrawCharge.getUserId());
            //是否要加限制条件？
            user.setCoinBalance(user.getCoinBalance().subtract(withdrawCharge.getWithdrawAmount()));
            user.setUpdateTime(new Date());
            userMapper.updateByPrimaryKeySelective(user);
        }
        return new Response(Code.SUCCESS);
    }

    @Override
    public List<WithdrawChargeRecord> getUnCompleteWithdrawListByUserId(Long userId) {
        WithdrawChargeRecordExample example = new WithdrawChargeRecordExample();
        WithdrawChargeRecordExample.Criteria criteria = example.createCriteria();
        if (!DataUtils.isNullOrEmpty(userId)) {
            criteria.andUserIdEqualTo(userId);
        }
        criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);
        criteria.andIsCompleteEqualTo(Constants.COMPLETE_STATUS_NO);
        List<WithdrawChargeRecord> list = withdrawChargeMapper.selectByExample(example);
        return list;
    }

    @Override
    public Response applyWithdraw(Long userId, BigDecimal applyAmount) {
        if (DataUtils.isNullOrEmpty(userId) ||
                DataUtils.isNullOrEmpty(applyAmount)) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }
        User user = userMapper.selectByPrimaryKey(userId);
        if(DataUtils.isNullOrEmpty(user)||user.getIsDelete() == Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        //获得冻结的画呗数量
        List<WithdrawChargeRecord> withdrawList = getUnCompleteWithdrawListByUserId(userId);
        BigDecimal blockCoin = new BigDecimal(0);
        for(WithdrawChargeRecord w:withdrawList){
            blockCoin = blockCoin.add(w.getWithdrawAmount());
        }
        BigDecimal coinBalance = user.getCoinBalance();
        if(applyAmount.add(blockCoin).compareTo(coinBalance)>0)
            return new Response(2L,"大于可提现金额，请重新输入！",null);
        WithdrawChargeRecord withdrawChargeRecord = new WithdrawChargeRecord();
        withdrawChargeRecord.setUserId(userId);
        withdrawChargeRecord.setPlatformId(user.getPlatformId());
        withdrawChargeRecord.setWithdrawAmount(applyAmount);
        withdrawChargeRecord.setIsComplete(Constants.COMPLETE_STATUS_NO);
        withdrawChargeRecord.setIsDelete(Constants.OBJECT_NOT_DELETE);
        withdrawChargeMapper.insert(withdrawChargeRecord);
        return new Response(Code.SUCCESS);
    }
}
