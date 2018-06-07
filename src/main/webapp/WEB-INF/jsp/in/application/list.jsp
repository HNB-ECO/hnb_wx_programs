<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>入库办理</title>
	<%@ include file="/common/commonJsCss.jsp"%>
	<script src="${ctx}/js/cust/in/application/list.js"></script>
	<script type="text/javascript">
		//类型
		var inOrderTypeJson = 'json:${inOrderTypeJson}';
		//操作员
		var reservationTypeJson = 'json:${reservationTypeJson}';
		var reservationStatusJson = 'json:${reservationStatusJson}';
		var inOrderStatusJson = 'json:${inOrderStatusJson}';
		//温层
		var freezeJson = 'json:${freezeTypeJson}';
	</script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <div class="row row-lg">
                <div class="col-sm-12">
                	 <div id="toolBar">
                	 		<button id="reprotInSpection" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export"></span>&nbsp;导出</button>
	                       	<button id="applicationConfirmBut" class="btn btn-primary btn-sm" type="button"><i class="fa fa-check"></i>&nbsp;确认</button>
						    <button id="applicationImportBtn" class="btn btn-success btn-sm" type="button"><i class="fa fa-upload"></i>&nbsp;&nbsp;<span class="bold">导入</span></button>
<!-- 							<button id="addInputBut" type="button" class="btn btn-info btn-sm" ><span class="glyphicon glyphicon-plus"></span>&nbsp;添加</button> -->
							<button id="delInputBut" class="btn btn-danger btn-sm demo1" type="button"><span class="glyphicon glyphicon-trash"></span>&nbsp;删除</button>
							<button id="printInReport" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-print"></span>&nbsp;入仓报告</button>
							<button id="printInSpection" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-print"></span>&nbsp;上架单</button>
	                  </div>
                    <table id="inApplicationTable" class="text-nowrap"  data-mobile-responsive="true"></table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 大模态弹出框 -->
<div class="modal inmodal fade" id="inApplicationModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-lg modal-lg-lg">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>

<!-- 小模态弹出框 -->
<div class="modal inmodal fade" id="inApplicationSmModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>

</body>
</html>