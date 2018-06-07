package com.honey.pojo.response;

/**
 * Created by ZYL on 2018/5/24.
 */
public class LineCharPo {

    private String title;//标题

    private String [] xAxis;//X轴参数

    private String []  legend;//每一条线对应的平台

    private String valueSuffix;//单位

    private LineChartData[] data;//数据

    public LineChartData[] getData() {
        return data;
    }

    public void setData(LineChartData[] data) {
        this.data = data;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getValueSuffix() {
        return valueSuffix;
    }

    public void setValueSuffix(String valueSuffix) {
        this.valueSuffix = valueSuffix;
    }

    public String[] getxAxis() {
        return xAxis;
    }

    public void setxAxis(String[] xAxis) {
        this.xAxis = xAxis;
    }

    public String[] getLegend() {
        return legend;
    }

    public void setLegend(String[] legend) {
        this.legend = legend;
    }
}
