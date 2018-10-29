package com.honey.pojo.response;

/**
 * Created by Administrator on 2018/5/30.
 */
public class ExpressArea {

    private String time;

    private String status;

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ExpressArea{" +
                "time='" + time + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
