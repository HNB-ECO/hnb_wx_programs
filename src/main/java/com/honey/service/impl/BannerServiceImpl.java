package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.Banner;
import com.honey.entity.BannerExample;
import com.honey.entity.GoodsType;
import com.honey.mapper.BannerMapper;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.BannerService;
import com.honey.util.Constants;
import com.honey.util.DataUtils;
import com.honey.util.PageBean;
import com.honey.util.PageBeanExtra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


/**
 * Created by Administrator on 2018/5/18.
 */

@Service
public class BannerServiceImpl implements BannerService {

    @Autowired
    private BannerMapper bannerMapper;

    /**
     * 查询活动分页列表
     *
     * @param pageNum    页数
     * @param pageSize   每页记录数
     * @param orderBy    排序条件
     * @param platformId 平台ID
     * @param isDelete   是否被删除
     * @return
     */
    public Response<PageBean> getPlatformBanners(Integer pageNum, Integer pageSize, String orderBy, Long platformId, Integer isDelete) {
        PageHelper.startPage(pageNum, pageSize);
        List<Banner> list = null;
        Integer all = 0;
        BannerExample example = new BannerExample();
        BannerExample.Criteria criteria = example.createCriteria();
        if (!DataUtils.isNullOrEmpty(platformId)) {
            criteria.andPlatformIdEqualTo(platformId);
        }
        if (!DataUtils.isNullOrEmpty(isDelete)) {
            criteria.andIsDeleteEqualTo(isDelete);
        }
        if (!DataUtils.isNullOrEmpty(orderBy)) {
            example.setOrderByClause(orderBy);
        }
        list = bannerMapper.selectByExample(example);
        all = bannerMapper.countByExample(example);

        return new Response(new PageBeanExtra(list, all.longValue()));
    }

    /**
     * 通过主键查询
     * @param bannerId
     * @return
     */
    public Response getBannerInfoByBannerId(Long bannerId) {
        Banner banner = bannerMapper.selectByPrimaryKey(bannerId);
        //判断对象是否不存在或者已经被删除
        if(DataUtils.isNullOrEmpty(banner)||banner.getIsDelete()== Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        return new Response(banner);
    }

    /**
     * 增加活动
     * @param banner 活动
     * @param platformId 平台ID
     * @return
     */
    public Response add(Banner banner, Long platformId) {
        if (DataUtils.isNullOrEmpty(banner.getBannerName()) ||
                DataUtils.isNullOrEmpty(banner.getPlatformId()) ||
                DataUtils.isNullOrEmpty(banner.getBannerUrl())||
                DataUtils.isNullOrEmpty(banner.getNote())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }
        banner.setPlatformId(platformId);
        banner.setCreateTime(new Date());
        banner.setUpdateTime(new Date());
        banner.setIsDelete(Constants.OBJECT_NOT_DELETE);
        bannerMapper.insert(banner);
        return new Response(Code.SUCCESS);
    }

    /**
     * 更新活动
     * @param banner 活动
     * @return
     */
    public Response update(Banner banner) {
        if (DataUtils.isNullOrEmpty(banner.getBannerName()) ||
                DataUtils.isNullOrEmpty(banner.getPlatformId()) ||
                DataUtils.isNullOrEmpty(banner.getBannerUrl())||
                DataUtils.isNullOrEmpty(banner.getNote())) {
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        }
        banner.setUpdateTime(new Date());
        bannerMapper.updateByPrimaryKeySelective(banner);
        return new Response(Code.SUCCESS);
    }

    /**
     * 删除活动
     * @param bannerId 活动ID
     * @return
     */
    public Response delete(String bannerId) {
        String [] ids = bannerId.contains(",")?bannerId.split(","):new String [] {bannerId};
        for (String id : ids){
            Banner banner = new Banner();
            banner.setId(Long.valueOf(id));
            banner.setIsDelete(Constants.OBJECT_IS_DELETE);
            banner.setUpdateTime(new Date());
            bannerMapper.updateByPrimaryKeySelective(banner);
        }
        return new Response(Code.SUCCESS);
    }
}
