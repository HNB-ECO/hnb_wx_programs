package com.honey.service.impl;

import com.honey.mapper.ExpressCompanyMapper;
import com.honey.response.Response;
import com.honey.service.ExpressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/6/1.
 */
@Service
public class ExpressServiceImpl implements ExpressService{

    @Autowired
    private ExpressCompanyMapper expressCompanyMapper;

    @Override
    public Response getExpressCompanySelect() {
        List<Map<String,Object>> list = expressCompanyMapper.getExpressCompanySelect();
        return new Response(list);
    }
}
