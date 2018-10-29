<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>收费查询</title>
<link rel="shortcut icon" href="../favicon.ico">
<link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
<link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
<link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table.min.css"
	rel="stylesheet">
<link href="${ctx}/css/animate.css" rel="stylesheet">
<link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
<link href="${ctx}/css/cust.css?v=4.1.0" rel="stylesheet">
<!-- 列过滤样式 -->
<link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table-filter-control.css" rel="stylesheet">
<!-- 日期搜索框样式 -->
<link href="${ctx}/css/plugins/daterangepicker/daterangepicker.css" rel="stylesheet">
<!-- Sweet Alert -->
<link href="${ctx}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
<!-- File Input -->
<link href="${ctx}/css/plugins/fileinput/fileinput.css" rel="stylesheet">
<!-- 全局js -->
<script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
<!-- 自定义js -->
<script src="${ctx}/js/content.js?v=1.0.0"></script>
<!-- Bootstrap table -->
<script src="${ctx}/js/plugins/bootstrap-table/bootstrap-table.js"></script>
<script src="${ctx}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<!-- 日期搜索框插件 -->
<script src="${ctx}/js/plugins/daterangepicker/moment.min.js"></script>
<script src="${ctx}/js/plugins/daterangepicker/daterangepicker.js"></script>
<script src="${ctx}/js/cust/fee/feeSearch.js"></script>
<script src="${ctx}/js/plugins/sweetalert/sweetalert.min.js"></script>
<script src="${ctx}/js/plugins/fileinput/fileinput.js"></script>
<script src="${ctx}/js/common/bootstrap-table-operation.js"></script>
<!-- 列过滤js插件 -->
<script src="${ctx}/js/plugins/bootstrap-table/extensions/bootstrap-table-filter-control.js"></script>
<script type="text/javascript">
//指派类型
var feeTypeData='json:${feeTypeJson}';
var feeUnitData='json:${feeUnitJson}';
</script>
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
	    <div class="ibox float-e-margins">
	        <div class="ibox-content">
	            <div class="row row-lg">
					<div class="col-md-12">
	                     <div id="toolBar">
	                     	<button id="exportFeesearchBtn" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export"></span>&nbsp;导出</button>
	                    </div>
	                    <table id="table" class="text-nowrap"  data-mobile-responsive="true">
	                    </table>
	                </div>                
	            </div>
	        </div>
	    </div>
	</div>
</body>
</html>