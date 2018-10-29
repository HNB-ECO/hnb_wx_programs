package com.honey.pojo.response;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/5/30.
 */
public class ExpressResult {

    private String type;//快递公司编码

    private String number;//运单编号

    private List<ExpressArea> list = new ArrayList<>();//物流信息

    private String issign;//是否本人签收

    private String expName;//快递公司名称

    private String expSite;//快递公司官网

    private String expPhone;//快递公司电话

    private String deliverystatus;//投递状态1.在途中2.正在派件3.已签收4.派送失败

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public List<ExpressArea> getList() {
        return list;
    }

    public void setList(List<ExpressArea> list) {
        this.list = list;
    }

    public String getIssign() {
        return issign;
    }

    public void setIssign(String issign) {
        this.issign = issign;
    }

    public String getExpName() {
        return expName;
    }

    public void setExpName(String expName) {
        this.expName = expName;
    }

    public String getExpSite() {
        return expSite;
    }

    public void setExpSite(String expSite) {
        this.expSite = expSite;
    }

    public String getExpPhone() {
        return expPhone;
    }

    public void setExpPhone(String expPhone) {
        this.expPhone = expPhone;
    }

    public String getDeliverystatus() {
        return deliverystatus;
    }

    public void setDeliverystatus(String deliverystatus) {
        this.deliverystatus = deliverystatus;
    }

    @Override
    public String toString() {
        return "ExpressResult{" +
                "type='" + type + '\'' +
                ", number='" + number + '\'' +
                ", list=" + list +
                ", issign='" + issign + '\'' +
                ", expName='" + expName + '\'' +
                ", expSite='" + expSite + '\'' +
                ", expPhone='" + expPhone + '\'' +
                '}';
    }
}
