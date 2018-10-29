<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>入库办理</title>
	<%@ include file="/common/commonJsCss.jsp"%>
	<script src="${ctx}/js/cust/in/applicationLtl/detail.js"></script>
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
			   <div class="col-sm-3">
			   	 <div class="widget style1 gray-bg">
	                    <div class="row vertical-align">
	                        <div class="col-xs-3">
	                            <i class="fa fa-user fa-2x"></i>
	                        </div>
	                        <div class="col-xs-9 text-right">
	                            <h3 >${order.user.userName}</h3>
	                        </div>
	                    </div>
	          	  </div>
			   </div>
			    <div class="col-sm-3">
			   	 <div class="widget style1 gray-bg">
	                    <div class="row vertical-align">
	                        <div class="col-xs-3">
	                            <i class="fa fa-map-pin fa-2x"></i>
	                        </div>
	                        <div class="col-xs-9 text-right">
	                            <h3 >${order.originPlace}</h3>
	                        </div>
	                    </div>
	          	  </div>
			   </div>
			    <div class="col-sm-3">
			   	 <div class="widget style1 gray-bg">
	                    <div class="row vertical-align">
	                        <div class="col-xs-3">
	                            <i class="fa fa-map-o fa-2x"></i>
	                        </div>
	                        <div class="col-xs-9 text-right">
	                            <h3>${order.destinationPlace}</h3>
	                        </div>
	                    </div>
	          	  </div>
			   </div>
		  </div>
           <div class="row row-lg">
               <div class="col-sm-12">
                   <table id="inApplicationLtlDetailTable" class="text-nowrap" data-height="240"  data-mobile-responsive="true"></table>
               </div>
           </div>
            <div class="row row-lg">
               <div class="col-sm-4">
	               <c:if test="${empty order.actualUser}">
	               		<div class="widget style1 gray-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h3 >待确认 </h3>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                            <span class="font-bold"> </span>
		                            <h3 class="font-bold"></h3>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
	               <c:if test="${not empty order.actualUser}">
		               <div class="widget style1  navy-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h3 >已导入 </h3>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                        	<h3>
		                            <span class="font-bold">${order.actualUser.userName} </span>
		                            </h3>
		                            <h3 class="font-bold"><fmt:formatDate pattern="yyyy-MM-dd" value="${order.actualTime}"/></h3>
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
		                        	 <h3 >待验货 </h3>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                            <span class="font-bold"> </span>
		                            <h3 class="font-bold"></h3>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
	               <c:if test="${not empty order.platformUser}">
		               <div class="widget style1  navy-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h3 >已验货 </h3>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                        	<h3>
		                            <span class="font-bold">${order.platformUser.userName} </span>
		                            </h3>
		                            <h3 class="font-bold"><fmt:formatDate pattern="yyyy-MM-dd" value="${order.platformTime}"/></h3>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
               </div>
               <div class="col-sm-4">
                 <c:if test="${empty order.settlementUser}">
	               		<div class="widget style1 gray-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h3 >待打印 </h3>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                            <span class="font-bold"> </span>
		                            <h3 class="font-bold"></h3>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
	               <c:if test="${not empty order.settlementUser}">
		               <div class="widget style1  navy-bg">
		                    <div class="row">
		                        <div class="col-xs-5 font-bold">
		                        	 <h3 >已打印 </h3>
		                        </div>
		                        <div class="col-xs-7 text-right">
		                       		 <h3>
		                            <span class="font-bold">${order.settlementUser.userName} </span>
		                              </h3>
		                            <h3 class="font-bold"><fmt:formatDate pattern="yyyy-MM-dd" value="${order.settlementTime}"/></h3>
		                        </div>
		                    </div>
		                </div>
	               </c:if>
               </div>
           </div>
	  </div>
 
     <div class="modal-footer">
              <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
      </div>

</body>
</html>