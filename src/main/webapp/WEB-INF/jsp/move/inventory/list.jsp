<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>盘点管理</title>
    <%@ include file="/common/commonJsCss.jsp"%>
	<script src="${ctx}/js/cust/move/inventory.js"></script>
	<script type="text/javascript">
		//盘点类别
		var inventoryTypeJson = 'json:${inventoryTypeJson}';
		//温层
		var freezeJson = 'json:${freezeTypeJson}';
		//状态
		var orderStatusTypeJson = 'json:${orderStatusTypeJson}';
	</script>
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
	    <div class="ibox float-e-margins">
	        <div class="ibox-content">
	            <div class="row row-lg">
	                <div class="col-sm-12">
	                    <div id="toolBar">
	                    	<button id="reprotInventory" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export"></span>&nbsp;导出</button>
	                        <button type="button" class="btn btn-success btn-sm" id="importBtn">
	                            <i class="glyphicon glyphicon-import"></i> 导入
	                        </button>
		                    <button type="button" class="btn btn-primary btn-sm" id="reviewBtn">
	                            <i class="fa fa-check"></i> 审核
	                        </button>
	                        <button id="delInputBut" class="btn btn-danger btn-sm " type="button">
	                        	<span class="glyphicon glyphicon-trash"></span>&nbsp;删除
	                        </button>
	                    </div>
	                    <table id="table" class="text-nowrap"  data-mobile-responsive="true"></table>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	<!-- 大模态弹出框 -->
	<div class="modal inmodal fade" id="inInventoryModal" tabindex="-1" role="dialog"  aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-lg-lg">
	        <div class="modal-content">
	            <div class="modal-body">
	               
	            </div>
	        </div>
	    </div>
	</div>
	<!-- 小模态弹出框 -->
	<div class="modal inmodal fade" id="inInventorySmModal" tabindex="-1" role="dialog"  aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-body">
	               
	            </div>
	        </div>
	    </div>
	</div>
</body>
</html>