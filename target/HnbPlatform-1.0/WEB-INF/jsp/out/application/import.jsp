<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="${ctx}/js/cust/out/application/import.js"></script>
</head>
<body class="gray-bg">
	 <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	      <h4 class="modal-title">导入订单</h4>
	  </div>
	  <div class="modal-body">
	       <form class="form-horizontal" method="post" action="${ctx}/out/application!saveImportOrders.html">
                 <div class="form-group">
					<label class="col-sm-3 control-label">客户姓名：</label>
					<div class="col-sm-9 ">
						<select id="customerId" name="orderSearch.user.userId"  class="selectpicker show-tick form-control"  data-live-search="true">
	                       <c:forEach var="user" items="${customerUsers}">
	                       	<option value="${user.userId}">${user.userName}</option>
	                       </c:forEach>
				         </select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">配送类别：</label>
					<div class="col-sm-9 " >
                      	 <select id="outOrderType" name="orderSearch.reservationType"  class="selectpicker show-tick form-control"  data-live-search="true">
	                       	<option value="1">配送</option>
	                       	<option value="0">自提</option>
				         </select>
					</div>
				</div>
				
				<div class="form-group">
					<label class="col-sm-3 control-label">模版类别：</label>
					<div class="col-sm-9 " >
                      	 <select  id="templateType"  name="templateType"  class="selectpicker show-tick form-control"  data-live-search="true">
	                       	<option value="1">标准模版</option>
	                       	<option value="2">客户模版</option>
				         </select>
					</div>
				</div>
                 <div class="form-group">
					<label class="col-sm-3 control-label">订单文件：</label>
					<div class="col-sm-9 ">
						<input id="importInputFile" type="file" name="orderFile" accept=".xls,.xlsx" class="form-control"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 control-label">&nbsp;</label>
					<div class="col-sm-9">
						<p class="form-control-static"><a href="/wms/template/出库订单.xlsx">下载：订单模版</a></p>
					</div>
				</div>
			</form>
	  </div>
     <div class="modal-footer">
		<button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
		<button type="button" id="applicationImportSaveBtn" class="btn btn-primary btn-sm" >保存</button>
      </div>
</body>
</html>