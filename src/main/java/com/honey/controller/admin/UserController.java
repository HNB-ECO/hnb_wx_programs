package com.honey.controller.admin;

import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.UserService;
import com.honey.util.CommonUtil;
import com.honey.util.Constants;
import com.honey.util.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2018/5/30.
 */

@Controller("adminUserController")
@RequestMapping("/admin/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 进入用户页面
     * @return
     */
    @RequestMapping(value = "/intoUserManage", method = RequestMethod.GET)
    public String intoUserManage(HttpServletRequest request){
        return "/user/list";
    }

    /**
     * 查询用户列表
     * @param pageNum 页数
     * @param pageSize 每页记录数
     * @param orderBy 排序条件
     * @param nickName 用户名称
     * @param platformId 平台ID
     * @param request
     * @return
     */
    @RequestMapping(value = "/getGoodsList", method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> getGoodsList(@RequestParam(value = "pageNum", defaultValue = Constants.DEFAULT_PAGE_NUM) Integer pageNum,
                                           @RequestParam(value = "pageSize", defaultValue = Constants.DEFAULT_PAGE_SIZE) Integer pageSize,
                                           @RequestParam(value = "orderBy", defaultValue = "id asc", required = false) String orderBy,
                                           @RequestParam(value = "nickName", required = false) String nickName,
                                           @RequestParam(value = "platformId", required = false) Long platformId,
                                           HttpServletRequest request) {
        try {
            platformId = CommonUtil.getPlatformId(request, platformId);
            return userService.getUserList(pageNum, pageSize, orderBy, platformId, nickName);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 通过用户ID查询用户信息
     * @param userId
     * @return
     */
    @RequestMapping(value = "/getUserInfo", method = RequestMethod.GET)
    @ResponseBody
    public Response getUserInfo(@RequestParam(value = "userId") Long userId){
        try {
            return userService.getUserInfoByUserId(userId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

    /**
     * 冻结用户
     * @param userId
     * @return
     */
    @RequestMapping(value = "/blockUser", method = RequestMethod.GET)
    @ResponseBody
    public Response blockUser(@RequestParam(value = "userId") String userId){
        try {
            return userService.blockUser(userId);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.QUERY_BY_PRIMARY_KEY_ERROR);
        }
    }

}
