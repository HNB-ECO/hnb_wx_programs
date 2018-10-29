package com.honey.service;

import com.honey.entity.WithdrawChargeRecord;
import com.honey.response.Response;
import com.honey.util.PageBean;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Administrator on 2018/6/1.
 */
public interface WithdrawService {

    Response<PageBean> getWithdrawChargeList(Integer pageNum,Integer pageSize,String orderBy,Long platformId);

    Response completeWithdraw(Long withdrawChargeId,Integer withdrawResult,String operateName);

    List<WithdrawChargeRecord> getUnCompleteWithdrawListByUserId(Long userId);

    Response applyWithdraw(Long userId,BigDecimal applyAmount);
}
