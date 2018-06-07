package com.honey.pojo.response;

import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Created by ZYL on 2018/5/25.
 */
public class PieChartData {

    private String name;

    private String type;

    private String radius;

    private String [] center;

    private List<Map<String , Object>> data;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRadius() {
        return radius;
    }

    public void setRadius(String radius) {
        this.radius = radius;
    }

    public String[] getCenter() {
        return center;
    }

    public void setCenter(String[] center) {
        this.center = center;
    }

    public List<Map<String, Object>> getData() {
        return data;
    }

    public void setData(List<Map<String, Object>> data) {
        this.data = data;
    }
}
