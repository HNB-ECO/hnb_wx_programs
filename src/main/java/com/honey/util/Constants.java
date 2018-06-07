package com.honey.util;

public class Constants {

    public  static final Integer OBJECT_NOT_DELETE = 0;//未删除
    public  static final Integer OBJECT_IS_DELETE = 1;//已删除

    public static final Integer DEFAULT_ADDRESS = 1;//默认地址
    public static final Integer NOT_DEFAULT_ADDRESS=0;//非默认地址

    public static final String USER_RECHARGE_PREFIX="CZ-";//用户充值HNB流水订单号前缀
    public static final String ORDER_NAME_PREFIX="DD-";//用户订单前缀
    public static final String REFUND_NAME_PREFIX="TT-";//用户订单退款前缀


    public static final Integer USER_RECHARGE_TYPE_IN = 1;
    public static final Integer USER_RECHARGE_TYPE_OUT = 2;

    public static final Integer ORDER_STATUS_NEW = 1;//订单创建，未支付
    public static final Integer ORDER_STATUS_SHIP =2;//已支付，待发货
    public static final Integer ORDER_STATUS_RECEIPT =3;//已发货，待收货
    public static final Integer ORDER_STATUS_COMMENT =4;//已收货，待评价
    public static final Integer ORDER_STATUS_FINISH =5;//已评价，订单结束
    public static final Integer ORDER_STATUS_CANCEL =6;//已取消

    public static final Integer WORKORDER_STATUS_NEW = 1;//订单创建，未支付
    public static final Integer WORKORDER_STATUS_SHIP =2;//已支付，待发货
    public static final Integer WORKORDER_STATUS_RECEIPT =3;//已发货，待收货
    public static final Integer WORKORDER_STATUS_COMMENT =4;//已收货，待评价
    public static final Integer WORKORDER_STATUS_FINISH =5;//已评价，订单结束
    public static final Integer WORKORDER_STATUS_CANCEL =6;//已取消

    public static final String PAY_TYPE_HNB = "1";//HNB支付
    public static final String PAY_TYPE_WX = "2";//WX支付

    public static final String LOGIN_TYPE_WX ="WX";//微信登录
    public static final String LOGIN_TYPE_APP="APP";//app登录

    public static final String TIME_FORMAT = "yyyyMMddHHmmss";// 时间格式，交易起始或者结束的时间
    public static final int MINUTE_EXPIRE = 30; // 单位是分钟

    public static final String WX_PAY_TYPE_ZHIFU = "支付";// 微信支付方式--支付
    public static final String WX_PAY_TYPE_CHONGZHI = "充值"; // 微信支付方式--充值
    public static final String WX_PAY_TYPE_TUIKUAN = "退款";// 微信支付方式--支付

    public static final Integer CHARGE_TYPE_INCOME = 1;// 流水类型-收入
    public static final Integer CHARGE_TYPE_OUTCOME = 2; // 流水类型--支出

    public static final String PLATFORM_LOGIN_INFO = "PlatformLoginInfo";//平台用户登录信息
    public static final String ADMINI_LOGIN_INFO = "AdminLoginInfo";//管理员登录信息

    public static final String ROLE_SUPER = "ROLE_SUPER";//系统超级管理员
    public static final String ROLE_ADMIN = "ROLE_ADMIN";//系统管理员
    public static final String ROLE_PLATFORM = "ROLE_PLATFORM";//平台管理员

    public static final String EXPRESS_INFO_SUCCESS = "0";

    public static final Integer USER_STATUS_ACTIVE = 0;//正常
    public static final Integer USER_STATUS_BLOCK = 1;//冻结
    public static final Integer USER_STATUS_DELETE = 2;//删除

    public static final String DEFAULT_PAGE_NUM = "1";//默认页数
    public static final String DEFAULT_PAGE_SIZE = "10";//默认每页展示条数

    public static final String DEFAULT_PASSWORD = Md5Utils.toMd5("123456");

    public static final Integer COMPLETE_STATUS_NO = 0;//未完成
    public static final Integer COMPLETE_STATUS_YES = 1;//已完成

    public static final Integer WITHDRAW_RESULT_SUCCESS = 0;//成功
    public static final Integer WITHDRAW_RESULT_FAILED = 1;//失败

    public static final String DELIVERY_STATUS_WAY = "1";//投递中
    public static final String DELIVERY_STATUS_SHIP = "2";//派件中
    public static final String DELIVERY_STATUS_FINISH = "3";//已签收
    public static final String DELIVERY_STATUS_FAILED = "4";//失败



}
