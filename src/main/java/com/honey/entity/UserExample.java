package com.honey.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UserExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public UserExample() {
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

        public Criteria andPhoneIsNull() {
            addCriterion("phone is null");
            return (Criteria) this;
        }

        public Criteria andPhoneIsNotNull() {
            addCriterion("phone is not null");
            return (Criteria) this;
        }

        public Criteria andPhoneEqualTo(String value) {
            addCriterion("phone =", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneNotEqualTo(String value) {
            addCriterion("phone <>", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneGreaterThan(String value) {
            addCriterion("phone >", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneGreaterThanOrEqualTo(String value) {
            addCriterion("phone >=", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneLessThan(String value) {
            addCriterion("phone <", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneLessThanOrEqualTo(String value) {
            addCriterion("phone <=", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneLike(String value) {
            addCriterion("phone like", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneNotLike(String value) {
            addCriterion("phone not like", value, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneIn(List<String> values) {
            addCriterion("phone in", values, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneNotIn(List<String> values) {
            addCriterion("phone not in", values, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneBetween(String value1, String value2) {
            addCriterion("phone between", value1, value2, "phone");
            return (Criteria) this;
        }

        public Criteria andPhoneNotBetween(String value1, String value2) {
            addCriterion("phone not between", value1, value2, "phone");
            return (Criteria) this;
        }

        public Criteria andNickNameIsNull() {
            addCriterion("nick_name is null");
            return (Criteria) this;
        }

        public Criteria andNickNameIsNotNull() {
            addCriterion("nick_name is not null");
            return (Criteria) this;
        }

        public Criteria andNickNameEqualTo(String value) {
            addCriterion("nick_name =", value, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameNotEqualTo(String value) {
            addCriterion("nick_name <>", value, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameGreaterThan(String value) {
            addCriterion("nick_name >", value, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameGreaterThanOrEqualTo(String value) {
            addCriterion("nick_name >=", value, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameLessThan(String value) {
            addCriterion("nick_name <", value, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameLessThanOrEqualTo(String value) {
            addCriterion("nick_name <=", value, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameLike(String value) {
            addCriterion("nick_name like", value, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameNotLike(String value) {
            addCriterion("nick_name not like", value, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameIn(List<String> values) {
            addCriterion("nick_name in", values, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameNotIn(List<String> values) {
            addCriterion("nick_name not in", values, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameBetween(String value1, String value2) {
            addCriterion("nick_name between", value1, value2, "nickName");
            return (Criteria) this;
        }

        public Criteria andNickNameNotBetween(String value1, String value2) {
            addCriterion("nick_name not between", value1, value2, "nickName");
            return (Criteria) this;
        }

        public Criteria andAvatarIsNull() {
            addCriterion("avatar is null");
            return (Criteria) this;
        }

        public Criteria andAvatarIsNotNull() {
            addCriterion("avatar is not null");
            return (Criteria) this;
        }

        public Criteria andAvatarEqualTo(String value) {
            addCriterion("avatar =", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarNotEqualTo(String value) {
            addCriterion("avatar <>", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarGreaterThan(String value) {
            addCriterion("avatar >", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarGreaterThanOrEqualTo(String value) {
            addCriterion("avatar >=", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarLessThan(String value) {
            addCriterion("avatar <", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarLessThanOrEqualTo(String value) {
            addCriterion("avatar <=", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarLike(String value) {
            addCriterion("avatar like", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarNotLike(String value) {
            addCriterion("avatar not like", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarIn(List<String> values) {
            addCriterion("avatar in", values, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarNotIn(List<String> values) {
            addCriterion("avatar not in", values, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarBetween(String value1, String value2) {
            addCriterion("avatar between", value1, value2, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarNotBetween(String value1, String value2) {
            addCriterion("avatar not between", value1, value2, "avatar");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdIsNull() {
            addCriterion("third_part_id is null");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdIsNotNull() {
            addCriterion("third_part_id is not null");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdEqualTo(String value) {
            addCriterion("third_part_id =", value, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdNotEqualTo(String value) {
            addCriterion("third_part_id <>", value, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdGreaterThan(String value) {
            addCriterion("third_part_id >", value, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdGreaterThanOrEqualTo(String value) {
            addCriterion("third_part_id >=", value, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdLessThan(String value) {
            addCriterion("third_part_id <", value, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdLessThanOrEqualTo(String value) {
            addCriterion("third_part_id <=", value, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdLike(String value) {
            addCriterion("third_part_id like", value, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdNotLike(String value) {
            addCriterion("third_part_id not like", value, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdIn(List<String> values) {
            addCriterion("third_part_id in", values, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdNotIn(List<String> values) {
            addCriterion("third_part_id not in", values, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdBetween(String value1, String value2) {
            addCriterion("third_part_id between", value1, value2, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartIdNotBetween(String value1, String value2) {
            addCriterion("third_part_id not between", value1, value2, "thirdPartId");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeIsNull() {
            addCriterion("third_part_type is null");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeIsNotNull() {
            addCriterion("third_part_type is not null");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeEqualTo(String value) {
            addCriterion("third_part_type =", value, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeNotEqualTo(String value) {
            addCriterion("third_part_type <>", value, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeGreaterThan(String value) {
            addCriterion("third_part_type >", value, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeGreaterThanOrEqualTo(String value) {
            addCriterion("third_part_type >=", value, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeLessThan(String value) {
            addCriterion("third_part_type <", value, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeLessThanOrEqualTo(String value) {
            addCriterion("third_part_type <=", value, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeLike(String value) {
            addCriterion("third_part_type like", value, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeNotLike(String value) {
            addCriterion("third_part_type not like", value, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeIn(List<String> values) {
            addCriterion("third_part_type in", values, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeNotIn(List<String> values) {
            addCriterion("third_part_type not in", values, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeBetween(String value1, String value2) {
            addCriterion("third_part_type between", value1, value2, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andThirdPartTypeNotBetween(String value1, String value2) {
            addCriterion("third_part_type not between", value1, value2, "thirdPartType");
            return (Criteria) this;
        }

        public Criteria andPlatformIdIsNull() {
            addCriterion("platform_id is null");
            return (Criteria) this;
        }

        public Criteria andPlatformIdIsNotNull() {
            addCriterion("platform_id is not null");
            return (Criteria) this;
        }

        public Criteria andPlatformIdEqualTo(Long value) {
            addCriterion("platform_id =", value, "platformId");
            return (Criteria) this;
        }

        public Criteria andPlatformIdNotEqualTo(Long value) {
            addCriterion("platform_id <>", value, "platformId");
            return (Criteria) this;
        }

        public Criteria andPlatformIdGreaterThan(Long value) {
            addCriterion("platform_id >", value, "platformId");
            return (Criteria) this;
        }

        public Criteria andPlatformIdGreaterThanOrEqualTo(Long value) {
            addCriterion("platform_id >=", value, "platformId");
            return (Criteria) this;
        }

        public Criteria andPlatformIdLessThan(Long value) {
            addCriterion("platform_id <", value, "platformId");
            return (Criteria) this;
        }

        public Criteria andPlatformIdLessThanOrEqualTo(Long value) {
            addCriterion("platform_id <=", value, "platformId");
            return (Criteria) this;
        }

        public Criteria andPlatformIdIn(List<Long> values) {
            addCriterion("platform_id in", values, "platformId");
            return (Criteria) this;
        }

        public Criteria andPlatformIdNotIn(List<Long> values) {
            addCriterion("platform_id not in", values, "platformId");
            return (Criteria) this;
        }

        public Criteria andPlatformIdBetween(Long value1, Long value2) {
            addCriterion("platform_id between", value1, value2, "platformId");
            return (Criteria) this;
        }

        public Criteria andPlatformIdNotBetween(Long value1, Long value2) {
            addCriterion("platform_id not between", value1, value2, "platformId");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyIsNull() {
            addCriterion("platform_key is null");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyIsNotNull() {
            addCriterion("platform_key is not null");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyEqualTo(String value) {
            addCriterion("platform_key =", value, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyNotEqualTo(String value) {
            addCriterion("platform_key <>", value, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyGreaterThan(String value) {
            addCriterion("platform_key >", value, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyGreaterThanOrEqualTo(String value) {
            addCriterion("platform_key >=", value, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyLessThan(String value) {
            addCriterion("platform_key <", value, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyLessThanOrEqualTo(String value) {
            addCriterion("platform_key <=", value, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyLike(String value) {
            addCriterion("platform_key like", value, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyNotLike(String value) {
            addCriterion("platform_key not like", value, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyIn(List<String> values) {
            addCriterion("platform_key in", values, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyNotIn(List<String> values) {
            addCriterion("platform_key not in", values, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyBetween(String value1, String value2) {
            addCriterion("platform_key between", value1, value2, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPlatformKeyNotBetween(String value1, String value2) {
            addCriterion("platform_key not between", value1, value2, "platformKey");
            return (Criteria) this;
        }

        public Criteria andPasswordIsNull() {
            addCriterion("password is null");
            return (Criteria) this;
        }

        public Criteria andPasswordIsNotNull() {
            addCriterion("password is not null");
            return (Criteria) this;
        }

        public Criteria andPasswordEqualTo(String value) {
            addCriterion("password =", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotEqualTo(String value) {
            addCriterion("password <>", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordGreaterThan(String value) {
            addCriterion("password >", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordGreaterThanOrEqualTo(String value) {
            addCriterion("password >=", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLessThan(String value) {
            addCriterion("password <", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLessThanOrEqualTo(String value) {
            addCriterion("password <=", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLike(String value) {
            addCriterion("password like", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotLike(String value) {
            addCriterion("password not like", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordIn(List<String> values) {
            addCriterion("password in", values, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotIn(List<String> values) {
            addCriterion("password not in", values, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordBetween(String value1, String value2) {
            addCriterion("password between", value1, value2, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotBetween(String value1, String value2) {
            addCriterion("password not between", value1, value2, "password");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeIsNull() {
            addCriterion("last_login_time is null");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeIsNotNull() {
            addCriterion("last_login_time is not null");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeEqualTo(Date value) {
            addCriterion("last_login_time =", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeNotEqualTo(Date value) {
            addCriterion("last_login_time <>", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeGreaterThan(Date value) {
            addCriterion("last_login_time >", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("last_login_time >=", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeLessThan(Date value) {
            addCriterion("last_login_time <", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeLessThanOrEqualTo(Date value) {
            addCriterion("last_login_time <=", value, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeIn(List<Date> values) {
            addCriterion("last_login_time in", values, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeNotIn(List<Date> values) {
            addCriterion("last_login_time not in", values, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeBetween(Date value1, Date value2) {
            addCriterion("last_login_time between", value1, value2, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTimeNotBetween(Date value1, Date value2) {
            addCriterion("last_login_time not between", value1, value2, "lastLoginTime");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeIsNull() {
            addCriterion("last_login_type is null");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeIsNotNull() {
            addCriterion("last_login_type is not null");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeEqualTo(String value) {
            addCriterion("last_login_type =", value, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeNotEqualTo(String value) {
            addCriterion("last_login_type <>", value, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeGreaterThan(String value) {
            addCriterion("last_login_type >", value, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeGreaterThanOrEqualTo(String value) {
            addCriterion("last_login_type >=", value, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeLessThan(String value) {
            addCriterion("last_login_type <", value, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeLessThanOrEqualTo(String value) {
            addCriterion("last_login_type <=", value, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeLike(String value) {
            addCriterion("last_login_type like", value, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeNotLike(String value) {
            addCriterion("last_login_type not like", value, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeIn(List<String> values) {
            addCriterion("last_login_type in", values, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeNotIn(List<String> values) {
            addCriterion("last_login_type not in", values, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeBetween(String value1, String value2) {
            addCriterion("last_login_type between", value1, value2, "lastLoginType");
            return (Criteria) this;
        }

        public Criteria andLastLoginTypeNotBetween(String value1, String value2) {
            addCriterion("last_login_type not between", value1, value2, "lastLoginType");
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

        public Criteria andStatusIsNull() {
            addCriterion("status is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("status is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(Integer value) {
            addCriterion("status =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(Integer value) {
            addCriterion("status <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(Integer value) {
            addCriterion("status >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("status >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(Integer value) {
            addCriterion("status <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(Integer value) {
            addCriterion("status <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<Integer> values) {
            addCriterion("status in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<Integer> values) {
            addCriterion("status not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(Integer value1, Integer value2) {
            addCriterion("status between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("status not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceIsNull() {
            addCriterion("coin_balance is null");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceIsNotNull() {
            addCriterion("coin_balance is not null");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceEqualTo(BigDecimal value) {
            addCriterion("coin_balance =", value, "coinBalance");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceNotEqualTo(BigDecimal value) {
            addCriterion("coin_balance <>", value, "coinBalance");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceGreaterThan(BigDecimal value) {
            addCriterion("coin_balance >", value, "coinBalance");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("coin_balance >=", value, "coinBalance");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceLessThan(BigDecimal value) {
            addCriterion("coin_balance <", value, "coinBalance");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("coin_balance <=", value, "coinBalance");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceIn(List<BigDecimal> values) {
            addCriterion("coin_balance in", values, "coinBalance");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceNotIn(List<BigDecimal> values) {
            addCriterion("coin_balance not in", values, "coinBalance");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("coin_balance between", value1, value2, "coinBalance");
            return (Criteria) this;
        }

        public Criteria andCoinBalanceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("coin_balance not between", value1, value2, "coinBalance");
            return (Criteria) this;
        }

        public Criteria andBalanceIsNull() {
            addCriterion("balance is null");
            return (Criteria) this;
        }

        public Criteria andBalanceIsNotNull() {
            addCriterion("balance is not null");
            return (Criteria) this;
        }

        public Criteria andBalanceEqualTo(BigDecimal value) {
            addCriterion("balance =", value, "balance");
            return (Criteria) this;
        }

        public Criteria andBalanceNotEqualTo(BigDecimal value) {
            addCriterion("balance <>", value, "balance");
            return (Criteria) this;
        }

        public Criteria andBalanceGreaterThan(BigDecimal value) {
            addCriterion("balance >", value, "balance");
            return (Criteria) this;
        }

        public Criteria andBalanceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("balance >=", value, "balance");
            return (Criteria) this;
        }

        public Criteria andBalanceLessThan(BigDecimal value) {
            addCriterion("balance <", value, "balance");
            return (Criteria) this;
        }

        public Criteria andBalanceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("balance <=", value, "balance");
            return (Criteria) this;
        }

        public Criteria andBalanceIn(List<BigDecimal> values) {
            addCriterion("balance in", values, "balance");
            return (Criteria) this;
        }

        public Criteria andBalanceNotIn(List<BigDecimal> values) {
            addCriterion("balance not in", values, "balance");
            return (Criteria) this;
        }

        public Criteria andBalanceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("balance between", value1, value2, "balance");
            return (Criteria) this;
        }

        public Criteria andBalanceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("balance not between", value1, value2, "balance");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanIsNull() {
            addCriterion("is_token_need_clean is null");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanIsNotNull() {
            addCriterion("is_token_need_clean is not null");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanEqualTo(Byte value) {
            addCriterion("is_token_need_clean =", value, "isTokenNeedClean");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanNotEqualTo(Byte value) {
            addCriterion("is_token_need_clean <>", value, "isTokenNeedClean");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanGreaterThan(Byte value) {
            addCriterion("is_token_need_clean >", value, "isTokenNeedClean");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanGreaterThanOrEqualTo(Byte value) {
            addCriterion("is_token_need_clean >=", value, "isTokenNeedClean");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanLessThan(Byte value) {
            addCriterion("is_token_need_clean <", value, "isTokenNeedClean");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanLessThanOrEqualTo(Byte value) {
            addCriterion("is_token_need_clean <=", value, "isTokenNeedClean");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanIn(List<Byte> values) {
            addCriterion("is_token_need_clean in", values, "isTokenNeedClean");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanNotIn(List<Byte> values) {
            addCriterion("is_token_need_clean not in", values, "isTokenNeedClean");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanBetween(Byte value1, Byte value2) {
            addCriterion("is_token_need_clean between", value1, value2, "isTokenNeedClean");
            return (Criteria) this;
        }

        public Criteria andIsTokenNeedCleanNotBetween(Byte value1, Byte value2) {
            addCriterion("is_token_need_clean not between", value1, value2, "isTokenNeedClean");
            return (Criteria) this;
        }

        public Criteria andWalletAddressIsNull() {
            addCriterion("wallet_address is null");
            return (Criteria) this;
        }

        public Criteria andWalletAddressIsNotNull() {
            addCriterion("wallet_address is not null");
            return (Criteria) this;
        }

        public Criteria andWalletAddressEqualTo(String value) {
            addCriterion("wallet_address =", value, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressNotEqualTo(String value) {
            addCriterion("wallet_address <>", value, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressGreaterThan(String value) {
            addCriterion("wallet_address >", value, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressGreaterThanOrEqualTo(String value) {
            addCriterion("wallet_address >=", value, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressLessThan(String value) {
            addCriterion("wallet_address <", value, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressLessThanOrEqualTo(String value) {
            addCriterion("wallet_address <=", value, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressLike(String value) {
            addCriterion("wallet_address like", value, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressNotLike(String value) {
            addCriterion("wallet_address not like", value, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressIn(List<String> values) {
            addCriterion("wallet_address in", values, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressNotIn(List<String> values) {
            addCriterion("wallet_address not in", values, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressBetween(String value1, String value2) {
            addCriterion("wallet_address between", value1, value2, "walletAddress");
            return (Criteria) this;
        }

        public Criteria andWalletAddressNotBetween(String value1, String value2) {
            addCriterion("wallet_address not between", value1, value2, "walletAddress");
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