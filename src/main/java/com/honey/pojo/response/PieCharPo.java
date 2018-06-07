package com.honey.pojo.response;

import javafx.scene.chart.PieChart;

/**
 * Created by ZYL on 2018/5/24.
 */
public class PieCharPo {

    private String name;//名称

    private String subtext;//副标题

    private String [] legend;//数据分类

    private PieChartData [] data;//数据

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubtext() {
        return subtext;
    }

    public void setSubtext(String subtext) {
        this.subtext = subtext;
    }

    public String[] getLegend() {
        return legend;
    }

    public void setLegend(String[] legend) {
        this.legend = legend;
    }

    public PieChartData[] getData() {
        return data;
    }

    public void setData(PieChartData[] data) {
        this.data = data;
    }
}
