<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>权限管理</title>
<link rel="shortcut icon" href="../favicon.ico"> 
<link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
<link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
<link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
<link href="${ctx}/css/animate.css" rel="stylesheet">
<link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
<!-- 列过滤样式 -->
<link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table-filter-control.css" rel="stylesheet">
<!-- 日期搜索框样式 -->
<link href="${ctx}/css/plugins/daterangepicker/daterangepicker.css" rel="stylesheet">
<!-- Sweet Alert -->
<link href="${ctx}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="${ctx}/css/plugins/webuploader/webuploader.css">
<link rel="stylesheet" type="text/css" href="${ctx}/css/demo/webuploader-demo.css">
<!-- bootstrap-select样式 -->
<link href="${ctx}/css/plugins/bootstrap-select/bootstrap-select.min.css" rel="stylesheet">
<link href="${ctx}/css/plugins/iCheck/custom.css" rel="stylesheet">
<!-- 全局js -->
<script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
<!-- 自定义js -->
<script src="${ctx}/js/content.js?v=1.0.0"></script>
<!-- 日期搜索框插件 -->
<script src="${ctx}/js/plugins/daterangepicker/moment.min.js"></script>
<script src="${ctx}/js/plugins/daterangepicker/daterangepicker.js"></script>
<!-- Bootstrap table -->
<script src="${ctx}/js/plugins/bootstrap-table/bootstrap-table.js"></script>
<script src="${ctx}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<!-- bootstrap-select -->
<script src="${ctx}/js/plugins/bootstrap-select/bootstrap-select.min.js"></script>
<!-- 列过滤js插件 -->
<script src="${ctx}/js/plugins/bootstrap-table/extensions/bootstrap-table-filter-control.js"></script>
<!-- Peity -->
<script src="${ctx}/js/cust/warehouse/permissionManagement.js"></script>
<script src="${ctx}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script src="${ctx}/js/common/bootstrap-table-operation.js"></script>
<script src="${ctx}/js/common/common.js"></script>
<!-- jQuery Validation plugin javascript-->
<script src="${ctx}/js/plugins/validate/jquery.validate.min.js"></script>
<script src="${ctx}/js/plugins/validate/messages_zh.min.js"></script>
<script src="${ctx}/js/plugins/validate/jquery-validate-default.js"></script>
<!-- jQuery Form -->
<script src="${ctx}/js/plugins/form/jquery.form.min.js"></script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <div class="row row-lg">
				<div class="col-md-12">
                     <div id="toolBar">
                        <button type="button" class="btn btn-warning btn-sm" id="updateBtn">
                            <i class="fa fa-edit"></i> 编辑
                        </button>
                    </div>
                    <table id="table" class="text-nowrap"  data-mobile-responsive="true">
                    </table>
                </div>                
            </div>
        </div>
    </div>
</div>
<div class="modal inmodal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content animated bounceInRight">
          <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
              </button>
              <h4 class="modal-title">编辑</h4>
              </div>
              <div class="modal-body">
                  <form class="form-horizontal m-t" id="signupForm">
					     <div class="form-group hidden">
					         <label class="col-sm-3 control-label">员工ID</label>
					         <div class="col-sm-8">
					             <input id="userId" name="user.userId" class="form-control" type="text" aria-required="true">
					         </div>
					     </div>
					    <div class="form-group">
					         <label class="col-sm-3 control-label">员工姓名：</label>
					         <div class="col-sm-8">
					             <input id="userName" name="user.userName" class="form-control" type="text" aria-required="true" readonly="readonly">
					         </div>
					     </div>
					     <div class="form-group">
				  			   <label class="col-sm-3 control-label">仓库名称：</label>
				               <div class="col-sm-8">
				                   <select id="ckmc" name="user.warehouseIdList" class="selectpicker show-tick form-control" multiple data-live-search="true">
				                       <c:forEach var="item" items="${wareHouseList}">
				                       	<option value="${item.warehouseId}">${item.warehouserName}</option>
				                       </c:forEach>
				                	</select>
				                </div>
					     </div>
					       <div class="form-group">
				  			   <label class="col-sm-3 control-label">客户名称：</label>
				               <div class="col-sm-8">
				                   <select id="khmc" name="user.customerUserIdList" class="selectpicker show-tick form-control" multiple data-live-search="true">
				                       <c:forEach var="item" items="${customerUserList}">
				                       	<option value="${item.userId}">${item.userName}</option>
				                       </c:forEach>
				                	</select>
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
</body>
</html>