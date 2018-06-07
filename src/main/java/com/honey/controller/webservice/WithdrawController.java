package com.honey.controller.webservice;

import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.WithdrawService;
import com.honey.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

/**
 * Created by Administrator on 2018/6/1.
 */
@RestController
@RequestMapping(value = "/webservice/withdraw")
public class WithdrawController {

    @Autowired
    private WithdrawService withdrawService;

    /**
     * 提交提币申请
     * @param userId
     * @return
     */
    @RequestMapping(value = "/applyWithdraw", method = RequestMethod.POST)
    @ResponseBody
    public Response applyWithdraw(@RequestParam(value = "userId") Long userId,
                                  @RequestParam(value = "applyAmount") BigDecimal applyAmount){
        try {
            return withdrawService.applyWithdraw(userId, applyAmount);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }
}
