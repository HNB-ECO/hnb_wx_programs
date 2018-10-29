package com.honey.pojo.request;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Created by ZYL on 2018/5/3.
 * 创建订单时接收前台传递参数
 */
public class CreateOrderRequest implements Serializable{

    private BigDecimal totalPrice;

    private BigDecimal totalCoin;

    private String paymentType;

    private String platformId;

    private String leaveMessage;

    private Long addressId;

    private String address;//地址

    private Long userId;

    private Long orderId;

    private Long goodId;

    private Long goodDetailId;

    private Integer amount;

    private String contactor;

    private String phone;

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal getTotalCoin() {
        return totalCoin;
    }

    public void setTotalCoin(BigDecimal totalCoin) {
        this.totalCoin = totalCoin;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getPlatformId() {
        return platformId;
    }

    public void setPlatformId(String platformId) {
        this.platformId = platformId;
    }

    public String getLeaveMessage() {
        return leaveMessage;
    }

    public void setLeaveMessage(String leaveMessage) {
        this.leaveMessage = leaveMessage;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getGoodId() {
        return goodId;
    }

    public void setGoodId(Long goodId) {
        this.goodId = goodId;
    }

    public Long getGoodDetailId() {
        return goodDetailId;
    }

    public void setGoodDetailId(Long goodDetailId) {
        this.goodDetailId = goodDetailId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactor() {
        return contactor;
    }

    public void setContactor(String contactor) {
        this.contactor = contactor;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
