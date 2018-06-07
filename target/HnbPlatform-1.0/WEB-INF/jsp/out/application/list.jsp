<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>入库办理</title>
	<%@ include file="/common/commonJsCss.jsp"%>
	<script src="${ctx}/js/cust/out/application/list.js"></script>
	<script type="text/javascript">
		//类型
		var inOrderTypeJson = 'json:${inOrderTypeJson}';
		//操作员
		var reservationTypeJson = 'json:${reservationTypeJson}';
		var reservationStatusJson = 'json:${reservationStatusJson}';
		var outOrderStatusJson = 'json:${outOrderStatusJson}';
		//温层
		var freezeJson = 'json:${freezeTypeJson}';
		//配送类别
		var reservationTypeJson = 'json:${reservationTypeJson}';
	</script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <div class="row row-lg">
                <div class="col-sm-12">
                	 <div id="toolBar">
                	 		<button id="reprotOutSpection" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export"></span>&nbsp;导出</button>
	                       	<button id="applicationConfirmBut" class="btn btn-primary btn-sm" type="button"><i class="fa fa-check"></i>&nbsp;确认</button>
						    <button id="applicationImportBtn" class="btn btn-info btn-sm" type="button"><i class="fa fa-upload"></i>&nbsp;&nbsp;<span class="bold">导入</span></button>
							<button id="editInputBut" type="button" class="btn btn-success btn-sm" ><span class="fa fa-edit"></span>&nbsp;编辑</button>
							<button id="delInputBut" class="btn btn-danger btn-sm " type="button"><span class="glyphicon glyphicon-trash"></span>&nbsp;删除</button>
							<button id="resetBut" class="btn btn-info btn-sm " type="button"><span class="fa fa-mail-reply"></span>&nbsp;回&nbsp;滚</button>
							<button id="inspectionBut" type="button" class="btn btn-warning btn-sm"><span class="fa fa-cubes"></span>&nbsp;生成总拣</button>
							<button id="platformBut" type="button" class="btn btn-default  btn-sm"><span class="fa fa-truck"></span>&nbsp;确认出库</button>
							<button id="deliveryInputBut" type="button" class="btn btn-white btn-sm"><span class="glyphicon glyphicon-print"></span>&nbsp;送货单</button>
	                  </div>
                    <table id="outApplicationTable" class="text-nowrap"   data-mobile-responsive="true"></table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 大模态弹出框 -->
<div class="modal inmodal fade" id="outApplicationModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-lg modal-lg-lg">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>

<!-- 小模态弹出框 -->
<div class="modal inmodal fade" id="outApplicationSmModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>

</body>
</html>