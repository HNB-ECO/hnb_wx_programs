<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>库存明细</title>
	<link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link href="${ctx}/css/animate.css" rel="stylesheet">
    <link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
    
    <!-- jQuery Form -->
    <script src="${ctx}/js/plugins/form/jquery.form.min.js"></script>
    
    <!-- 列过滤样式 -->
    <link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table-filter-control.css" rel="stylesheet">
    <!-- 弹框样式 -->
    <link href="${ctx}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <!-- 日期搜索框样式 -->
    <link href="${ctx}/css/plugins/daterangepicker/daterangepicker.css" rel="stylesheet">
    <!-- 全局js -->
	<script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
	<script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
	<!-- 文件导入 -->
    <script src="${ctx}/js/plugins/prettyfile/bootstrap-prettyfile.js"></script>
	<!-- 自定义js -->
	<script src="${ctx}/js/content.js?v=1.0.0"></script>
	<script src="${ctx}/js/common/common.js?v=1.0.0"></script>
	<!-- Bootstrap table -->
	<script src="${ctx}/js/plugins/bootstrap-table/bootstrap-table.js"></script>
	<script src="${ctx}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
    <script src="${ctx}/js/cust/move/inventoryDetail.js?v=1"></script>
    <script src="${ctx}/js/common/bootstrap-table-operation.js"></script>
    <!-- 列过滤js插件 -->
	<script src="${ctx}/js/plugins/bootstrap-table/extensions/bootstrap-table-filter-control.js"></script>
    <!-- 弹框插件 -->
	<script src="${ctx}/js/plugins/sweetalert/sweetalert.min.js"></script>
    <!-- 日期搜索框插件 -->
	<script src="${ctx}/js/plugins/daterangepicker/moment.min.js"></script>
	<script src="${ctx}/js/plugins/daterangepicker/daterangepicker.js"></script>
	    <script src="${ctx}/js/plugins/validate/jquery.validate.min.js"></script>
    <script src="${ctx}/js/plugins/validate/messages_zh.min.js"></script>
    <script src="${ctx}/js/plugins/validate/jquery-validate-default.js"></script>
     <!-- jQuery Form -->
    <script src="${ctx}/js/plugins/form/jquery.form.min.js"></script>
	<script type="text/javascript">
		//仓管员
		var inspectionUserJson = 'json:${inspectionUserJson}';
		//验货员
		var platformUserJson = 'json:${platformUserJson}';
		//温层
		var freezeTypeJson = 'json:${freezeTypeJson}';
	</script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <div class="row row-lg">
                <div class="col-sm-12">
               		<div id="toolBar">
	                    <button type="button" class="btn btn-success btn-sm" id="exportBtn">
                            <i class="glyphicon glyphicon-export"></i> 导出
                        </button>
                         <button id="inventoryDetailImportBtn" class="btn btn-white btn-sm" type="button"><i class="fa fa-upload"></i>&nbsp;&nbsp;<span class="bold">导入</span></button>
                    	 <button type="button" class="btn btn-primary btn-sm" id="exportInventoryBtn">
                            <i class="glyphicon glyphicon-export"></i> 盘点
                        </button>
                    </div>
                    <table id="table" class="text-nowrap"  data-mobile-responsive="true"></table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 小模态弹出框 -->
<div class="modal inmodal fade" id="inventoryDetailSmModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>
</body>
</html>