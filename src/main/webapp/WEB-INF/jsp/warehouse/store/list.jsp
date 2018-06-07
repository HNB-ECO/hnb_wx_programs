<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>门店管理</title>
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
<!-- datepicker样式 -->
<link href="${ctx}/css/plugins/datapicker/datepicker3.css" rel="stylesheet">
<!-- 全局js -->
<script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
<!-- 自定义js -->
<script src="${ctx}/js/content.js?v=1.0.0"></script>
<!-- Bootstrap table -->
<script src="${ctx}/js/plugins/bootstrap-table/bootstrap-table.js"></script>
<script src="${ctx}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
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
<script src="${ctx}/js/cust/warehouse/store.js"></script>
<script src="${ctx}/js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script type="text/javascript">
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
                     	<button id="reprotStore" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export"></span>&nbsp;导出</button>
                      <button type="button" class="btn btn-primary btn-sm" id="addBtn">
                            <i class="fa fa-plus"></i> 添加
                        </button>
                        <button type="button" class="btn btn-warning btn-sm" id="updateBtn">
                            <i class="fa fa-edit"></i> 编辑
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" id="deleteBtn">
                            <i class="fa fa-trash"></i> 删除
                        </button>
                         <button type="button" class="btn btn-white btn-sm" id="importBtn">
                            <i class="fa fa-upload"></i> 导入
                        </button>
						<button type="button" class="btn btn-info btn-sm" id="resetPwdBtn">
                            <i class="fa fa-pencil"></i> 重置密码
                        </button>
                    </div>
                    <table id="table" class="text-nowrap"  data-mobile-responsive="true">
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
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
              </button>
              <h4 class="modal-title">添加</h4>
              </div>
              <div class="modal-body">
                  <form class="form-horizontal m-t" id="signupForm">
				       <div class="form-group">
				           <label class="col-sm-3 control-label">客户名称</label>
				           <div class="col-sm-8">
			                    <select id="customerName" name="store.customerUser.userId" class="selectpicker show-tick form-control" data-live-search="true">
			                       <c:forEach var="user" items="${customerUsers}">
			                       	<option value="${user.userId}">${user.userName}</option>
			                       </c:forEach>
			                	</select>
				           </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">门店编号</label>
				           <div class="col-sm-8">
				               <input id="storeNum" name="store.storeNum" class="form-control" type="text" aria-required="true">
				           </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">门店名称</label>
				           <div class="col-sm-8">
				               <input id="storeName" name="store.storeName" class="form-control" type="text" aria-required="true">
				           </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">联系人</label>
				           <div class="col-sm-8">
				               <input id="personInCharge" name="store.personInCharge" class="form-control" type="text" aria-required="true">
				           </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">电话</label>
				           <div class="col-sm-8">
				               <input id="telephone" name="store.telephone" class="form-control" type="text" aria-required="true">
				           </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">线路名称</label>
				           <div class="col-sm-8">
			                	<select id="routeName" name="store.route.id" class="selectpicker show-tick form-control" data-live-search="true">
			                       <c:forEach var="route" items="${routeList}">
			                       	<option value="${route.id}">${route.routeName}</option>
			                       </c:forEach>
			                	</select>
					      </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">地址</label>
				           <div class="col-sm-8">
				               <input id="address" name="store.address" class="form-control" type="text" aria-required="true">
				           </div>
				       </div>    
				       <div class="form-group">
				           <label class="col-sm-3 control-label">配送时间</label>
	                       <div class="col-sm-8">
				               <input id="deliveryDate" name="store.deliveryDate" class="form-control" type="text" aria-required="true">
				           </div>
				       </div> 
		               <div class="modal-footer">
		                  <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
		                  <button type="submit" class="btn btn-primary btn-sm">保存</button>
		               </div>
				   </form>
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
                  <form class="form-horizontal m-t" id="signupForm"  action="${ctx}/warehouse/store!updateStore.html" method="post">
           		    <div class="form-group" style="display:none;">
			              <label class="col-sm-3 control-label">唯一标识</label>
			              <div class="col-sm-8">
			                    <input id="id" name="store.id" class="form-control" type="text" aria-required="true">
			              </div>
			        </div>
				 	<div class="form-group">
				           <label class="col-sm-3 control-label">客户名称</label>
				           <div class="col-sm-8">
					            <input id="customerName" name="store.customerUser.userName" class="form-control" type="text" readonly="readonly">
				          		<input id="customerId" name="store.customerUser.userId" class="form-control" type="text" style="display:none;">
				           </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">门店编号</label>
				           <div class="col-sm-8">
				               <input id="storeNum" name="store.storeNum" class="form-control" type="text" aria-required="true">
				           </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">门店名称</label>
				           <div class="col-sm-8">
				               <input id="storeName" name="store.storeName" class="form-control" type="text" aria-required="true">
				           </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">联系人</label>
				           <div class="col-sm-8">
				               <input id="personInCharge" name="store.personInCharge" class="form-control" type="text" aria-required="true">
				           </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">电话</label>
				           <div class="col-sm-8">
				               <input id="telephone" name="store.telephone" class="form-control" type="text" aria-required="true">
				           </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">线路名称</label>
				           <div class="col-sm-8">
					           <select id="routeName" name="store.route.id" class="selectpicker show-tick form-control" data-live-search="true">
			                       <c:forEach var="route" items="${routeList}">
			                       	<option value="${route.id}">${route.routeName}</option>
			                       </c:forEach>
			                	</select>
					      </div>
				       </div>
				       <div class="form-group">
				           <label class="col-sm-3 control-label">地址</label>
				           <div class="col-sm-8">
				               <input id="address" name="store.address" class="form-control" type="text" aria-required="true">
				           </div>
				       </div>    
			          <div class="form-group">
				           <label class="col-sm-3 control-label">配送时间</label>
				           <div class="col-sm-8">
				               <input id="deliveryDate" name="store.deliveryDate" class="form-control" type="text" aria-required="true">
				           </div>
				       </div> 
		               <div class="modal-footer">
		                  <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
		                  <button type="submit" class="btn btn-primary btn-sm">保存</button>
		               </div>   
				  </form>
              </div>
          </div>
      </div>
  </div>
<div class="modal inmodal fade" id="importModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">关闭</span></button>
                <h4 class="modal-title">导入门店</h4>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
                <button type="button" class="btn  btn-sm btn-white" data-dismiss="modal">关闭</button>
                <button type="button" id="importSaveBtn" class="btn btn-sm btn-primary">保存</button>
            </div>
        </div>
    </div>
</div>
<!--  重置密码弹出框  -->
<div class="modal inmodal fade" id="resetPwdModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">关闭</span></button>
                <h4 class="modal-title">重置密码</h4>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-white" data-dismiss="modal">关闭</button>
                <button type="button" id="resetPwdSaveBtn" class="btn btn-sm btn-primary">保存</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>