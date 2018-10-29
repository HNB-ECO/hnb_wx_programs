package com.honey.util;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.honey.pojo.response.ExpressInfoPo;
import com.honey.pojo.response.ExpressResult;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by ZYL on 2018/5/30.
 * 查询物流信息工具类
 */
public class ExpressUtil {

    static final String host = "http://wuliu.market.alicloudapi.com";
    static final String path = "/kdi";
    static final String method = "GET";
    static final String appcode = "0f256c39be5e45608a2843f669ec5a1b";

    /**
     * 获取快件状态
     * @param expressNo
     * @param code
     * @return
     */
    public static String expressStatus(String expressNo,String code){
        ExpressInfoPo po = getExpressInfo(expressNo,code);
        if(!po.getStatus().equals(Constants.EXPRESS_INFO_SUCCESS)){//获取失败，返回错误消息
            return po.getMsg();
        }
        return po.getResult().getDeliverystatus();
    }

    /**
     * 快递物流信息
     * @param expressNo
     * @param code
     * @return
     */
    public static ExpressResult getExpressResult(String expressNo,String code){
        ExpressInfoPo po = getExpressInfo(expressNo,code);
        if(!po.getStatus().equals(Constants.EXPRESS_INFO_SUCCESS)){//获取失败，返回错误消息
            return null;
        }
        return po.getResult();
    }

    /**
     * 通过快递单号查询快递信息
     * @param expressNo
     * @param code
     */
    private static ExpressInfoPo getExpressInfo (String expressNo,String code){
        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", "APPCODE " + appcode);
        Map<String, String> querys = new HashMap<>();
        querys.put("no", expressNo);//快递单号

        if(!DataUtils.isNullOrEmpty(code)){
            querys.put("type", code);//快递单号
        }

        ExpressInfoPo po = null;
        try {
            HttpResponse response = HttpUtils.doGet(host, path, method, headers, querys);
            String json = EntityUtils.toString(response.getEntity());

            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            po = mapper.readValue(json,ExpressInfoPo.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return po;
    }
}
