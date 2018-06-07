package com.honey.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.honey.entity.Platform;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2018/5/24.
 */
public class CommonUtil {

    public static Long getPlatformId(HttpServletRequest request, Long platformId) {
        Integer sessionType = (Integer) request.getSession().getAttribute("type");
        if (sessionType != null && sessionType.equals(2)) {
            Platform platform = (Platform) request.getSession().getAttribute(Constants.PLATFORM_LOGIN_INFO);
            if (platform != null)
                return platform.getId();
            else return platformId;
        } else
            return platformId;
    }

    public static String getOpenIdMethod(String code) {
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + Constant.WX_APP_ID + "&secret=" + Constant.WX_APP_SECRET
                + "&js_code=" + code + "&grant_type=authorization_code";

        HttpUtil httpUtil = new HttpUtil();
        try {

            // 向微信发送请求
            HttpResult httpResult = httpUtil.doGet(url, null, null);

            if (httpResult.getStatusCode() == 200) {
                // 获取响应结果的响应体
                JsonParser jsonParser = new JsonParser();
                JsonObject obj = (JsonObject) jsonParser.parse(httpResult.getBody());
                System.out.println("响应体" + obj);

                // 如果错误码不为空说明请求失败
                if (obj.get("errcode") != null) {

                    return "";
                } else {
                    // 否则请求的到openID
                    return obj.get("openid").toString();
                }
                // return httpResult.getBody();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
}