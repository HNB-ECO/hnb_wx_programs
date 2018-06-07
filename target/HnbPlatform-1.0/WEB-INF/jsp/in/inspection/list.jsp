<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<%@ include file="/common/commonJsCss.jsp"%>
	<script src="${ctx}/js/cust/in/inspection/list.js"></script>
	<script type="text/javascript">
		var inOrderStatusJson = 'json:${orderStatusJson}';
		//类型
		var inOrderTypeJson = 'json:${inOrderTypeJson}';
	</script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <div class="row row-lg">
                <div class="col-sm-12">
                	 <div id="toolBar">
                	 		<button id="reportInspection" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export"></span>&nbsp;导出</button>
	                        <button id="inspectionConfirmBut" class="btn btn-primary btn-sm" type="button"><i class="fa fa-check"></i>&nbsp;上架</button>
	                  </div>
                    <table id="inInspectionTable" class="text-nowrap"  data-mobile-responsive="true"></table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 大模态弹出框 -->
<div class="modal inmodal fade" id="inInspectionModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-lg modal-lg-lg">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>

<!-- 小模态弹出框 -->
<div class="modal inmodal fade" id="inInspectionSmModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                 
            </div>
        </div>
    </div>
</div>

</body>
</html>