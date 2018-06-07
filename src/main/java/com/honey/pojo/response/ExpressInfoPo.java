package com.honey.pojo.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by ZYL on 2018/5/30.
 * 接收快递查询接口查询出的快递信息
 */
public class ExpressInfoPo {

    private String status;//事件详情

    private String msg;//消息

    private ExpressResult result;//结果

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public ExpressResult getResult() {
        return result;
    }

    public void setResult(ExpressResult result) {
        this.result = result;
    }

}
