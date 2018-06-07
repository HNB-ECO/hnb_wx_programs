package com.honey.util;

import java.util.List;

/**
 * Created by JYDASHEN on 16/7/18.
 */
public class PageBeanAllComment extends PageBean {

    private Integer all;
    private Integer goodNumber;
    private Integer middleNumber;
    private Integer badNumber;

    public PageBeanAllComment(List list,Integer all,Integer goodNumber,Integer middleNumber,Integer badNumber) {
        super(list);
        this.all = all;
        this.goodNumber = goodNumber;
        this.middleNumber = middleNumber;
        this.badNumber = badNumber;
    }

    public Integer getAll() {
        return all;
    }

    public void setAll(Integer all) {
        this.all = all;
    }

    public Integer getGoodNumber() {
        return goodNumber;
    }

    public void setGoodNumber(Integer goodNumber) {
        this.goodNumber = goodNumber;
    }

    public Integer getMiddleNumber() {
        return middleNumber;
    }

    public void setMiddleNumber(Integer middleNumber) {
        this.middleNumber = middleNumber;
    }

    public Integer getBadNumber() {
        return badNumber;
    }

    public void setBadNumber(Integer badNumber) {
        this.badNumber = badNumber;
    }
}
