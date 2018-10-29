<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>入库办理</title>
	<script src="${ctx}/js/cust/out/application/detail.js"></script>
</head>
<body class="gray-bg">
	 <input type="hidden" id="inOrderId"  value="${orderSearch.ids}">
	  <input type="hidden" id="freezeJson"  value='${freezeTypeJson}'>
	   <input type="hidden" id="transiTypeJson"  value='${transiTypeJson}'>
	 <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	      <h4 class="modal-title">订单详情</h4>
	  </div>
	  <div class="modal-body">
           <div class="row row-lg">
               <div class="col-sm-12">
                   <table id="outApplicationDetailTable" class="text-nowrap" data-height="500"  data-mobile-responsive="true"></table>
               </div>
           </div>
	  </div>
 
     <div class="modal-footer">
              <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
      </div>
</body>
</html>