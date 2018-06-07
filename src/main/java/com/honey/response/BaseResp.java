package com.honey.response;

import com.honey.exception.ResException;


public class BaseResp {

    public static final int SUCCESS = 0;
    public static final int FAIL = 1;
    public static final int CHECK_SUM_ERROR = 2;

   /* public static Logger logger = Logger.getLogger(BaseResp.class);*/

    private int errcode = SUCCESS;
    private String errmsg = "ok";
    private Object data;

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public int getErrcode() {
        return errcode;
    }

    public String getErrmsg() {
        return errmsg;
    }

    public void ok() {
        this.errcode = SUCCESS;
        this.errmsg = "success";
    }

    public void fail(int errcode, String errmsg) {
        this.errcode = errcode;
        this.errmsg = errmsg;
    }

    public BaseResp bindException(ResException e) {
        fail(e.getErrcode(), e.getErrmsg());
        return this;
    }

    public void nameOrPasswordIsNull() {
        fail(10001, "账户或者密码为空！");
    }

    public void curriculumIdNull() {
        fail(10002, "scheduleId为空！");
    }

    public void priceNull() {
        fail(10003, "price为空！");
    }

    public void userIdNull() {
        fail(10004, "用户id为空!");
    }

    public void customerNotExist() {
        fail(10005, "用户不存在!");
    }

    public void shopIdNull() {
        fail(10006, "shopId为空");
    }

    public void fileNull() {
        fail(10007, "图片为空!");
    }

    public void notLand() {
        fail(10008, "请先登陆!");
    }

    public void phoneNotExist() {
        fail(10009, "账号错误!");
    }

    public void passwordNotExist() {
        fail(10010, "密码错误!");
    }

    public void Reservation() {
        fail(10011, "你已预约!");
    }

    public void theAppointmentIsFull() {
        fail(10012, "预约已满!");
    }

    public void codeIsError() {
        fail(10013, "验证码错误!");
    }

    public void customerExist() {
        fail(10014, "用户已存在!");
    }

    public void codeIsNull() {
        fail(10015, "储存验证码为空!");
    }

    public void notReservation() {
        fail(10016, "你还没有预约!");
    }

    public void reservationNotExist() {
        fail(10017, "预约不存在!");
    }

    public void isAdmission() {
        fail(10018, "你已入场,二维码失效!");
    }

    public void curriculumNotExist() {
        fail(10019, "课程不存在!");
    }

    public void oldPasswordIsError() {
        fail(10020, "原始密码不正确!");
    }

    public void bodySideIsNull() {
        fail(10021, "你已经没有体侧次数!");
    }

    public void bodySideNotExist() {
        fail(10022, "这节体侧未测!");
    }

    public void bodySideOneAlreadyExists() {
        fail(10023, "第一节已经体侧过了!");
    }

    public void bodySideTwoAlreadyExists() {
        fail(10024, "第二节已经体侧过了!");
    }

    public void bodySideThreeAlreadyExists() {
        fail(10025, "第三节已经体侧过了!");
    }

    public void curriculumIsInvalid() {
        fail(10026, "课程已失效,如需上课请买课!");
    }

    public void cookieIsNull() {
        fail(10027, "保存cookie丢失!");
    }

    public void suceduleIsNull() {
        fail(10028, "当天没有预约课程!");
    }

    public void lessMemberInsufficient() {
        fail(10029, "未达到最低开课人数,不能开课!");
    }

    public void OrderIsNull() {
        fail(10030, "支付订单出错,订单不存在!");
    }

    public void OrderListIsNull() {
        fail(10031, "你还没有订单!");
    }

    public void warehouseIsNull() {
        fail(10032, "舱序列号错误!");
    }

    public void orderIsNull() {
        fail(10033, "订单不存在!");
    }

    public void isReservation() {
        fail(10034, "此舱已被预约!");
    }

    public void isActual() {
        fail(10035, "舱在使用中!");
    }

    public void runfundIsError() {
        fail(10036, "退款失败!");
    }

    public void priceIsError() {
        fail(10037, "输入价格有误!");
    }

    public void warehouseNameIsExists() {
        fail(10038, "输入舱序列号有误!");
    }

    public void hasReservation() {
        fail(10039, "不能多次预约!");
    }

    public void communityIsNull() {
        fail(10040, "帖子不存在!");
    }

    public void communityCommentIsNull() {
        fail(10041, "评论不存在!");
    }

    public void customerIsError() {
        fail(10042, "资料不完整!");
    }

    public void thumbsUpIsRrror() {
        fail(10043, "取消失败!");
    }

    public void commentNumberIsError() {
        fail(10044, "删除失败!");
    }

    public void communityPushIsNull() {
        fail(10045, "没有内容!");
    }

    public void warehouseHasReservation() {
        fail(10046, "健身舱已被预约!");
    }

    public void warehouseHasInUse() {
        fail(10047, "健身舱正在使用中!");
    }

    public void mediaIsNull() {
        fail(10048, "方案不存在或者过期!");
    }

    public void refundError() {
        fail(10049, "还有未支付的订单,不能退款!");
    }

    public void functionError() {
        fail(10050, "操作失败！");
    }

    public void calendarOrderIsNull() {
        fail(10051, "课程不存在!");
    }

    public void employeeIsNull() {
        fail(10052, "教练不存在或者错误!");
    }

    public void subjectFeeIsNull() {
        fail(10053, "价格不存在!");
    }

    public void discountCardIdNull() {
        fail(10054, "打折卡不存在");
    }

    public void isNotYourClass() {
        fail(10055, "不是你的课程!");
    }
}