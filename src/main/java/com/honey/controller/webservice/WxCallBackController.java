package com.honey.controller.webservice;

import com.honey.entity.WxChargeRecord;
import com.honey.response.BaseResp;
import com.honey.service.WxPayService;
import com.honey.util.Constant;
import com.honey.util.Constants;
import com.honey.util.PayUtil;
import com.honey.util.XMLUtil;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2018/5/8.
 */
@RestController
@RequestMapping("/webservice/wxPayCallBack")
public class WxCallBackController {

    @Autowired
    private WxPayService wxPayService;

    private static Logger log = Logger.getLogger(WxCallBackController.class);

    @RequestMapping(value = "/callBack", method = RequestMethod.POST)
    @ResponseBody
    public BaseResp callBack(HttpServletRequest request, HttpServletResponse response) {
        BaseResp baseResp = new BaseResp();
        try {
            log.info("进入回调方法");
            System.out.println("进入回调方法");
            String requestString = IOUtils.toString(request.getInputStream(), "utf-8");
            Map<String, String> paraMap = null;

            paraMap = XMLUtil.getMapFromXML(requestString);
            Set<String> keySet = paraMap.keySet();
            Iterator<String> iterator = keySet.iterator();
            int i = 1;
            while (iterator.hasNext()) {
                Object key = iterator.next();
                System.out.println("key" + i + ":" + String.valueOf(key));
                System.out.println("value" + i + ":" + String.valueOf(paraMap.get(key)));
                i++;
            }
            String signFromAPIResponse = paraMap.get("sign").toString();

            String returnCode = paraMap.get("return_code");
            System.out.println("我的支付状态:" + returnCode);
            Map<String, String> returnMap = new HashMap<String, String>();
            String mySign = getSignFromResponseString(requestString);
            log.info("signFromAPIResponse:" + signFromAPIResponse);
            System.out.println("signFromAPIResponse:" + signFromAPIResponse);
            log.info("notifySign:" + mySign);
            System.out.println("notifySign:" + mySign);
            if ("FAIL".equals(returnCode)) {
                String returnMsg = paraMap.get("return_msg");
                log.info("微信通知【失败：" + returnMsg + "】");
                returnMap.put("return_code", "FAIL");
            } else if ("SUCCESS".equals(returnCode) && mySign.equals(signFromAPIResponse)) {
                String outTradeNo = new String(paraMap.get("out_trade_no"));
                log.info("outTradeNo = " + outTradeNo);
                // 交易号
                String transcationCode = new String(paraMap.get("transaction_id"));
                log.info("transcationCode = " + transcationCode);
                // 交易金额
                String totalFeeStr = new String(paraMap.get("total_fee"));
                log.info("totalFeeStr = " + totalFeeStr);
                // 业务结果
                String resultCode = new String(paraMap.get("result_code"));

                String attach = new String(paraMap.get("attach"));
                System.out.println("attach:" + attach);
                // log.info("resultCode = " + resultCode);
                if ("SUCCESS".equals(resultCode)) {
                    Long totalFee = Long.parseLong(totalFeeStr);
                    System.out.println("Success--totalFee:" + totalFee);
                    System.out.println("transcationCode:" + transcationCode);
                    System.out.println("outTradeNo:" + outTradeNo);
                    System.out.println("totalFeeStr:" + totalFeeStr);
                    baseResp = completePay(transcationCode, outTradeNo, totalFee, attach);
                    System.out.println("baseResp.errCode:" + baseResp.getErrcode());
                    if (baseResp.getErrcode() == BaseResp.SUCCESS) {
                        returnMap.put("return_code", "SUCCESS");
                        returnMap.put("return_msg", "OK");
                    } else {
                        // log.error("微信异步通知：" + e.getMessage(), e);
                        returnMap.put("return_code", "FAIL");
                        returnMap.put("return_msg", "结果失败");
                    }
                } else if ("FAIL".equals(resultCode)) {
                    String err_code = paraMap.get("err_code");
                    String err_code_des = paraMap.get("err_code_des");
                    log.info("微信通知【结果失败 err_code：" + err_code + ", err_code_des：" + err_code_des + "】");
                    System.out.println("微信通知【结果失败 err_code：" + err_code + ", err_code_des：" + err_code_des + "】");
                    returnMap.put("return_code", "FAIL");
                    returnMap.put("return_msg", "结果失败");
                }
            } else {
                log.info("签名验证失败！");
                returnMap.put("return_code", "FAIL");
                returnMap.put("return_msg", "签名验证失败！");
            }
            String xmlResult = XMLUtil.toXmls(returnMap);
            System.out.print("返回状态码-----------" + xmlResult);
            BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
            out.write(xmlResult.getBytes());
            out.flush();
            out.close();
            baseResp.setData(xmlResult);
            return baseResp;
        } catch (Exception e) {
            log.error("微信通知异常", e);
            baseResp.setData("");
            return baseResp;
        }
    }

    /**
     * 从API返回的XML数据里面重新计算一次签名
     *
     * @param responseString API返回的XML数据
     * @return 签名
     * @throws Exception
     */
    public String getSignFromResponseString(String responseString) throws Exception {
        Map<String, String> map = XMLUtil.getMapFromXML(responseString);
        // 清掉返回数据对象里面的Sign数据（不能把这个数据也加进去进行签名），然后用签名算法进行签名
        map.put("sign", "");
        // 将API返回的数据根据用签名算法进行计算新的签名，用来跟API返回的签名进行比较
        return getSign(map, Constant.WX_API_KEY);

    }

    private String getSign(Map<String, String> map, String apiKey) throws Exception {
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

    private BaseResp completePay(String transcationCode, String out_trade_no, Long totalFee, String attach)
            throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("进入completePay");
        System.out.println("transactionId:" + transcationCode);
        System.out.println("out_trade_no:" + out_trade_no);
        System.out.println("price:" + totalFee);
        System.out.println("attach:" + attach);
        String wxPayType = attach.substring(attach.indexOf("-") + 1, attach.indexOf("("));
        System.out.println("wxPayType:" + String.valueOf(wxPayType));
        String orderIdOrUserId = attach.substring(attach.indexOf("(") + 1, attach.length() - 1);


        WxChargeRecord wxChargeRecord = new WxChargeRecord();
        wxChargeRecord.setChargeType(Constants.CHARGE_TYPE_INCOME);
        wxChargeRecord.setPaymentType(wxPayType);
        wxChargeRecord.setTotalFee(totalFee);
        wxChargeRecord.setOutTradeNo(out_trade_no);
        wxChargeRecord.setTransactionId(transcationCode);
        wxChargeRecord.setAttach(attach);
        wxChargeRecord.setCreateTime(new Date());
        wxChargeRecord.setIsDelete(Constants.OBJECT_NOT_DELETE);
        if (Constants.WX_PAY_TYPE_ZHIFU.equals(wxPayType)) {
            wxPayService.updateOrderAfterZhifu(orderIdOrUserId,wxChargeRecord);
        } else if (Constants.WX_PAY_TYPE_CHONGZHI.equals(wxPayType)) {
            wxPayService.updateOrderAfterChongzhi(orderIdOrUserId, totalFee,wxChargeRecord);
        }



        BaseResp baseResp = new BaseResp();
        baseResp.ok();
        return baseResp;
    }
}
