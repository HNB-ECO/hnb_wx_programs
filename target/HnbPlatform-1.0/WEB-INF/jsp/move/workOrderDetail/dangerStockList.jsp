<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<%@ include file="/common/commonJsCss.jsp"%>
	<script src="${ctx}/js/cust/move/dangerStockList.js"></script>
	<script type="text/javascript">
		//温层
		var freezeTypeJson = 'json:${freezeTypeJson}';
		var operatorTypeJson = 'json:${operatorTypeJson}';
	</script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <div class="row row-lg">
                <div class="col-sm-12">
                	 <div id="toolBar">
	                        <button id="inOutDetailExportBtn" class="btn btn-success btn-sm" type="button"> 
	                          <i class="glyphicon glyphicon-export"></i> 导出
	                         </button>
	                  </div>
                    <table id="inOutDetailTable" class="text-nowrap"  data-mobile-responsive="true"></table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 大模态弹出框 -->
<div class="modal inmodal fade" id="inOutDetailModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-lg modal-lg-lg">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>

<!-- 小模态弹出框 -->
<div class="modal inmodal fade" id="inOutDetailSmModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                 
            </div>
        </div>
    </div>
</div>

</body>
</html>