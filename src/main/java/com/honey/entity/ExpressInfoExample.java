package com.honey.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ExpressInfoExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public ExpressInfoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Long value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Long value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Long value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Long value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Long value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Long value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Long> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Long> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Long value1, Long value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Long value1, Long value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdIsNull() {
            addCriterion("work_order_id is null");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdIsNotNull() {
            addCriterion("work_order_id is not null");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdEqualTo(Long value) {
            addCriterion("work_order_id =", value, "workOrderId");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdNotEqualTo(Long value) {
            addCriterion("work_order_id <>", value, "workOrderId");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdGreaterThan(Long value) {
            addCriterion("work_order_id >", value, "workOrderId");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdGreaterThanOrEqualTo(Long value) {
            addCriterion("work_order_id >=", value, "workOrderId");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdLessThan(Long value) {
            addCriterion("work_order_id <", value, "workOrderId");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdLessThanOrEqualTo(Long value) {
            addCriterion("work_order_id <=", value, "workOrderId");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdIn(List<Long> values) {
            addCriterion("work_order_id in", values, "workOrderId");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdNotIn(List<Long> values) {
            addCriterion("work_order_id not in", values, "workOrderId");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdBetween(Long value1, Long value2) {
            addCriterion("work_order_id between", value1, value2, "workOrderId");
            return (Criteria) this;
        }

        public Criteria andWorkOrderIdNotBetween(Long value1, Long value2) {
            addCriterion("work_order_id not between", value1, value2, "workOrderId");
            return (Criteria) this;
        }

        public Criteria andExpCodeIsNull() {
            addCriterion("exp_code is null");
            return (Criteria) this;
        }

        public Criteria andExpCodeIsNotNull() {
            addCriterion("exp_code is not null");
            return (Criteria) this;
        }

        public Criteria andExpCodeEqualTo(String value) {
            addCriterion("exp_code =", value, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeNotEqualTo(String value) {
            addCriterion("exp_code <>", value, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeGreaterThan(String value) {
            addCriterion("exp_code >", value, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeGreaterThanOrEqualTo(String value) {
            addCriterion("exp_code >=", value, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeLessThan(String value) {
            addCriterion("exp_code <", value, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeLessThanOrEqualTo(String value) {
            addCriterion("exp_code <=", value, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeLike(String value) {
            addCriterion("exp_code like", value, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeNotLike(String value) {
            addCriterion("exp_code not like", value, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeIn(List<String> values) {
            addCriterion("exp_code in", values, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeNotIn(List<String> values) {
            addCriterion("exp_code not in", values, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeBetween(String value1, String value2) {
            addCriterion("exp_code between", value1, value2, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpCodeNotBetween(String value1, String value2) {
            addCriterion("exp_code not between", value1, value2, "expCode");
            return (Criteria) this;
        }

        public Criteria andExpNoIsNull() {
            addCriterion("exp_no is null");
            return (Criteria) this;
        }

        public Criteria andExpNoIsNotNull() {
            addCriterion("exp_no is not null");
            return (Criteria) this;
        }

        public Criteria andExpNoEqualTo(String value) {
            addCriterion("exp_no =", value, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoNotEqualTo(String value) {
            addCriterion("exp_no <>", value, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoGreaterThan(String value) {
            addCriterion("exp_no >", value, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoGreaterThanOrEqualTo(String value) {
            addCriterion("exp_no >=", value, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoLessThan(String value) {
            addCriterion("exp_no <", value, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoLessThanOrEqualTo(String value) {
            addCriterion("exp_no <=", value, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoLike(String value) {
            addCriterion("exp_no like", value, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoNotLike(String value) {
            addCriterion("exp_no not like", value, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoIn(List<String> values) {
            addCriterion("exp_no in", values, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoNotIn(List<String> values) {
            addCriterion("exp_no not in", values, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoBetween(String value1, String value2) {
            addCriterion("exp_no between", value1, value2, "expNo");
            return (Criteria) this;
        }

        public Criteria andExpNoNotBetween(String value1, String value2) {
            addCriterion("exp_no not between", value1, value2, "expNo");
            return (Criteria) this;
        }

        public Criteria andIsSignIsNull() {
            addCriterion("is_sign is null");
            return (Criteria) this;
        }

        public Criteria andIsSignIsNotNull() {
            addCriterion("is_sign is not null");
            return (Criteria) this;
        }

        public Criteria andIsSignEqualTo(String value) {
            addCriterion("is_sign =", value, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignNotEqualTo(String value) {
            addCriterion("is_sign <>", value, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignGreaterThan(String value) {
            addCriterion("is_sign >", value, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignGreaterThanOrEqualTo(String value) {
            addCriterion("is_sign >=", value, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignLessThan(String value) {
            addCriterion("is_sign <", value, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignLessThanOrEqualTo(String value) {
            addCriterion("is_sign <=", value, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignLike(String value) {
            addCriterion("is_sign like", value, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignNotLike(String value) {
            addCriterion("is_sign not like", value, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignIn(List<String> values) {
            addCriterion("is_sign in", values, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignNotIn(List<String> values) {
            addCriterion("is_sign not in", values, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignBetween(String value1, String value2) {
            addCriterion("is_sign between", value1, value2, "isSign");
            return (Criteria) this;
        }

        public Criteria andIsSignNotBetween(String value1, String value2) {
            addCriterion("is_sign not between", value1, value2, "isSign");
            return (Criteria) this;
        }

        public Criteria andExpNameIsNull() {
            addCriterion("exp_name is null");
            return (Criteria) this;
        }

        public Criteria andExpNameIsNotNull() {
            addCriterion("exp_name is not null");
            return (Criteria) this;
        }

        public Criteria andExpNameEqualTo(String value) {
            addCriterion("exp_name =", value, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameNotEqualTo(String value) {
            addCriterion("exp_name <>", value, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameGreaterThan(String value) {
            addCriterion("exp_name >", value, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameGreaterThanOrEqualTo(String value) {
            addCriterion("exp_name >=", value, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameLessThan(String value) {
            addCriterion("exp_name <", value, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameLessThanOrEqualTo(String value) {
            addCriterion("exp_name <=", value, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameLike(String value) {
            addCriterion("exp_name like", value, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameNotLike(String value) {
            addCriterion("exp_name not like", value, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameIn(List<String> values) {
            addCriterion("exp_name in", values, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameNotIn(List<String> values) {
            addCriterion("exp_name not in", values, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameBetween(String value1, String value2) {
            addCriterion("exp_name between", value1, value2, "expName");
            return (Criteria) this;
        }

        public Criteria andExpNameNotBetween(String value1, String value2) {
            addCriterion("exp_name not between", value1, value2, "expName");
            return (Criteria) this;
        }

        public Criteria andExpSiteIsNull() {
            addCriterion("exp_site is null");
            return (Criteria) this;
        }

        public Criteria andExpSiteIsNotNull() {
            addCriterion("exp_site is not null");
            return (Criteria) this;
        }

        public Criteria andExpSiteEqualTo(String value) {
            addCriterion("exp_site =", value, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteNotEqualTo(String value) {
            addCriterion("exp_site <>", value, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteGreaterThan(String value) {
            addCriterion("exp_site >", value, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteGreaterThanOrEqualTo(String value) {
            addCriterion("exp_site >=", value, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteLessThan(String value) {
            addCriterion("exp_site <", value, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteLessThanOrEqualTo(String value) {
            addCriterion("exp_site <=", value, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteLike(String value) {
            addCriterion("exp_site like", value, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteNotLike(String value) {
            addCriterion("exp_site not like", value, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteIn(List<String> values) {
            addCriterion("exp_site in", values, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteNotIn(List<String> values) {
            addCriterion("exp_site not in", values, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteBetween(String value1, String value2) {
            addCriterion("exp_site between", value1, value2, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpSiteNotBetween(String value1, String value2) {
            addCriterion("exp_site not between", value1, value2, "expSite");
            return (Criteria) this;
        }

        public Criteria andExpPhoneIsNull() {
            addCriterion("exp_phone is null");
            return (Criteria) this;
        }

        public Criteria andExpPhoneIsNotNull() {
            addCriterion("exp_phone is not null");
            return (Criteria) this;
        }

        public Criteria andExpPhoneEqualTo(String value) {
            addCriterion("exp_phone =", value, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneNotEqualTo(String value) {
            addCriterion("exp_phone <>", value, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneGreaterThan(String value) {
            addCriterion("exp_phone >", value, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneGreaterThanOrEqualTo(String value) {
            addCriterion("exp_phone >=", value, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneLessThan(String value) {
            addCriterion("exp_phone <", value, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneLessThanOrEqualTo(String value) {
            addCriterion("exp_phone <=", value, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneLike(String value) {
            addCriterion("exp_phone like", value, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneNotLike(String value) {
            addCriterion("exp_phone not like", value, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneIn(List<String> values) {
            addCriterion("exp_phone in", values, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneNotIn(List<String> values) {
            addCriterion("exp_phone not in", values, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneBetween(String value1, String value2) {
            addCriterion("exp_phone between", value1, value2, "expPhone");
            return (Criteria) this;
        }

        public Criteria andExpPhoneNotBetween(String value1, String value2) {
            addCriterion("exp_phone not between", value1, value2, "expPhone");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusIsNull() {
            addCriterion("delivery_status is null");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusIsNotNull() {
            addCriterion("delivery_status is not null");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusEqualTo(String value) {
            addCriterion("delivery_status =", value, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusNotEqualTo(String value) {
            addCriterion("delivery_status <>", value, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusGreaterThan(String value) {
            addCriterion("delivery_status >", value, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusGreaterThanOrEqualTo(String value) {
            addCriterion("delivery_status >=", value, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusLessThan(String value) {
            addCriterion("delivery_status <", value, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusLessThanOrEqualTo(String value) {
            addCriterion("delivery_status <=", value, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusLike(String value) {
            addCriterion("delivery_status like", value, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusNotLike(String value) {
            addCriterion("delivery_status not like", value, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusIn(List<String> values) {
            addCriterion("delivery_status in", values, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusNotIn(List<String> values) {
            addCriterion("delivery_status not in", values, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusBetween(String value1, String value2) {
            addCriterion("delivery_status between", value1, value2, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andDeliveryStatusNotBetween(String value1, String value2) {
            addCriterion("delivery_status not between", value1, value2, "deliveryStatus");
            return (Criteria) this;
        }

        public Criteria andExpInfoIsNull() {
            addCriterion("exp_info is null");
            return (Criteria) this;
        }

        public Criteria andExpInfoIsNotNull() {
            addCriterion("exp_info is not null");
            return (Criteria) this;
        }

        public Criteria andExpInfoEqualTo(String value) {
            addCriterion("exp_info =", value, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoNotEqualTo(String value) {
            addCriterion("exp_info <>", value, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoGreaterThan(String value) {
            addCriterion("exp_info >", value, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoGreaterThanOrEqualTo(String value) {
            addCriterion("exp_info >=", value, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoLessThan(String value) {
            addCriterion("exp_info <", value, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoLessThanOrEqualTo(String value) {
            addCriterion("exp_info <=", value, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoLike(String value) {
            addCriterion("exp_info like", value, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoNotLike(String value) {
            addCriterion("exp_info not like", value, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoIn(List<String> values) {
            addCriterion("exp_info in", values, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoNotIn(List<String> values) {
            addCriterion("exp_info not in", values, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoBetween(String value1, String value2) {
            addCriterion("exp_info between", value1, value2, "expInfo");
            return (Criteria) this;
        }

        public Criteria andExpInfoNotBetween(String value1, String value2) {
            addCriterion("exp_info not between", value1, value2, "expInfo");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNull() {
            addCriterion("update_time is null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNotNull() {
            addCriterion("update_time is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeEqualTo(Date value) {
            addCriterion("update_time =", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotEqualTo(Date value) {
            addCriterion("update_time <>", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThan(Date value) {
            addCriterion("update_time >", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("update_time >=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThan(Date value) {
            addCriterion("update_time <", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThanOrEqualTo(Date value) {
            addCriterion("update_time <=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIn(List<Date> values) {
            addCriterion("update_time in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotIn(List<Date> values) {
            addCriterion("update_time not in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeBetween(Date value1, Date value2) {
            addCriterion("update_time between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotBetween(Date value1, Date value2) {
            addCriterion("update_time not between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andIsDeleteIsNull() {
            addCriterion("is_delete is null");
            return (Criteria) this;
        }

        public Criteria andIsDeleteIsNotNull() {
            addCriterion("is_delete is not null");
            return (Criteria) this;
        }

        public Criteria andIsDeleteEqualTo(Integer value) {
            addCriterion("is_delete =", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteNotEqualTo(Integer value) {
            addCriterion("is_delete <>", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteGreaterThan(Integer value) {
            addCriterion("is_delete >", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteGreaterThanOrEqualTo(Integer value) {
            addCriterion("is_delete >=", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteLessThan(Integer value) {
            addCriterion("is_delete <", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteLessThanOrEqualTo(Integer value) {
            addCriterion("is_delete <=", value, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteIn(List<Integer> values) {
            addCriterion("is_delete in", values, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteNotIn(List<Integer> values) {
            addCriterion("is_delete not in", values, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteBetween(Integer value1, Integer value2) {
            addCriterion("is_delete between", value1, value2, "isDelete");
            return (Criteria) this;
        }

        public Criteria andIsDeleteNotBetween(Integer value1, Integer value2) {
            addCriterion("is_delete not between", value1, value2, "isDelete");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}