<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>入库办理</title>
	<%@ include file="/common/commonJsCss.jsp"%>
	<script src="${ctx}/js/cust/in/application/detail.js"></script>
	<script type="text/javascript">
		//订单
		var inOrderId = ${order.orderId};
		//温层
		var freezeJson = 'json:${freezeTypeJson}';
	</script>
</head>
<body class="gray-bg">
	 <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	      <h4 class="modal-title">订单详情</h4>
	  </div>
	  <div class="modal-body">
           <div class="row row-lg">
               <div class="col-sm-12">
                   <table id="inApplicationDetailTable" class="text-nowrap" data-height="400"  data-mobile-responsive="true"></table>
               </div>
           </div>
           
           <div class="row row-lg">
               <div class="col-sm-4">
	               <c:if test="${empty order.actualUser}">
	               		<div class="widget style1 gray-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h4 >待确认 </h4>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                            <span class="font-bold"> </span>
		                            <h4 class="font-bold"></h4>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
	               <c:if test="${not empty order.actualUser}">
		               <div class="widget style1  navy-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h4 >已导入 </h4>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                        	<h4>
		                            <span class="font-bold">${order.actualUser.userName} </span>
		                            </h4>
		                            <h5 class="font-bold"><fmt:formatDate pattern="yyyy-MM-dd" value="${order.actualTime}"/></h5>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
               </div>
               <div class="col-sm-4">
                  <c:if test="${empty order.platformUser}">
	               		<div class="widget style1 gray-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h4 >待验货 </h4>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                            <span class="font-bold"> </span>
		                            <h4 class="font-bold"></h4>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
	               <c:if test="${not empty order.platformUser}">
		               <div class="widget style1  navy-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h4 >已验货 </h4>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                        	<h4>
		                            <span class="font-bold">${order.platformUser.userName} </span>
		                            </h4>
		                            <h5 class="font-bold"><fmt:formatDate pattern="yyyy-MM-dd" value="${order.platformTime}"/></h5>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
               </div>
               
               <div class="col-sm-4">
                  <c:if test="${empty order.arriveUser}">
	               		<div class="widget style1 gray-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h4 >待上架 </h4>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                            <span class="font-bold"> </span>
		                            <h4 class="font-bold"></h4>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
	               <c:if test="${not empty order.arriveUser}">
		               <div class="widget style1  navy-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h4 >已上架 </h4>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                        	<h4>
		                            <span class="font-bold">${order.arriveUser.userName} </span>
		                            </h4>
		                            <h5 class="font-bold"><fmt:formatDate pattern="yyyy-MM-dd" value="${order.arriveTime}"/></h5>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
               </div>
           </div>
	  </div>
 
     <div class="modal-footer">
              <button type="button" class="btn btn-sm btn-white" data-dismiss="modal">关闭</button>
      </div>

</body>
</html>