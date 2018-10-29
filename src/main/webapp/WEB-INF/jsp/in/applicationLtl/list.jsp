<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>入库办理</title>
	<%@ include file="/common/commonJsCss.jsp"%>
	<script src="${ctx}/js/cust/in/applicationLtl/list.js"></script>
	<script type="text/javascript">
		//类型
		var inLtlOrderTypeJson = 'json:${inLtlOrderTypeJson}';
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
                	 		<button id="reportInApplicationLtl" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export">&nbsp;导出</span></button>
						    <button id="applicationLtlImportBtn" class="btn btn-success btn-sm" type="button"><i class="fa fa-upload"></i>&nbsp;&nbsp;<span class="bold">导入</span></button>
							<button id="addLtlInputBut" type="button" class="btn btn-info btn-sm" ><span class="glyphicon glyphicon-plus"></span>&nbsp;添加</button>
							<button class="btn btn-danger btn-sm demo1" type="button"><span class="glyphicon glyphicon-trash"></span>&nbsp;删除</button>
							<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-print"></span>&nbsp;打印</button>
	                  </div>
                    <table id="inApplicationLtlTable" class="text-nowrap"  data-mobile-responsive="true"></table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 大模态弹出框 -->
<div class="modal inmodal fade" id="inApplicationLtlModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>

<!-- 小模态弹出框 -->
<div class="modal inmodal fade" id="inApplicationLtlSmModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>

</body>
</html>