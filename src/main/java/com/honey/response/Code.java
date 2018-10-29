package com.honey.response;

/**
 * Created by ZYL on 2018/4/26.
 */
public enum Code {
    // 1024以内, 同HTTP
    SUCCESS(200, "Success"),
    BAD_REQUEST(400, "错误的请求"),
    PAGE_ERROR(1001,"查询分页失败"),
    LIST_ERROR(1002,"列表查询失败"),
    QUERY_BY_PRIMARY_KEY_ERROR(1003,"通过主键查询失败"),
    DELETE_BY_PRIMARY_KEY_ERROR(1004,"通过主键删除失败"),
    OBJECT_NOT_EXIST(1005,"对象不存在"),
    OBJECT_HAS_BEEN_DELETE(1006,"对象已被删除"),
    OBJECT_NOT_EXIST_OR_IS_DELETE(1007,"对象不存在或已被删除"),
    ADD_OR_UPDATE_OBJECT_FAILED(1008,"保存失败"),
    OBJECT_UPDATE_STATUS_ERROR(1009,"更新对象失败，状态错误"),
    UPDATE_DEFAULT_ADDRESS_FAILED(1010,"更新默认地址失败"),
    USER_RECHARGE_ERROR(1011,"用户充值HNB失败，请确认"),
    REQUEST_PARAM_INCOMPLETE(1012,"上传参数不完整，请确认"),
    PLATFORM_USER_LOGIN_ERROR(1013,"用户名或密码错误,请确认"),
    USER_NOT_ENOUGH_ERROR(1014,"用户积分余额不足，请充值或更换支付方式！"),
    HAVE_NO_PRIVILEGE(1015,"你没有权限，无法进行此操作！"),
    SEARCH_NO_EXPRESS(1016,"没有找到物流信息！"),
    UPLOAD_IMAGE_FAILED(2000,"上传图片失败");
    ;

    private long code;
    private String message;

    Code(long code, String message) {
        this.code = code;
        this.message = message;
    }

    public long getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

}
