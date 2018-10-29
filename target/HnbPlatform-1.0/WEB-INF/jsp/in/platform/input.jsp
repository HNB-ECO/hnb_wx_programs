<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="${ctx}/js/cust/in/platform/input.js"></script>
	<script type="text/javascript">
		//温层
		var freezeTypeJson = 'json:${freezeTypeJson}';
	</script>
</head>
<body class="gray-bg">
	 <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	      <h4 class="modal-title">验货</h4>
	  </div>
	  <div class="modal-body">
	     <form id="inPlatformForm" role="form" class="form-horizontal">
	       <input id="inPlatformOrderId" type="hidden" name="orderSearch.orderId" value="${orderSearch.orderId }">
	       <input id="inPlatformUserId" type="hidden" value="${order.user.userId }">
           <div id="toolBar" style="padding-bottom: 1px;">
				<button id="inPlatformAddLine" type="button" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加</button>
				<button id="inPlatformDelLine" type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span>&nbsp;删除</button>
	       </div>
        	   <table id="inPlatformInputTable" class="text-nowrap" data-height="240" data-mobile-responsive="true"></table>  
          </form>
	  </div>
     <div class="modal-footer">
		<button type="button" id="closeInPlatformBut" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
		<button type="button" id="saveInPlatformBut" class="btn btn-primary btn-sm">保存</button>
      </div>

</body>
</html>