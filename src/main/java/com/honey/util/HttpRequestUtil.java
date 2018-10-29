package com.honey.util;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.IOException;

/**
 * Created by xingfinal on 15/12/12.
 */
public class HttpRequestUtil {
    private final static Log log = LogFactory.getLog(HttpRequestUtil.class);

    private final static OkHttpClient okHttpClient = new OkHttpClient();


    public static boolean verifyAlipay(String notifyId) {
        String url = Constant.ALIPAY_VERIFY_URL +
                "?" + "service=notify_verify" +
                "&partner=" + Constant.ALIPAY_PARTNER_ID +
                "&notify_id=" + notifyId;

        Request request = new Request.Builder()
                .url(url)
                .build();

        try {
            Response response = okHttpClient.newCall(request).execute();
            if (response.isSuccessful() && response.body().string().equals("true")) {
                return true;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return false;
    }
}
