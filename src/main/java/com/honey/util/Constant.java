package com.honey.util;

/**
 * Created by xingfinal on 15/11/28.
 */
public class Constant {


    // 支付宝公钥
    public static final String ALIPAY_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDI6d306Q8fIfCOaTXyiUeJHkrIvYISRcc73s3vF1ZT7XN8RNPwJxo8pWaJMmvyTn9N4HQ632qJBVHf8sxHi/fEsraprwCtzvzQETrNRwVxLO5jVmRGi60j8Ue1efIlzPXV9je9mkjzOmdssymZkh2QhUrCmZYI/FCEa3/cNMW0QIDAQAB";


    // 商户私钥
    // public static final String BUSINESS_PRIVATE_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAjXb1aTF5wanqv6RDZRqQr9V0oJfaIonEyV42Lf/FaEPx4qSnBWpVJq+gZmxr+59y1Wac/lzsiNWtORngqrrBpf9ai3URJutmheSvpVE8usLW/pOnNZ5etfNHJKpVZObnnrNolWOqSEzimLn5r3acfcN4XegajYO7fsXWB6PbhQIDAQAB";
    public static final String BUSINESS_PRIVATE_KEY = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAMCNdvVpMXnBqeq/pENlGpCv1XSgl9oiicTJXjYt/8VoQ/HipKcFalUmr6BmbGv7n3LVZpz+XOyI1a05GeCqusGl/1qLdREm62aF5K+lUTy6wtb+k6c1nl6180ckqlVk5uees2iVY6pITOKYufmvdpx9w3hd6BqNg7t+xdYHo9uFAgMBAAECgYEAq7H47x/btBwSLXaxPD89DuMbTSGeBi5h9o0watNdjGNKordb5mqXxFH4rOhnqWn3ZegP1dGifnANSKbwAjt6xoDTyGnXVoFMyBVj/gJ/IXFrFc+19anw8pe67nIOcCDcQcdtKkDTDRX4IfaR3REiWXNfs+Pf8ggZvd3tg25uSMkCQQDwTM/rQWXnBE7bUBVo3wXqcEaGZKikCaxexFbYAyeaRg+7+u9zcMwkiLQf2EMBpQOgdmkZvv/jdJKwPh8t5LSrAkEAzSIK7gEdMGpnD8QMV73jBGFtVSpIk6wR3QZhm0humlMrpW4pAmtdLQWV+f/heWJZzQskVJ++NG3qEVI4RkjQjwJBAIW36LecE82jKxKFlPRfrtYPll8w4lst+tpdXYok70O9GwJbGCZgLWljHQDfgiIHJmaDneayz4hOFVa3qvgJ3bMCQEKVAicuhWLppnofkEIKiF0romk6SERmXYX4REY6xGujA0+26ei3II80ePGkdHMJ0UwUib5N+1bZNlhY75sgl1ECQQDugQapsjz1lNz1YEVJiuk+P3JhOFgKHh5dXqtjgcq3LLVQepl8la3tV0M5K0ylDqy1DFXTxUf6iNXbGYimm9A0";


    // 支付宝验证URL
    public static final String ALIPAY_VERIFY_URL = "https://mapi.alipay.com/gateway.do";

    // 支付宝支付结果通知URL
    public static final String ALIPAY_NOTIFY_URL = "http://server.wohoney.com:12050/api/pay/notify/ali";

    // 支付宝移动支付Service
    public static final String ALIPAY_SERVICE_MOBILE = "mobile.securitypay.pay";

    // 支付宝手机网站支付
    public static final String ALIPAY_SERVICE_DIRECT = "alipay.wap.create.direct.pay.by.user";

    // 支付宝即时到账退款
    public static String ALIPAY_SERVICE_REFUND = "refund_fastpay_by_platform_nopwd";

    // 支付宝 partner ID
    public static final String ALIPAY_PARTNER_ID = "2088911321442944";
    //public static final String ALIPAY_APP_ID = "2016071901638713";
    public static final String ALIPAY_APP_ID = "2017011104992318";

    // 支付宝签名字符集
    public static final String ALIPAY_CHARSET = "UTF-8";
    // 支付宝MD5尾串
    public static final String ALIPAY_MD5_TAIL = "xksyjbtdm9546gs8dgwvnvj3k5ne75xz";


    // JWT Token Attribute
    public static final String CLAIMS = "claims";

    public static final String BASE_OUT_TRADE_NO = "drawyouOrderNO";
    public static final String BASE_BACK_TRADE_NO = "drawyouBackNO";
    public static final String BASE_ADD_TRADE_NO = "drawyouAddNO";
    public static final String DEFAULT_AVATAR = "http://oa4nxvfe2.bkt.clouddn.com/default_setting_header@3x.png";


    public static final String JPUSH_APP_KEY_OLD = "a0825e744085b30055b5645e";
    public static final String JPUSH_APP_KEY = "fec69e7e821c5758dde6aad7";
    public static final String JPUSH_MASTER_SECRET_OLD = "8bb875a820219b4bd313bb8a";
    public static final String JPUSH_MASTER_SECRET = "27aa29cc1b0a35980959997b";

    //微信统一下单接口
    public static final String URL_UNIFIED_ORDER = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    //通知地址，回调接口
    public static final String DOMAIN = "https://hnb.daolema.me/hnb";//域名正在备案
    public static final String URL_NOTIFY = DOMAIN + "/webservice/wxPayCallBack/callBack";
    //小程序微信支付接口所用到的参数
    public static final String WX_APP_ID = "wxa6002192b3087ec7";
    public static final String WX_APP_SECRET = "57bd00119b3fb51b88250fed70f1de9a";
    public static final String WX_MCH_ID = "1503440161";
    public static final String WX_API_KEY = "tJxcuKKQNGW4XglK7JJO6sFcG3I3WEwm";
    public static final String WX_BODY = "HNB";
    public static final String WX_ATTACH = "HNB";
    //小程序退款证书路径
    public static final String CERT_PATH = "/usr/local/apache-tomcat-8.0.52/webapps/cert/apiclient_cert.p12";
    //小程序退款接口
    public static final String REFUND_API = "https://api.mch.weixin.qq.com/secapi/pay/refund";
    //七牛token
    public static final String QINIU_TOKEN1 = "vWxd-w1ipbuT3vMkHA8mRblGnFpJ9AlWYmCyTPRx:6KwEl1jWUSCkP4UEssBo_WzUpx0=:eyJzY29wZSI6ImhuYmJsb2NrIiwiZGVhZGxpbmUiOjMzNTQ1Mjg5MTh9";
    public static final String QINIU_TOKEN2 = "vWxd-w1ipbuT3vMkHA8mRblGnFpJ9AlWYmCyTPRx:7IaZsvHTBO_wWohuMfjz8xmbdQY=:eyJzY29wZSI6ImhuYmJsb2NrIiwiZGVhZGxpbmUiOjMzNTU0Nzk1OTl9";
    public static final String QINIU_ACCESS_KEY = "vWxd-w1ipbuT3vMkHA8mRblGnFpJ9AlWYmCyTPRx";
    public static final String QINIU_SECRET_KEY = "hLEEcpZ4LP78Kqq3lNe-4_rtf3fhm03HgdJiNYQ3";
    public static final String QINIU_BUCKET = "hnbblock";
    public static final Integer QINIU_EFFECTIVETIME = 10;



}
