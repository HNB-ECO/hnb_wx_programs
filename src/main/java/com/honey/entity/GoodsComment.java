package com.honey.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class GoodsComment {
    private Long id;

    private Long userId;

    private Long goodsId;

    private Integer score;

    private Long goodEvaluate;

    private Long normalEvaluate;

    private Long badEvaluate;

    private String content;

    private Integer isAnonymous;

    private String imageUrl;

    private Integer isDelete;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private Date createTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private Date updateTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Long goodsId) {
        this.goodsId = goodsId;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Long getGoodEvaluate() {
        return goodEvaluate;
    }

    public void setGoodEvaluate(Long goodEvaluate) {
        this.goodEvaluate = goodEvaluate;
    }

    public Long getNormalEvaluate() {
        return normalEvaluate;
    }

    public void setNormalEvaluate(Long normalEvaluate) {
        this.normalEvaluate = normalEvaluate;
    }

    public Long getBadEvaluate() {
        return badEvaluate;
    }

    public void setBadEvaluate(Long badEvaluate) {
        this.badEvaluate = badEvaluate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Integer getIsAnonymous() {
        return isAnonymous;
    }

    public void setIsAnonymous(Integer isAnonymous) {
        this.isAnonymous = isAnonymous;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl == null ? null : imageUrl.trim();
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}