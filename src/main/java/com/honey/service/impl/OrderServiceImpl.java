package com.honey.service.impl;

import com.github.pagehelper.PageHelper;
import com.honey.entity.*;
import com.honey.mapper.*;
import com.honey.pojo.request.CreateOrderRequest;
import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.service.ExpressInfoService;
import com.honey.service.OrderService;
import com.honey.service.WithdrawService;
import com.honey.service.WxPayService;
import com.honey.util.Constants;
import com.honey.util.DataUtils;
import com.honey.util.PageBean;
import com.honey.util.PageBeanExtra;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 订单信息接口
 * Created by ZYL on 2018/4/28.
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private WorkOrderMapper workOrderMapper;

    @Autowired
    private PlatformMapper platformMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ChargeRecordMapper chargeRecordMapper;

    @Autowired
    private WxPayService wxPayService;

    @Autowired
    private GoodsMapper goodsMapper;

    @Autowired
    private GoodDetailMapper goodDetailMapper;

    @Autowired
    private WithdrawService withdrawService;

    @Autowired
    private ExpressInfoMapper expressInfoMapper;

    @Autowired
    private ExpressInfoService expressInfoService;

    private static Logger log = Logger.getLogger(OrderServiceImpl.class);

    /**
     * 查询用户订单信息
     *
     * @param pageNum
     * @param pageSize
     * @param userId
     * @param orderStatus
     * @return
     */
    public Response<PageBean> getUserOrders(Integer pageNum, Integer pageSize, Long userId, Integer orderStatus, String orderBy) {
        PageHelper.startPage(pageNum, pageSize);
        List<Order> list = null;
        Integer all = 0;

        OrderExample example = new OrderExample();
        OrderExample.Criteria criteria = example.createCriteria();
        criteria.andUserIdEqualTo(userId);
        if (!DataUtils.isNullOrEmpty(orderStatus)) {
            criteria.andOrderStatusEqualTo(orderStatus);
        }
        if (!DataUtils.isNullOrEmpty(orderBy))
            example.setOrderByClause(orderBy);
        list = orderMapper.selectByExample(example);
        all = orderMapper.countByExample(example);

        return new Response(new PageBeanExtra(list, all.longValue()));
    }

    /**
     * 创建订单
     *
     * @param createOrderRequest
     * @return
     */
    public Response createOrder(CreateOrderRequest createOrderRequest) {
        /**
         * 添加订单信息
         */
        Order order = new Order();
        if (!DataUtils.isNullOrEmpty(createOrderRequest.getTotalCoin())) {
            order.setTotalCoin(createOrderRequest.getTotalCoin());
        }
        if (!DataUtils.isNullOrEmpty(createOrderRequest.getTotalPrice())) {
            order.setTotalPrice(createOrderRequest.getTotalPrice());
        }
        order.setPlatformId(createOrderRequest.getPlatformId());
        order.setAddress(createOrderRequest.getAddress());
        /*order.setAddressId(createOrderRequest.getAddressId());*/
        if (!DataUtils.isNullOrEmpty(createOrderRequest.getLeaveMessage())) {
            order.setLeaveMessage(createOrderRequest.getLeaveMessage());
        }
        order.setPaymentType(createOrderRequest.getPaymentType());//支付方式
        order.setContactor(createOrderRequest.getContactor());//联系人
        order.setPhone(createOrderRequest.getPhone());//电话
        order.setUserId(createOrderRequest.getUserId());
        String orderName = Constants.ORDER_NAME_PREFIX + createOrderRequest.getUserId() + new Date().getTime();
        order.setOrderName(orderName);
        order.setOrderStatus(Constants.ORDER_STATUS_NEW);
        order.setIsDelete(Constants.OBJECT_NOT_DELETE);
        order.setCreateTime(new Date());
        order.setUpdateTime(new Date());
        orderMapper.insertIdBack(order);//插入订单信息并获取自增ID
        Long orderId = order.getId();

        /**
         * 当前版本由于没有设置购物车功能，故每一条订单对应一个工单
         * 当版本更新至有购物车功能后，order one2many WorkOrder
         * 创建工单信息
         */
        WorkOrder workOrder = new WorkOrder();
        workOrder.setUserId(createOrderRequest.getUserId());
        /**
         * 工单号为订单号+ -第几个工单
         * 当前版本只有一个
         * 后续版本为工单list的下标
         */
        workOrder.setWorkOrderNo(orderName + "-001");
        workOrder.setOrderId(orderId);
        workOrder.setGoodId(createOrderRequest.getGoodId());
        workOrder.setGoodDetailId(createOrderRequest.getGoodDetailId());
        workOrder.setPlatformId(Long.valueOf(createOrderRequest.getPlatformId()));
        workOrder.setAmount(createOrderRequest.getAmount());
        workOrder.setStatus(Constants.WORKORDER_STATUS_NEW);
        workOrder.setCreateTime(new Date());
        workOrder.setUpdateTime(new Date());
        workOrder.setIsDelete(Constants.OBJECT_NOT_DELETE);
        workOrderMapper.insert(workOrder);
        //减去库存
        Long goodDetailId = createOrderRequest.getGoodDetailId();
        GoodDetail goodDetail = goodDetailMapper.selectByPrimaryKey(goodDetailId);
        if (DataUtils.isNullOrEmpty(goodDetail))
            return new Response(Code.OBJECT_NOT_EXIST);
        goodDetail.setInventory(goodDetail.getInventory()-createOrderRequest.getAmount());
        goodDetail.setUpdateTime(new Date());
        goodDetailMapper.updateByPrimaryKeySelective(goodDetail);
        return new Response(Code.SUCCESS, orderId);
    }

    /**
     * 支付订单
     *
     * @param orderId
     * @param paymentType
     * @return
     */
    public Response orderPay(Long orderId, String paymentType, String clientIP, String openId) {
        Order order = orderMapper.selectByPrimaryKey(orderId);//查询订单
        if (StringUtils.isBlank(paymentType))
            paymentType = order.getPaymentType();
        //判断何种支付方式
        if (Constants.PAY_TYPE_HNB.equals(paymentType)) {//HNB支付
            Platform platform = platformMapper.selectByPrimaryKey(Long.valueOf(order.getPlatformId()));
            //添加平台HNB
            BigDecimal platformCoin = platform.getCoin();
            platformCoin = platformCoin.add(order.getTotalCoin());//添加平台HNB
            platform.setCoin(platformCoin);
            platformMapper.updateByPrimaryKey(platform);

            //扣除用户HNB
            Long userId = order.getUserId();
            User user = userMapper.selectByPrimaryKey(userId);
            BigDecimal userCoin = user.getCoinBalance();
            //获得冻结的画呗数量
            List<WithdrawChargeRecord> withdrawList = withdrawService.getUnCompleteWithdrawListByUserId(userId);
            BigDecimal blockCoin = new BigDecimal(0);
            for(WithdrawChargeRecord w:withdrawList){
                blockCoin = blockCoin.add(w.getWithdrawAmount());
            }
            if(userCoin.subtract(blockCoin).compareTo(order.getTotalCoin())==-1){
                return new Response(Code.USER_NOT_ENOUGH_ERROR);
            }
            userCoin = userCoin.subtract(order.getTotalCoin());
            user.setCoinBalance(userCoin);
            userMapper.updateByPrimaryKey(user);

            //创建流水
            ChargeRecord chargeRecord = new ChargeRecord();
            chargeRecord.setOrderName(Constants.ORDER_NAME_PREFIX + user.getId() + new Date().getTime());//前缀+ 用户ID +时间戳
            chargeRecord.setOrderId(orderId);
            chargeRecord.setUserId(user.getId());
            chargeRecord.setPlatformId(platform.getId());
            chargeRecord.setCoin(order.getTotalCoin());
            chargeRecord.setOrderType(Constants.USER_RECHARGE_TYPE_IN);
            chargeRecord.setCreateTime(new Date());
            chargeRecord.setUpdateTime(new Date());
            chargeRecord.setIdDelete(Constants.OBJECT_NOT_DELETE);
            chargeRecordMapper.insert(chargeRecord);
        }
        if (Constants.PAY_TYPE_WX.equals(paymentType)) {//微信支付
            /**
             * 调起微信支付支付订单
             */
            BigDecimal totalPrice = order.getTotalPrice();
            Map<String, Object> orderInfoMap = wxPayService.executeWxPrepay(openId, totalPrice, clientIP, Constants.WX_PAY_TYPE_ZHIFU, orderId);
            return new Response((Long) orderInfoMap.get("code"), (String) orderInfoMap.get("message"), orderInfoMap);
        }

        /**
         * 更新订单信息
         */
        List<WorkOrder> workOrders = order.getWorkOrders();
        for (WorkOrder workOrder : workOrders) {
            workOrder.setStatus(Constants.WORKORDER_STATUS_SHIP);
            workOrder.setPayTime(new Date());
            workOrder.setUpdateTime(new Date());
            workOrderMapper.updateByPrimaryKey(workOrder);
            //更新商品销量
            Goods goods = workOrder.getGoods();
            Integer amount = workOrder.getAmount();
            goods.setSales(goods.getSales()+amount.longValue());
            goodsMapper.updateByPrimaryKeySelective(goods);
        }

        order.setUpdateTime(new Date());
        order.setOrderStatus(Constants.ORDER_STATUS_SHIP);
        order.setPaymentType(paymentType);
        orderMapper.updateByPrimaryKey(order);

        return new Response(Code.SUCCESS);
    }

    /**
     * 取消订单
     *
     * @param orderId
     * @return
     */
    public Response cancelOrder(Long orderId) throws Exception {
        Order order = orderMapper.selectByPrimaryKey(orderId);//查询订单
        if (order == null)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        Integer orderStatus = order.getOrderStatus();
        if (Constants.ORDER_STATUS_NEW.equals(orderStatus))
            return cancelUnPayOrder(order);
        else if (Constants.ORDER_STATUS_SHIP.equals(orderStatus))
            return cancelShipOrder(order);
        else
            return new Response(2L, "此订单不能被取消！", null);
    }

    /**
     * 查看物流
     * @param workOrderId
     * @return
     */
    @Override
    public Response checkExpress(Long workOrderId) {
        if (DataUtils.isNullOrEmpty(workOrderId))
            return new Response(Code.REQUEST_PARAM_INCOMPLETE);
        WorkOrder workOrder = workOrderMapper.selectByPrimaryKey(workOrderId);
        if (DataUtils.isNullOrEmpty(workOrder) || workOrder.getIsDelete() == Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        String expressNo = workOrder.getExpressNo();
        String expressCode = workOrder.getExpress();
        ExpressInfoExample expressInfoExample = new ExpressInfoExample();
        ExpressInfoExample.Criteria expressInfoCriteria = expressInfoExample.createCriteria();
        expressInfoCriteria.andExpNoEqualTo(expressNo);
        List<ExpressInfo> expressInfoList= expressInfoMapper.selectByExample(expressInfoExample);
        //已有物流信息
        if(expressInfoList!=null && expressInfoList.size() >0){
            ExpressInfo expressInfo = expressInfoList.get(0);
            Date updateTime = expressInfo.getUpdateTime();
            Date now = new Date();
            Long timeSpan = (now.getTime()-updateTime.getTime())/(1000*60);//时间相差分钟
            if(timeSpan>60L){
                return expressInfoService.updateExpressInfo(expressInfo, expressNo,expressCode);
            }else
                return new Response(Code.SUCCESS,expressInfo);
        }else{
            //还未查询过物流信息
            return expressInfoService.createExpressInfo(workOrderId,expressNo,expressCode);
        }
    }

    /**
     * 确认收货
     * @param workOrderId
     * @return
     */
    public Response confirmReceive(Long workOrderId) {
        WorkOrder workOrder = workOrderMapper.selectByPrimaryKey(workOrderId);//查询订单
        if (DataUtils.isNullOrEmpty(workOrder) || workOrder.getIsDelete() == Constants.OBJECT_IS_DELETE)
            return new Response(Code.OBJECT_NOT_EXIST_OR_IS_DELETE);
        Integer workOrderStatus = workOrder.getStatus();
        if (!Constants.WORKORDER_STATUS_RECEIPT.equals(workOrderStatus))
            return new Response(2l,"该订单未处于发货状态，不能确认收货！",null);
        workOrder.setStatus(Constants.ORDER_STATUS_COMMENT);
        workOrder.setReceiptTime(new Date());
        workOrder.setUpdateTime(new Date());
        workOrderMapper.updateByPrimaryKeySelective(workOrder);
        //更新订单状态，目前一条工单对应一条订单，所以这里也更新订单状态
        Long orderId = workOrder.getOrderId();
        Order order = orderMapper.selectByPrimaryKey(orderId);
        Integer orderStatus = order.getOrderStatus();
        if (!Constants.WORKORDER_STATUS_RECEIPT.equals(orderStatus))
            return new Response(2l,"该订单未处于发货状态，不能确认收货！",null);
        order.setOrderStatus(Constants.ORDER_STATUS_COMMENT);
        order.setUpdateTime(new Date());
        orderMapper.updateByPrimaryKeySelective(order);
        /************************************************************/
        return new Response(Code.SUCCESS);
    }

    /**
     * 取消未支付订单
     *
     * @param order 订单
     */
    private Response cancelUnPayOrder(Order order) {
        /**
         * 更新订单信息
         */
        List<WorkOrder> workOrders = order.getWorkOrders();
        for (WorkOrder workOrder : workOrders) {
            workOrder.setStatus(Constants.WORKORDER_STATUS_CANCEL);
            workOrder.setUpdateTime(new Date());
            workOrder.setEndTime(new Date());
            workOrderMapper.updateByPrimaryKey(workOrder);
            //归还商品库存
            Long goodsDetailId = workOrder.getGoodDetailId();
            GoodDetail goodDetail = goodDetailMapper.selectByPrimaryKey(goodsDetailId);
            if(goodDetail==null)
                return new Response(Code.OBJECT_NOT_EXIST);
            goodDetail.setInventory(goodDetail.getInventory()+workOrder.getAmount());
            goodDetail.setUpdateTime(new Date());
            goodDetailMapper.updateByPrimaryKeySelective(goodDetail);
        }

        order.setUpdateTime(new Date());
        order.setOrderStatus(Constants.ORDER_STATUS_CANCEL);
        orderMapper.updateByPrimaryKey(order);
        return new Response(Code.SUCCESS);
    }

    /**
     * 取消已支付未发货订单
     *
     * @param order 订单
     */
    private Response cancelShipOrder(Order order) throws Exception {
        Response response = null;
        String paymentType = order.getPaymentType();
        if (Constants.PAY_TYPE_HNB.equals(paymentType)) {//HNB支付
            Platform platform = platformMapper.selectByPrimaryKey(Long.valueOf(order.getPlatformId()));
            //扣除平台HNB，返还给客户
            BigDecimal platformCoin = platform.getCoin();
            platformCoin = platformCoin.subtract(order.getTotalCoin());//添加平台HNB
            platform.setCoin(platformCoin);
            platformMapper.updateByPrimaryKey(platform);

            //返还用户HNB
            User user = userMapper.selectByPrimaryKey(order.getUserId());
            BigDecimal userCoin = user.getCoinBalance();
            userCoin = userCoin.add(order.getTotalCoin());
            user.setCoinBalance(userCoin);
            userMapper.updateByPrimaryKey(user);

            //创建退款流水
            ChargeRecord chargeRecord = new ChargeRecord();
            chargeRecord.setOrderName(Constants.REFUND_NAME_PREFIX + user.getId() + new Date().getTime());
            chargeRecord.setOrderId(order.getId());
            chargeRecord.setUserId(user.getId());
            chargeRecord.setPlatformId(platform.getId());
            chargeRecord.setCoin(order.getTotalCoin());
            chargeRecord.setOrderType(Constants.USER_RECHARGE_TYPE_OUT);
            chargeRecord.setCreateTime(new Date());
            chargeRecord.setUpdateTime(new Date());
            chargeRecord.setIdDelete(Constants.OBJECT_NOT_DELETE);
            chargeRecordMapper.insert(chargeRecord);

        } else if (Constants.PAY_TYPE_WX.equals(paymentType)) {//微信支付
            //微信退款
            Map<String,Object> resultMap = wxPayService.executeWxRefund(order);
            response = new Response((Long) resultMap.get("code"), (String) resultMap.get("message"), resultMap);
        }
        /**
         * 更新订单信息
         */
        List<WorkOrder> workOrders = order.getWorkOrders();
        for (WorkOrder workOrder : workOrders) {
            workOrder.setStatus(Constants.WORKORDER_STATUS_CANCEL);
            workOrder.setUpdateTime(new Date());
            workOrder.setEndTime(new Date());
            workOrderMapper.updateByPrimaryKey(workOrder);
            //归还商品库存
            Long goodsDetailId = workOrder.getGoodDetailId();
            GoodDetail goodDetail = goodDetailMapper.selectByPrimaryKey(goodsDetailId);
            if(goodDetail==null)
                return new Response(Code.OBJECT_NOT_EXIST);
            goodDetail.setInventory(goodDetail.getInventory()+workOrder.getAmount());
            goodDetail.setUpdateTime(new Date());
            goodDetailMapper.updateByPrimaryKeySelective(goodDetail);
        }

        order.setUpdateTime(new Date());
        order.setOrderStatus(Constants.ORDER_STATUS_CANCEL);
        orderMapper.updateByPrimaryKey(order);
        if(response==null)
            return new Response(Code.SUCCESS);
        else
            return response;
    }

    /**
     * 通过平台ID和创建日期查询当日订单量
     * @param platformId
     * @param startDate
     * @param endDate
     * @return
     */
    public int countByDate(String platformId, Date startDate,Date endDate) {
        OrderExample example = new OrderExample();
        OrderExample.Criteria criteria = example.createCriteria();
        criteria.andIsDeleteEqualTo(Constants.OBJECT_NOT_DELETE);
        criteria.andPlatformIdEqualTo(platformId);
        criteria.andCreateTimeBetween(startDate,endDate);
        return orderMapper.countByExample(example);
    }
}
