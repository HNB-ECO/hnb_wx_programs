<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>收费设置</title>
<link rel="shortcut icon" href="../favicon.ico">
<link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
<link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
<link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
<link href="${ctx}/css/animate.css" rel="stylesheet">
<link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
<link href="${ctx}/css/cust.css?v=4.1.0" rel="stylesheet">
<!-- 列过滤样式 -->
<link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table-filter-control.css" rel="stylesheet">
<!-- Sweet Alert -->
<link href="${ctx}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
<!-- File Input -->
<link href="${ctx}/css/plugins/fileinput/fileinput.css" rel="stylesheet">
<!-- bootstrap-select样式 -->
<link href="${ctx}/css/plugins/bootstrap-select/bootstrap-select.min.css" rel="stylesheet">
<!-- 全局js -->
<script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
<!-- 自定义js -->
<script src="${ctx}/js/content.js?v=1.0.0"></script>
<!-- Bootstrap table -->
<script src="${ctx}/js/plugins/bootstrap-table/bootstrap-table.js"></script>
<script src="${ctx}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="${ctx}/js/cust/fee/benefitSetting.js"></script>
<script src="${ctx}/js/plugins/fileinput/fileinput.js"></script>
<script src="${ctx}/js/common/bootstrap-table-operation.js"></script>
<script src="${ctx}/js/common/common.js"></script>
<!-- 列过滤js插件 -->
<script src="${ctx}/js/plugins/bootstrap-table/extensions/bootstrap-table-filter-control.js"></script>
<!-- jQuery Validation plugin javascript-->
<script src="${ctx}/js/plugins/validate/jquery.validate.min.js"></script>
<script src="${ctx}/js/plugins/validate/messages_zh.min.js"></script>
<script src="${ctx}/js/plugins/validate/jquery-validate-default.js"></script>
<!-- jQuery Form -->
<script src="${ctx}/js/plugins/form/jquery.form.min.js"></script>
<!-- bootstrap-select -->
<script src="${ctx}/js/plugins/bootstrap-select/bootstrap-select.min.js"></script>
<script src="${ctx}/js/plugins/bootstrap-select/defaults-zh_CN.min.js"></script>
<!-- 搜索插件 -->
<script src="${ctx}/js/plugins/suggest/bootstrap-suggest.js"></script>
<script src="${ctx}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script src="${ctx}/js/plugins/prettyfile/bootstrap-prettyfile.js"></script>

<script type="text/javascript">
	//指派类型
	var feeTypeData='json:${feeTypeJson}';
	var feeUnitData='json:${feeUnitJson}';
	var importReturnMsg='json:${returnMsg}';
</script>
</head>
<body>
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="ibox float-e-margins">
			<div class="ibox-content">
				<div class="row row-lg">
					<div class="col-md-12">
						<div id="toolBar">
							<button type="button" class="btn btn-primary btn-sm" id="addBtn">
								<i class="fa fa-plus"></i> 添加
							</button>
							<button type="button" class="btn btn-warning btn-sm" id="updateBtn">
								<i class="fa fa-edit"></i> 编辑
							</button>
							<button type="button" class="btn btn-danger btn-sm" id="deleteBtn">
								<i class="fa fa-trash"></i> 删除
							</button>
<!-- 							<button type="button" class="btn btn-white btn-sm" id="importBtn"> -->
<!-- 								<i class="fa fa-upload"></i> 导入 -->
<!-- 							</button> -->
						</div>
						<table id="table" class="text-nowrap" 
							data-mobile-responsive="true">
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
<div class="modal inmodal" id="addModal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content animated bounceInRight">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
				</button>
				<h4 class="modal-title">添加</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal m-t" id="signupForm">
				<div class="form-group">
						<label class="col-sm-3 control-label">客户名称：</label>
						<div class="col-sm-8 input-group">
		             	    <select id="khmc" name="mapCustomerFee.customerUser.userId" class="selectpicker show-tick form-control" data-live-search="true">
		                       <c:forEach var="user" items="${customerUsers}">
		                       	<option value="${user.userId}">${user.userName}</option>
		                       </c:forEach>
		                	</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">收费名称：</label>
				 		<div class="col-sm-8 input-group">
                             <input id="feeName" type="text" class="form-control" required>
                             <div class="input-group-btn">
                                 <button type="button" class="btn btn-white dropdown-toggle btn-sm" data-toggle="dropdown">
                                     <span class="caret"></span>
                                 </button>
                                 <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                             </div>
                              <input id="feeId" class="form-control" name="mapCustomerFee.fee.feeId" type="text" aria-required="true" style="display:none;">
                         </div>
                         <label class='col-sm-3 no-margins no-padding hidden'>&nbsp;</label>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">收费类型：</label>
						<div class="col-sm-8 input-group">
						      <input id="feeType" name="mapCustomerFee.fee.feeType" class="form-control"
								type="text" aria-required="true" style="display:none;">
							  <input id="feeTypeName" name="feeTypeName" class="form-control"
								type="text" aria-required="true" readonly="readonly">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">应收金额：</label>
						<div class="col-sm-8 input-group">
						      <input id="feeNum" name="mapCustomerFee.fee.feeNum" class="form-control"
								type="text" aria-required="true" readonly="readonly">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">计费单位：</label>
						<div class="col-sm-8 input-group">
						      <input id="feeUnit" name="mapCustomerFee.fee.feeUnit" class="form-control"
								type="text" aria-required="true" style="display:none;">
							 <input id="feeUnitName" name="feeUnitName" class="form-control"
								type="text" aria-required="true" readonly="readonly">
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-3 control-label">收费价格：</label>
						<div class="col-sm-8 input-group">
							<input id="preferential" name="mapCustomerFee.preferential" class="form-control"
								type="text" aria-required="true">
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary btn-sm" id="addSaveBtn">保存</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<div class="modal inmodal" id="editModal" tabindex="-1"
	role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content animated bounceInRight">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
				</button>
				<h4 class="modal-title">编辑</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal m-t" id="signupForm">
					<div class="form-group" style="display:none;">
			              <label class="col-sm-3 control-label">唯一标识</label>
			              <div class="col-sm-8 input-group">
			                    <input id="id" name="mapCustomerFee.id" class="form-control" type="text" aria-required="true">
			              </div>
			        </div>
			        <div class="form-group">
						<label class="col-sm-3 control-label">客户名称：</label>
						<div class="col-sm-8 input-group">
							<input id="userName" name="userName" class="form-control" type="text" aria-required="true" readonly="readonly">
		             	   	<input id="userId" name="mapCustomerFee.customerUser.userId" class="form-control" type="text" aria-required="true" style="display:none;">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">收费名称：</label>
				 		<div class="col-sm-8 input-group">
                             <input id="feeName" type="text" class="form-control" required>
                             <div class="input-group-btn">
                                 <button type="button" class="btn btn-sm btn-white dropdown-toggle" data-toggle="dropdown">
                                     <span class="caret"></span>
                                 </button>
                                 <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                             </div>
                              <input id="feeId" class="form-control" name="mapCustomerFee.fee.feeId" type="text" aria-required="true" style="display:none;">
                         </div>
                         <label class='col-sm-3 no-margins no-padding hidden'>&nbsp;</label>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">收费类型：</label>
						<div class="col-sm-8 input-group">
						      <input id="feeType" name="mapCustomerFee.fee.feeType" class="form-control"
								type="text" aria-required="true" style="display:none;">
							  <input id="feeTypeName" name="feeTypeName" class="form-control"
								type="text" aria-required="true" readonly="readonly">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">应收金额：</label>
						<div class="col-sm-8 input-group">
						      <input id="feeNum" name="mapCustomerFee.fee.feeNum" class="form-control"
								type="text" aria-required="true" readonly="readonly">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">计费单位：</label>
						<div class="col-sm-8 input-group">
						      <input id="feeUnit" name="mapCustomerFee.fee.feeUnit" class="form-control"
								type="text" aria-required="true" style="display:none;">
							 <input id="feeUnitName" name="feeUnitName" class="form-control"
								type="text" aria-required="true" readonly="readonly">
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-3 control-label">收费价格：</label>
						<div class="col-sm-8 input-group">
							<input id="preferential" name="mapCustomerFee.preferential" class="form-control"
								type="text" aria-required="true">
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
						<button type="submit" class="btn btn-primary btn-sm" id="updateSaveBtn">保存</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<div class="modal inmodal" id="importModal" tabindex="-1"
	role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content animated bounceInRight">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
				</button>
				<h4 class="modal-title">导入</h4>
			</div>
			<div class="modal-body">
			</div>
			<div class="modal-footer">
               <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
               <button type="button" id="importSaveBtn" class="btn btn-primary btn-sm">保存</button>
	        </div>
		 </div>
	</div>
</div>
</body>
</html>