package com.honey.controller.admin;

import com.honey.entity.Admin;
import com.honey.entity.AdminMenu;
import com.honey.entity.Goods;
import com.honey.entity.Platform;
import com.honey.pojo.response.LineChartData;
import com.honey.pojo.response.LineCharPo;
import com.honey.pojo.response.PieCharPo;
import com.honey.pojo.response.PieChartData;
import com.honey.response.Response;
import com.honey.service.*;
import com.honey.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by ZYL on 2018/5/16.
 */
@Controller
@RequestMapping(value = "/admin/index")
public class IndexController {

    @Autowired
    private PlatformService platformService;

/*    @Autowired
    private AdminService adminService;*/

    @Autowired
    private AdminMenuService adminMenuService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private GoodsService goodsService;

    @Autowired
    private IndexService indexService;

    /**
     * 进入登录页面
     * @return
     */
    @RequestMapping(value = "/toLogin")
    public String toLogin(){
        return "/login";
    }

    /**
     * 进入管理员登录页面
     * @return
     */
    @RequestMapping(value = "/toAdminLogin")
    public String toAdminLogin(){
        return "/adminLogin";
    }

    /**
     * 登录
     * @param userName
     * @param password
     * @return
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Response login(@RequestParam(value ="userName") String userName,
                          @RequestParam(value ="password") String password,HttpServletRequest request){
        return indexService.login(userName,password,request);
    }

    /**
     * 管理员登录
     * @param userName
     * @param password
     * @return
     */
    /*@RequestMapping(value = "/adminLogin",method = RequestMethod.POST)
    @ResponseBody
    public Response adminLogin(@RequestParam(value ="userName") String userName,
                               @RequestParam(value ="password") String password,
                               HttpServletRequest request){
        return adminService.adminLogin(userName,password,request);
    }*/

    /**
     * 退出登录
     * @param request
     * @return
     */
    @RequestMapping(value = "/logOut")
    public String logOut(HttpServletRequest request){
        Integer type = (Integer) request.getSession().getAttribute("type");
        if(1 == type){//管理员登出
            request.getSession().setAttribute(Constants.ADMINI_LOGIN_INFO,null);//设置登录信息为空
            request.getSession().setAttribute("type",null);
        }else {
            request.getSession().setAttribute(Constants.PLATFORM_LOGIN_INFO,null);//设置登录信息为空
            request.getSession().setAttribute("type",null);
        }

        return "redirect:/admin/index/toLogin";
    }

    /**
     * 登录后跳转到首页获取信息
     * @return
     */
    @RequestMapping(value = "/getMain",method = RequestMethod.GET)
    public String getMainMenu(HttpServletRequest request,ModelMap map){
        Integer type = (Integer) request.getSession().getAttribute("type");
        List<String> roles = new ArrayList<String>();

        if(1==type){
            Admin admin = (Admin) request.getSession().getAttribute(Constants.ADMINI_LOGIN_INFO);
            if(Constants.ROLE_SUPER.equals(admin.getRole())){
                roles.add(Constants.ROLE_SUPER);
                roles.add(Constants.ROLE_ADMIN);
                roles.add(Constants.ROLE_PLATFORM);
            }else {
                roles.add(Constants.ROLE_ADMIN);
                roles.add(Constants.ROLE_PLATFORM);
            }
        }else {
            roles.add(Constants.ROLE_PLATFORM);
        }

        List<AdminMenu> list = adminMenuService.selectByRole(roles);
        map.put("list",list);
        return "/main";
    }

    @RequestMapping(value = "/mainLoad",method = RequestMethod.GET)
    public String mainLoad(HttpServletRequest request,ModelMap map){
        Integer type = (Integer) request.getSession().getAttribute("type");
        List<Platform> platforms = new ArrayList<Platform>();

        if(2==type){//获取platformId
            Platform platform = (Platform) request.getSession().getAttribute(Constants.PLATFORM_LOGIN_INFO);
            platforms.add(platform);//当前登录用户的ID
        }else {//管理员登录获取所有未删除平台的ID
            platforms.addAll(platformService.findUndeletePlatforms());
        }
        map.put("platforms",platforms);
        return "/mainLoad";
    }

    /**
     * 获取Free Wall
     * @param request
     * @return
     */
    @RequestMapping("/getFreeWall")
    @ResponseBody
    public Response getFreeWall(HttpServletRequest request){
        Integer type = (Integer) request.getSession().getAttribute("type");
        List<String> roles = new ArrayList<String>();

        if(1==type){
            Admin admin = (Admin) request.getSession().getAttribute(Constants.ADMINI_LOGIN_INFO);
            if(Constants.ROLE_SUPER.equals(admin.getRole())){
                roles.add(Constants.ROLE_SUPER);
                roles.add(Constants.ROLE_ADMIN);
                roles.add(Constants.ROLE_PLATFORM);
            }else {
                roles.add(Constants.ROLE_ADMIN);
                roles.add(Constants.ROLE_PLATFORM);
            }
        }else {
            roles.add(Constants.ROLE_PLATFORM);
        }

        return adminMenuService.selectChildMenu(roles);
    }


    /**
     * 获取首页报表信息
     * @param request
     * @return
     */
    @RequestMapping(value = "/getChartData")
    @ResponseBody
    public Response getChartData(HttpServletRequest request){
        Integer type = (Integer) request.getSession().getAttribute("type");
        List<Platform> platforms = new ArrayList<Platform>();

        if(2==type){//获取platformId
            Platform platform = (Platform) request.getSession().getAttribute(Constants.PLATFORM_LOGIN_INFO);
            platforms.add(platform);//当前登录用户的ID
        }else {//管理员登录获取所有未删除平台的ID
            platforms.addAll(platformService.findUndeletePlatforms());
        }
        return new Response(getCharData(platforms));
    }

    /**
     * 通过ID查询商品统计信息
     * @param request
     * @return
     */
    @RequestMapping("/getGoodPieChart")
    @ResponseBody
    public Response getGoodPieChart(HttpServletRequest request){
        String platformId = request.getParameter("platformId");
        Platform platform = platformService.getPlatformById(Long.valueOf(platformId));
        return new Response(createGoodChart(platform));
    }


    /**
     * 初始化统计数据
     * @param platforms
     * @return
     */
    private Map<String,Object> getCharData(List<Platform> platforms) {
        Map<String,Object> result = new HashMap<String, Object>();

        Integer dataChartNum = 7;
        String[] dates = new String[dataChartNum];
        String[] dateMonths = new String[dataChartNum];
        String[] dateYears =new String[dataChartNum];

        countDateMonth(new Date(), dataChartNum, dates, dateMonths, dateYears);//初始化过去7天的年月日

        String[] orderX = new String[dates.length];
        for ( int i = 0; i < dateMonths.length; i++ ) {
            orderX[i] = dates[i] + "日";
        }

        result.put("orderLineChart",createOrderChart(orderX,dates,dateMonths,dateYears,platforms));//获取订单统计数据
        result.put("userLineChart",createUserChart(orderX,dates,dateMonths,dateYears,platforms));//获取新增用户统计数据
        result.put("goodPieChart",createGoodChart(platforms.get(0)));
        return result;
    }

    /**
     * 创建订单图表
     * @param orderX
     * @param dates
     * @param dateMonth
     * @param dateYears
     * @param platforms
     * @return
     */
    private LineCharPo createOrderChart(String[]orderX ,String [] dates, String [] dateMonth , String [] dateYears,List<Platform> platforms){
        LineCharPo orderCharPO = new LineCharPo();
        orderCharPO.setTitle("一周订单量统计");//标题
        orderCharPO.setValueSuffix("单");//单位
        orderCharPO.setxAxis(orderX);//X轴

        String [] legend = new String [platforms.size()];
        LineChartData[] data = new LineChartData[platforms.size()];
        //迭代所有的平台
        for (int i = 0 ;i < platforms.size() ;i++){
            Long platformId = platforms.get(i).getId();
            String platformName = platforms.get(i).getPlatformName();
            legend[i] = platformName;

            LineChartData lineChartData = new LineChartData();
            lineChartData.setName(platformName);
            lineChartData.setType("line");
            Integer [] datas = new  Integer [dateMonth.length];
            for (int j = 0 ; j < dateMonth.length ; j++){//迭代获取该平台过去7日每日的订单数量
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

                StringBuilder start = new StringBuilder();
                start.append(dateYears[j]).append("-").append(dateMonth[j]).append("-").append(dates[j]).append(" 00:00:00");
                StringBuilder end = new StringBuilder();
                end.append(dateYears[j]).append("-").append(dateMonth[j]).append("-").append(dates[j]).append(" 23:59:59");
                try {
                    Date startDate = sdf.parse(start.toString());
                    Date endDate = sdf.parse(end.toString());
                    datas[j] = orderService.countByDate(platformId.toString(),startDate,endDate);
                    lineChartData.setData(datas);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            data[i] = lineChartData;
        }

        orderCharPO.setLegend(legend);//设置每条线的名称
        orderCharPO.setData(data);//设置数据
        return orderCharPO;
    }


    /**
     * 创建用户数据图表
     * @param orderX
     * @param dates
     * @param dateMonth
     * @param dateYears
     * @param platforms
     * @return
     */
    private LineCharPo createUserChart(String[]orderX ,String [] dates, String [] dateMonth , String [] dateYears,List<Platform> platforms){
        LineCharPo userChartPo = new LineCharPo();
        userChartPo.setTitle("新增用户量统计");//标题
        userChartPo.setValueSuffix("人");//单位
        userChartPo.setxAxis(orderX);//X轴

        String [] legend = new String [platforms.size()];
        LineChartData[] data = new LineChartData[platforms.size()];
        //迭代所有的平台
        for (int i = 0 ;i < platforms.size() ;i++){
            Long platformId = platforms.get(i).getId();
            String platformName = platforms.get(i).getPlatformName();
            legend[i] = platformName;

            LineChartData lineChartData = new LineChartData();
            lineChartData.setName(platformName);
            lineChartData.setType("line");
            Integer [] datas = new  Integer [dateMonth.length];
            for (int j = 0 ; j < dateMonth.length ; j++){//迭代获取该平台过去7日每日的订单数量
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

                StringBuilder start = new StringBuilder();
                start.append(dateYears[j]).append("-").append(dateMonth[j]).append("-").append(dates[j]).append(" 00:00:00");
                StringBuilder end = new StringBuilder();
                end.append(dateYears[j]).append("-").append(dateMonth[j]).append("-").append(dates[j]).append(" 23:59:59");
                try {
                    Date startDate = sdf.parse(start.toString());
                    Date endDate = sdf.parse(end.toString());
                    datas[j] = userService.countByDate(platformId,startDate,endDate);
                    lineChartData.setData(datas);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            data[i] = lineChartData;
        }

        userChartPo.setLegend(legend);//设置每条线的名称
        userChartPo.setData(data);//设置数据
        return userChartPo;
    }

    /**
     * 查询商品销量统计
     * 根据平台查询默认查询第一个
     * @param platform
     * @return
     */
    private PieCharPo createGoodChart(Platform platform){
        PieCharPo pieCharPo = new PieCharPo();
        pieCharPo.setName("商品销量占比统计");
        pieCharPo.setSubtext(platform.getPlatformName());

        //通过平台ID查询出该平台下所有商品的名称
        List<Goods> goodsList = goodsService.getByPlatformId(platform.getId());
        String [] legend = new String [goodsList.size()];
        PieChartData[] datas = new PieChartData [1];//初始化数据对象

        //初始化商品数据信息.
        PieChartData pieChartData = new PieChartData();
        pieChartData.setName("商品名称");
        pieChartData.setType("pie");
        pieChartData.setRadius("55%");
        pieChartData.setCenter(new String []{"50%","60%"});
        List<Map<String , Object>> data = new ArrayList<Map<String, Object>>();
        //迭代货物列表
        for (int i = 0 ; i < goodsList.size(); i++){
            legend [i] = goodsList.get(i).getName();
            Map<String , Object> map = new HashMap<String, Object>();
            map.put("name",goodsList.get(i).getName());
            map.put("value",goodsService.sumGoodsSales(goodsList.get(i).getId()));
            data.add(map);
        }
        pieChartData.setData(data);
        datas[0] = pieChartData;

        pieCharPo.setLegend(legend);
        pieCharPo.setData(datas);
        return pieCharPo;
    }


    /**
        年月日计算开始
     */
    private String[] countMonth(int startMonth, int startYear, int endMonth, int endYear) {

        if ( (endYear < startYear) || (endYear == startYear && endMonth < startMonth) ) {
            return null;
        }

        int yearNum = endYear - startYear;
        int monthNum = endMonth - startMonth + 1;

        if ( monthNum < 0 ) {
            yearNum = yearNum - 1;
        }

        int num = yearNum * 12 + monthNum;
        return countMonth(endMonth, endYear, num);
    }

    private String[] countMonth(int month, int year, int num) {

        String[] months = new String[num];
        if ( num <= 12 ) {
            for ( int i = 0; i < num; i++ ) {
                int monthNum = month - num + i + 1;
                int yearNum = year;
                if ( monthNum < 1 ) {
                    monthNum = 12 - Math.abs(monthNum);
                    yearNum = yearNum - 1;
                }
                if ( monthNum < 10 ) {
                    months[i] = "0" + String.valueOf(monthNum);
                } else {
                    months[i] = String.valueOf(monthNum);
                }
            }
        }
        return months;
    }

    private String[] countYear(int startMonth, int startYear, int endMonth, int endYear) {

        if ( (endYear < startYear) || (endYear == startYear && endMonth < startMonth) ) {
            return null;
        }

        int yearNum = endYear - startYear;
        int monthNum = endMonth - startMonth + 1;

        if ( monthNum < 0 ) {
            yearNum = yearNum - 1;
        }

        int num = yearNum * 12 + monthNum;
        return countYear(endMonth, endYear, num);
    }


    private String[] countYear(int month, int year, int num) {

        String[] years = new String[num];
        if ( num <= 12 ) {
            for ( int i = 0; i < num; i++ ) {
                int monthNum = month - num + i + 1;
                int yearNum = year;
                if ( monthNum < 1 ) {
                    monthNum = 12 - Math.abs(monthNum);
                    yearNum = yearNum - 1;
                }
                years[i] = String.valueOf(yearNum);
            }
        }
        return years;
    }

    /**
     *
     * @param date 当前日期
     * @param num X轴数量
     * @return
     */
    private void countDateMonth(Date date, int num, String[] dates, String[] dateMonths, String[] dateYear) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, -(num - 1));
        for ( int i = 0; i < num; i++ ) {
            if ( i == 0 ) {
                calendar.add(Calendar.DATE, 0);
            } else {
                calendar.add(Calendar.DATE, 1);
            }

            //日
            StringBuilder day = new StringBuilder();
            if ( calendar.get(Calendar.DATE) < 10 ) {
                day.append("0");
            }
            day.append(calendar.get(Calendar.DATE));
            dates[i] = day.toString();

            //月
            StringBuilder month = new StringBuilder();
            if ( calendar.get(Calendar.MONTH) < 10 ) {
                month.append("0");
            }
            month.append(calendar.get(Calendar.MONTH) + 1);
            dateMonths[i] = month.toString();
            //年
            dateYear[i] = String.valueOf(calendar.get(Calendar.YEAR));
        }
    }
    /**
     * 年月日计算结束
     */

}
