package com.honey.controller.webservice;

import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.util.CommonUtil;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/webservice/openId")
public class GetOpenIdController {

    @RequestMapping(value = "/getOpenId", method = RequestMethod.GET)
    @ResponseBody
    public Response getOpenId(@RequestParam(value = "code") String code) {

        System.out.println(code);
        String content = null;
        Map map = new HashMap();
        ObjectMapper mapper = new ObjectMapper();

        long returnCode = Code.SUCCESS.getCode();

        String msg = "";

        // 从微信端传过来的用户的code
        // 调用下面的方法得到openid
        String openId = CommonUtil.getOpenIdMethod(code);
        if (StringUtils.isBlank(openId)) {
            returnCode = Code.OBJECT_NOT_EXIST.getCode();
            msg = "获取到openId为空";
        } else {
            // openID中间有斜杠，去掉
            openId = openId.replace("\"", "").trim();
            System.out.println(openId);
        }

        try {
            map.put("openId", openId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response(returnCode, msg, map);

    }

}
