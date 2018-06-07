<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>系统日志</title>
<link rel="shortcut icon" href="../favicon.ico"> 
<link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
<link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
<link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
<link href="${ctx}/css/animate.css" rel="stylesheet">
<link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
<!-- Sweet Alert -->
<link href="${ctx}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="${ctx}/css/plugins/webuploader/webuploader.css">
<link rel="stylesheet" type="text/css" href="${ctx}/css/demo/webuploader-demo.css">
<link href="${ctx}/css/plugins/iCheck/custom.css" rel="stylesheet">
<!-- 全局js -->
<script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
<!-- 自定义js -->
<script src="${ctx}/js/content.js?v=1.0.0"></script>
<!-- Bootstrap table -->
<script src="${ctx}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${ctx}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<!-- Peity -->
<script src="${ctx}/js/user/user-permissionManagement.js"></script>
<script src="${ctx}/js/plugins/sweetalert/sweetalert.min.js"></script>
</head>
<body  class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <div class="row row-lg">
				<div class="col-md-12">
					${logContent}
                </div>        
                <div class="col-md-12" style="margin-left:760px;">
                	<form action="${ctx}/system/system-log!execute.html" method="post">
                		 <button  type="submit" class="btn btn-primary btn-sm">更新</button>
                		 <button  type="button" class="btn btn-white btn-sm" style="margin-left: 10px;">关闭</button>
                	</form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>