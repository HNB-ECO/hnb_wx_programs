<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="${ctx}/js/cust/in/inspection/input.js"></script>
</head>
<body class="gray-bg">
	 <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	      <h4 class="modal-title">上架</h4>
	  </div>
	  <div class="modal-body">
	     <form id="inPlatformForm" role="form" class="form-horizontal">
	       <input id="inInspectionOrderId" type="hidden" name="orderSearch.orderId" value="${orderSearch.orderId }">
        	  <div id="toolBar" style="padding-bottom: 1px;">
				<button id="inInspectionAddLine" type="button" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加</button>
				<button id="inInspectionDelLine" type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span>&nbsp;删除</button>
	       </div>
        	   <table id="inInspectionInputTable" class="text-nowrap" data-height="240" data-mobile-responsive="true"></table>  
          </form>
	  </div>
     <div class="modal-footer">
		<button type="button" id="closeInInspectionBut" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
		<button type="button" id="saveInInspectionBut" class="btn btn-primary btn-sm" >保存</button>
      </div>

</body>
</html>