package com.honey.util;

import java.math.BigDecimal;

/**
 * 下单时的价格
 * Created by JYDASHEN on 16/7/16.
 */
public class Price {

    private BigDecimal originalPrice;  //原价

    private BigDecimal discountPrice;  //折后价格

    private BigDecimal totalPrice;     //总价

    private BigDecimal quickPrice;     //加�?�金�?

    private Integer days;           //预计完成天数

    private Integer use;     //是否能使用优惠券

    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }

    public BigDecimal getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(BigDecimal discountPrice) {
        this.discountPrice = discountPrice;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal getQuickPrice() {
        return quickPrice;
    }

    public void setQuickPrice(BigDecimal quickPrice) {
        this.quickPrice = quickPrice;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public Integer getUse() {
        return use;
    }

    public void setUse(Integer use) {
        this.use = use;
    }
}
