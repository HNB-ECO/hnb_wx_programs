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
                   <table id="inApplicationDetailTable" class="text-nowrap" data-height="240"  data-mobile-responsive="true"></table>
               </div>
           </div>
	  </div>
 
     <div class="modal-footer">
              <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
      </div>

</body>
</html>