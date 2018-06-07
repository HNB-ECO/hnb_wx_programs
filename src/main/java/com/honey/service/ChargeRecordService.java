package com.honey.service;

import com.honey.response.Response;
import com.honey.util.PageBean;

/**
 * Created by ZYL on 2018/4/28.
 */
public interface ChargeRecordService {

    Response<PageBean> recordPageList(Integer pageNum,Integer pageSize,Long userId,Long platformId);

    Response<PageBean> getChargeRecordList(Integer pageNum,Integer pageSize,String orderBy,Long platformId,String orderName,Integer orderType);

}
