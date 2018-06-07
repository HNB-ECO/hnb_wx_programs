package com.honey.service;

import com.honey.entity.Banner;
import com.honey.response.Response;
import com.honey.util.PageBean;

/**
 * Created by Administrator on 2018/5/18.
 */
public interface BannerService {

    public Response<PageBean> getPlatformBanners(Integer pageNum, Integer pageSize,String orderBy, Long platformId, Integer isDelete);

    public Response getBannerInfoByBannerId(Long bannerId);

    public Response add(Banner banner,Long platformId);

    public Response update(Banner banner);

    public Response delete(String bannerId);
}
