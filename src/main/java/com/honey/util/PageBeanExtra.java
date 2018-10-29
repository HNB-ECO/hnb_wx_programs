package com.honey.util;

import java.util.List;

/**
 * Created by xingfinal on 16/1/22.
 */
public class PageBeanExtra extends PageBean {

    // 在不包含查询条件时的结果总数
    private Long all;

    public PageBeanExtra(List list, Long all) {
        super(list);
        this.all = all;
    }

    public Long getAll() {
        return all;
    }

    public void setAll(Long all) {
        this.all = all;
    }
}
