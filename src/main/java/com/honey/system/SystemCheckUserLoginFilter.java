package com.honey.system;


import com.honey.util.DataUtils;
import org.apache.poi.util.StringUtil;
import org.springframework.http.HttpMethod;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by ZYL on 2018/5/28.
 * 用户登录及地址拦截器
 */
public class SystemCheckUserLoginFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

        final HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        //不需要过滤的连接
        Set<String> ignoredUrls = new HashSet<>();
        String url = request.getServletPath();//路径

        ignoredUrls.addAll(Arrays.asList(new String [] {"/admin/index/toLogin","/admin/index/login"}));

        // 不过滤OPTIONS请求
        if (request.getMethod().equalsIgnoreCase(HttpMethod.OPTIONS.toString())) {
            chain.doFilter(req, res);
            return;
        }

        //session是否已过期
        Integer type = (Integer) request.getSession().getAttribute("type");
        if(!ignoredUrls.contains(url)&&!url.startsWith("/webservice") ){
            if(DataUtils.isNullOrEmpty(type)){
                response.sendRedirect(request.getContextPath()+"/admin/index/toLogin");
                return;
            }
        }
        chain.doFilter(req,res);
    }
}
