package com.honey.controller.admin;

import com.honey.entity.Admin;
import com.honey.response.Response;
import com.honey.service.AdminService;
import com.honey.util.Constant;
import com.honey.util.Constants;
import com.honey.util.PageBean;
import org.aspectj.apache.bcel.generic.RET;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by ZYL on 2018/6/1.
 */
@Controller("adminAdminController")
@RequestMapping(value = "/admin/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    /**
     * 跳转到管理员管理页面
     * @return
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public String list(HttpServletRequest request){
        return "/superAdmin/list";
    }

    /**
     * 查询用户分页列表
     * @param pageNum
     * @param pageSize
     * @param orderBy
     * @param userName
     * @return
     */
    @RequestMapping(value = "/pageList",method = RequestMethod.GET)
    @ResponseBody
    public Response<PageBean> pageList (@RequestParam(value = "pageNum",defaultValue = Constants.DEFAULT_PAGE_NUM)Integer pageNum,
                                        @RequestParam(value = "pageSize",defaultValue = Constants.DEFAULT_PAGE_SIZE) Integer pageSize,
                                        @RequestParam(value = "orderBy",defaultValue = "id desc",required = false) String orderBy,
                                        @RequestParam(value = "userName",required = false) String userName){
        return adminService.pageList(pageNum,pageSize,orderBy,userName);
    }

    /**
     * 新建管理员账号
     * @param admin
     * @return
     */
    @RequestMapping(value = "/createAdmin",method = RequestMethod.POST)
    @ResponseBody
    public Response createAdmin(Admin admin){
        return adminService.createUser(admin);
    }


    /**
     * 冻结账户
     * @param adminId
     * @return
     */
    @RequestMapping(value = "/blockAdmin",method = RequestMethod.POST)
    @ResponseBody
    public Response blockAdmin(@RequestParam(value = "adminId") String adminId){
        Integer status = Constants.USER_STATUS_BLOCK;//冻结账户
        return adminService.updateStatus(adminId,status);
    }

    /**
     * 删除账户
     * @param adminIds
     * @return
     */
    @RequestMapping(value = "/deleteAdmin",method = RequestMethod.POST)
    @ResponseBody
    public Response deleteAdmin(@RequestParam(value = "adminId") String adminIds){
        Integer status = Constants.USER_STATUS_DELETE;
        return adminService.updateStatus(adminIds,status);
    }

    /**
     * 重置密码
     * @param adminId
     * @return
     */
    @RequestMapping(value = "/resetPassword",method = RequestMethod.POST)
    @ResponseBody
    public Response resetPassword(@RequestParam(value = "adminId") Long adminId){
        String password = Constants.DEFAULT_PASSWORD;
        return  adminService.updateAdmin(adminId,password);
    }

    /**
     * 通过主键查询管理员信息
     * @param adminId
     * @return
     */
    @RequestMapping(value = "/adminDetail",method =  RequestMethod.GET)
    @ResponseBody
    public Response adminDetail(@RequestParam(value = "adminId") Long adminId){
        return adminService.getAdminById(adminId);
    }
}
