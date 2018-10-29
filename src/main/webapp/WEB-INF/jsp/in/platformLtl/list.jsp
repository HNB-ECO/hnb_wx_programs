<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>入库办理</title>
	<%@ include file="/common/commonJsCss.jsp"%>
	<script src="${ctx}/js/cust/in/platformLtl/list.js"></script>
	<script type="text/javascript">
		var inOrderStatusJson = 'json:${orderStatusJson}';
	</script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <div class="row row-lg">
                <div class="col-sm-12">
                	 <div id="toolBar">
                	 		<button id="reprotInPlatformLtl" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export">&nbsp;导出</span></button>
	                        <button id="platformLtlConfirmBut" class="btn btn-primary btn-sm" type="button"><i class="fa fa-check"></i>&nbsp;验货</button>
							<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-print"></span>&nbsp;打印</button>
	                  </div>
                    <table id="inPlatformLtlTable" class="text-nowrap"  data-mobile-responsive="true"></table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 大模态弹出框 -->
<div class="modal inmodal fade" id="inPlatformLtlModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>

<!-- 小模态弹出框 -->
<div class="modal inmodal fade" id="inPlatformLtlSmModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>

</body>
</html>