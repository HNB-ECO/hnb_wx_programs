package com.honey.util;

import com.github.pagehelper.Page;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Administrator on 2018/4/23.
 */
public class PageBean<T> implements Serializable {

    private long total;

    private int pages;

    private int number;

    private int size;

    private List<T> list;

    public PageBean(List<T> list) {
        if (list instanceof Page) {
            Page<T> page = (Page<T>) list;
            this.number = page.getPageNum();
            this.size = page.getPageSize();
            this.total = page.getTotal();
            this.pages = page.getPages();
            this.list = page;
        }
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }
}
