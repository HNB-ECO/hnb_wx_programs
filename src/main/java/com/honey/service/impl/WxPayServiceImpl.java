package com.honey.service.impl;

import com.honey.entity.*;
import com.honey.mapper.*;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.WxPayService;
import com.honey.util.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.*;

/**
 * Created by Administrator on 2018/5/8.
 */
@Service
public class WxPayServiceImpl implements WxPayService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private WorkOrderMapper workOrderMapper;

    @Autowired
    private ChargeRecordMapper chargeRecordMapper;

    @Autowired
    private PlatformMapper platformMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private WxChargeRecordMapper wxChargeRecordMapper;

    @Autowired
    private GoodsMapper goodsMapper;

    private static Logger log = Logger.getLogger(WxPayServiceImpl.class);

    /**
     * 进行微信预支付处理
     *
     * @param openId   微信客户唯一标识
     * @param price    支付价格
     * @param clientIP 客户终端IP
     * @return
     */
    public Map<String, Object> executeWxPrepay(String openId, BigDecimal price, String clientIP, String payTypeString, Long orderIdOrUserId) {
        long code = 200L;
        String message = "";
        Map<String, Object> map = new HashMap<String, Object>();
        if (StringUtils.isBlank(openId)) {
            code = 01L;
            message = "openId为空";
        } else {
            // openID中间有斜杠，去掉
            // openId = openId.replace("\"", "").trim();
            log.info("openId: " + openId + ", clientIP: " + clientIP);
            // 返回一个定长的随机纯字母字符串
            String randomNonceStr = PayUtil.generateMixString(32);
            // 生成商户订单号
            Long randomOrderId = PayUtil.getRandomOrderId();

            // 调用统一下单的接口生成预付款订单号
            Map<String, Object> map2 = unifiedOrder(randomOrderId.toString(), openId, clientIP,
                    randomNonceStr, String.valueOf(price), payTypeString, orderIdOrUserId.toString());
            String prepayIdString = null;
            if (map2 == null) {
                code = 02L;
                message = "出错了，未获取到prepayId";
            } else {
                prepayIdString = String.valueOf(map2.get("prepay_id"));
                log.error("prepayId: " + map2.get("prepay_id"));
            }
            if (StringUtils.isBlank(prepayIdString)) {
                code = 03L;
                message = "出错了，未获取到prepayId";
            } else {
                map.put("prepayId", map2.get("prepay_id"));
                map.put("nonceStr", randomNonceStr);
                map.put("paySign", map2.get("paySign"));
                map.put("timeStamp", map2.get("timeStamp"));
                // 如果成功的得到了预支付订单号就生成订单
                String out_trade_no = (String) map2.get("out_trade_no");
                map.put("out_trade_no", out_trade_no);
            }
        }
        map.put("code", code);
        map.put("message", message);
        return map;
    }

    private Map<String, Object> unifiedOrder(String out_trade_no, String openId, String clientIP,
                                             String randomNonceStr, String price, String payTypeString, String orderIdOrUserId) {
        try {
            // 统一下单的路径
            String url = Constant.URL_UNIFIED_ORDER;
            // 返回一个包含各种请求参数的对象
            Map<String, String> payInfoMap = createPayInfo(out_trade_no, openId, clientIP, randomNonceStr, price, payTypeString, orderIdOrUserId);
            String apiKey = (String) payInfoMap.get("key");
            // 将apiKey去掉
            payInfoMap.remove("key");
            // 获取到经过MD5加密后的签名
            String md5 = getSign(payInfoMap, apiKey);
            // 将签名传入
            payInfoMap.put("sign", md5);

            log.error("md5 value: " + md5);
            SortedMap<String, String> payInfoSortMap = new TreeMap<String, String>();
            payInfoSortMap.putAll(payInfoMap);
            // 将对象转换成xml格式
            String xml = XMLUtil.getRequestXml(payInfoSortMap);
            // 将特殊的字符替换掉
            // xml = xml.replace("__", "_").replace("<![CDATA[1]]>", "1");
            //// xml = xml.replace("__", "_").replace("<![CDATA[", "").replace("]]>", "");
            log.error(xml);
            System.out.println("xml string:" + xml.toString());
            // 得到一个xml的缓冲区字符串
            StringBuffer buffer = HttpUtil.httpsRequest(url, "POST", xml);
            log.error("unifiedOrder request return body: \n" + buffer.toString());

            // 解析xml字符串
            Map<String, String> result = XMLUtil.getMapFromXML(buffer.toString());
            // 获取返回状态码
            String return_code = result.get("return_code");
            // 判断是否成功
            if (StringUtils.isNotBlank(return_code) && return_code.equals("SUCCESS")) {
                // 得到返回信息
                String return_msg = result.get("return_msg");

                if (StringUtils.isNotBlank(return_msg) && !return_msg.equals("OK")) {
                    // log.error("统一下单错误！");
                    return null;
                }
                // 成功返回预支付交易单
                String prepay_Id = result.get("prepay_id");
                String timeStampString = String.valueOf(System.currentTimeMillis());
                Map<String, String> secondSignMap = new HashMap<String, String>();
                secondSignMap.put("appId", (String) payInfoMap.get("appid"));
                secondSignMap.put("nonceStr", (String) payInfoMap.get("nonce_str"));
                secondSignMap.put("package", "prepay_id=" + prepay_Id);
                secondSignMap.put("signType", (String) payInfoMap.get("sign_type"));
                secondSignMap.put("timeStamp", timeStampString);
                String paySign = getSign(secondSignMap, apiKey);
                System.out.println("paySign:" + paySign);
                Map<String, Object> map = new HashMap<String, Object>();
                map.put("prepay_id", prepay_Id);
                map.put("out_trade_no", (String) payInfoMap.get("out_trade_no"));
                map.put("paySign", paySign);
                map.put("timeStamp", timeStampString);
                return map;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // 得到一个付款详细信息对象
    private Map<String, String> createPayInfo(String out_trade_no, String openId, String clientIP,
                                              String randomNonceStr, String price, String payTypeString, String orderIdOrUserId) throws Exception {
        Map<String, String> resultMap = new HashMap<String, String>();
        Date date = new Date();
        String timeStart = PayUtil.getFormatTime(date, Constants.TIME_FORMAT);
        String timeExpire = PayUtil.getFormatTime(PayUtil.addMinute(date, Constants.MINUTE_EXPIRE),
                Constants.TIME_FORMAT);
        resultMap.put("appid", Constant.WX_APP_ID);// 小程序IP
        resultMap.put("mch_id", Constant.WX_MCH_ID);// 商户号
        resultMap.put("key", Constant.WX_API_KEY);// api秘钥
        resultMap.put("device_info", "WEB");// 设备号，固定值
        resultMap.put("nonce_str", randomNonceStr);// 随机字符串
        resultMap.put("sign_type", "MD5"); // 默认即为MD5加密
        resultMap.put("body", Constant.WX_BODY);
        resultMap.put("attach", Constant.WX_ATTACH + "-" + payTypeString + "(" + orderIdOrUserId + ")");
        resultMap.put("out_trade_no", out_trade_no);
        BigDecimal p = new BigDecimal(price);
        BigDecimal payPrice = p.multiply(new BigDecimal(100));
        resultMap.put("total_fee", String.valueOf(payPrice.longValue()));
        resultMap.put("spbill_create_ip", clientIP);
        resultMap.put("time_start", timeStart);// 交易起始时间
        resultMap.put("time_expire", timeExpire);// 交易结束时间
        resultMap.put("notify_url", Constant.URL_NOTIFY);// 通知地址
        resultMap.put("trade_type", "JSAPI");// 交易类型，固定值
        resultMap.put("limit_pay", "no_credit");// 支付方式
        resultMap.put("openid", openId);// 用户标识
        return resultMap;
    }

    public static String getSign(Map<String, String> map, String apiKey) throws Exception {
        ArrayList<String> list = new ArrayList<String>();
        for (Map.Entry<String, String> entry : map.entrySet()) {
            if (entry.getValue() != "") {
                list.add(entry.getKey() + "=" + entry.getValue() + "&");
            }
        }
        int size = list.size();
        String[] arrayToSort = list.toArray(new String[size]);
        Arrays.sort(arrayToSort, String.CASE_INSENSITIVE_ORDER);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < size; i++) {
            sb.append(arrayToSort[i]);
        }
        String result = sb.toString();
        result += "key=" + apiKey;
        System.out.println("mySignString------------:" + result);
        // Log.getLogger().debug("Sign Before MD5:" + result);
        result = PayUtil.getMD5(result.trim()).toUpperCase();
        // Log.getLogger().debug("Sign Result:" + result);
        return result;
    }

    public Response updateOrderAfterZhifu(String orderIdString, WxChargeRecord wxChargeRecord) {
        /**
         * 更新订单信息
         */
        try {
            Order order = orderMapper.selectByPrimaryKey(Long.valueOf(orderIdString));//查询订单
            order.setUpdateTime(new Date());
            order.setOrderStatus(Constants.ORDER_STATUS_SHIP);
            order.setPaymentType(Constants.PAY_TYPE_WX);
            orderMapper.updateByPrimaryKey(order);

            List<WorkOrder> workOrders = order.getWorkOrders();
            for (WorkOrder workOrder : workOrders) {
                workOrder.setStatus(Constants.WORKORDER_STATUS_SHIP);
                workOrder.setShipTime(new Date());
                workOrder.setUpdateTime(new Date());
                workOrderMapper.updateByPrimaryKey(workOrder);
                //更新商品销量
                Goods goods = workOrder.getGoods();
                Integer amount = workOrder.getAmount();
                goods.setSales(goods.getSales()+amount.longValue());
                goodsMapper.updateByPrimaryKeySelective(goods);
            }

            //创建微信支付流水
            wxChargeRecord.setOrderId(Long.valueOf(orderIdString));
            wxChargeRecordMapper.insert(wxChargeRecord);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.OBJECT_UPDATE_STATUS_ERROR);
        }
        return new Response(Code.SUCCESS);
    }

    public Response updateOrderAfterChongzhi(String userIdString, Long price, WxChargeRecord wxChargeRecord) {
        /**
         * 更新订单信息
         */
        try {
            /**
             * 以下代码应当在微信支付成功后回调函数中执行，在完成支付后修改
             * 平台扣除price金额的HNB，用户添加price金额的HNB
             * 添加用户充值流水记录
             */
            Long userId = Long.valueOf(userIdString);
            User user = userMapper.selectByPrimaryKey(userId);
            Platform platform = platformMapper.selectByPrimaryKey(user.getPlatformId());
            //扣除平台的数量
            BigDecimal platformCoin = platform.getCoin();
            BigDecimal decimalPrice = new BigDecimal(price).divide(new BigDecimal(100));
            platformCoin = platformCoin.subtract(decimalPrice);//扣除平台HNB
            platform.setCoin(platformCoin);
            platformMapper.updateByPrimaryKey(platform);
            /**
             * 其中现在暂时不考虑平台HNB不足的情况
             * TODO
             */

            //为用户添加HNB
            BigDecimal userCoin = user.getCoinBalance();
            userCoin = userCoin.add(decimalPrice);
            user.setCoinBalance(userCoin);
            userMapper.updateByPrimaryKey(user);

            //创建流水
            ChargeRecord chargeRecord = new ChargeRecord();
            chargeRecord.setOrderName(Constants.USER_RECHARGE_PREFIX + user.getId() + new Date().getTime());//前缀+ 用户ID +时间戳
            chargeRecord.setUserId(userId);
            chargeRecord.setPlatformId(platform.getId());
            chargeRecord.setCoin(decimalPrice);
            chargeRecord.setOrderType(Constants.USER_RECHARGE_TYPE_IN);
            chargeRecord.setCreateTime(new Date());
            chargeRecord.setUpdateTime(new Date());
            chargeRecord.setIdDelete(Constants.OBJECT_NOT_DELETE);
            Long chargeRecordId = chargeRecordMapper.insertIdBack(chargeRecord);

            //创建微信支付流水
            wxChargeRecord.setChargeId(chargeRecordId);
            wxChargeRecordMapper.insert(wxChargeRecord);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.OBJECT_UPDATE_STATUS_ERROR);
        }
        return new Response(Code.SUCCESS);
    }

    /**
     * 微信退款
     *
     * @param order
     * @return
     */
    public Map<String, Object> executeWxRefund(Order order) throws Exception {
        long code = 200L;
        String message = "";
        Map<String, Object> map = new HashMap<String, Object>();
        Long orderId = order.getId();
        WxChargeRecordExample wxChargeExample = new WxChargeRecordExample();
        WxChargeRecordExample.Criteria wxChargeCriteria = wxChargeExample.createCriteria();
        wxChargeCriteria.andOrderIdEqualTo(orderId);
        wxChargeCriteria.andChargeTypeEqualTo(Constants.CHARGE_TYPE_INCOME);
        List<WxChargeRecord> wxChargeRecordList = wxChargeRecordMapper.selectByExample(wxChargeExample);
        if (wxChargeRecordList == null || wxChargeRecordList.size() == 0) {
            map.put("code", 01L);
            map.put("message", "找不到符合条件的订单！无法退款！");
        } else if (wxChargeRecordList.size() > 1) {
            map.put("code", 02L);
            map.put("message", "出错！含有多条符合条件订单！");
        } else {
            WxChargeRecord wxChargeRecord = wxChargeRecordList.get(0);

            String appid = Constant.WX_APP_ID; // appid
            String mch_id = Constant.WX_MCH_ID; // 商业号
            String key = Constant.WX_API_KEY; // key

            //String currTime = PayCommonUtil.getCurrTime();
            //String strRandom = PayCommonUtil.buildRandom(4) + "";
            String nonce_str = PayUtil.generateMixString(32); // 随机字符串
            String transaction_id = wxChargeRecord.getTransactionId();
            String out_trade_no = wxChargeRecord.getOutTradeNo();//申请退款的商户订单号

            String out_refund_no = PayUtil.getRandomOrderId().toString();
            String total_fee = wxChargeRecord.getTotalFee().toString();
            String refund_fee = total_fee;
            String op_user_id = mch_id; // 操作员默认为商户号

            SortedMap<String, String> paramMap = new TreeMap<String, String>();
            paramMap.put("appid", appid);
            paramMap.put("mch_id", mch_id);
            paramMap.put("nonce_str", nonce_str);
            if (StringUtils.isNoneBlank(transaction_id))
                paramMap.put("transaction_id", transaction_id);
            else
                paramMap.put("out_trade_no", out_trade_no);
            paramMap.put("out_refund_no", out_refund_no);
            paramMap.put("total_fee", total_fee);
            paramMap.put("refund_fee", refund_fee);
            paramMap.put("op_user_id", op_user_id);

            String sign = getSign(paramMap,key);
            paramMap.put("sign", sign);
            String requestXML = XMLUtil.getRequestXml(paramMap);
            String resXml = CertHttpUtil.postData(Constant.REFUND_API, requestXML);
            //解析xml为集合，请打断点查看resXml详细信息
            Map<String, String> refundMap = XMLUtil.getMapFromXML(resXml);
            //查看申请退款状态
            String resultCode = (String)refundMap.get("result_code");
            System.out.print(resultCode);
            if("SUCCESS".equals(resultCode)){
                WxChargeRecord refundWxChargeRecord = new WxChargeRecord();
                refundWxChargeRecord.setOrderId(wxChargeRecord.getOrderId());
                refundWxChargeRecord.setChargeType(Constants.CHARGE_TYPE_OUTCOME);
                refundWxChargeRecord.setPaymentType(Constants.WX_PAY_TYPE_TUIKUAN);
                refundWxChargeRecord.setTotalFee(Long.valueOf(refund_fee));
                refundWxChargeRecord.setOutTradeNo(out_refund_no);
                refundWxChargeRecord.setCreateTime(new Date());
                refundWxChargeRecord.setIsDelete(Constants.OBJECT_NOT_DELETE);
                wxChargeRecordMapper.insert(refundWxChargeRecord);
            }
            map.put("refundMap",refundMap);
        }
        map.put("code", code);
        map.put("message", message);
        return map;
    }
}
