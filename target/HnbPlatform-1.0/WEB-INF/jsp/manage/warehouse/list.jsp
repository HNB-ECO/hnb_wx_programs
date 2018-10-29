<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>数字仓库</title>
    <link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link href="${ctx}/css/animate.css" rel="stylesheet">
    <link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${ctx}/css/cust.css?v=4.1.0" rel="stylesheet">
    <!-- 弹框样式 -->
    <link href="${ctx}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <!-- 全局js -->
	<script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
	<script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
	<!-- 自定义js -->
	<script src="${ctx}/js/content.js?v=1.0.0"></script>
	<script src="${ctx}/js/common/common.js?v=1.0.0"></script>
    <script src="${ctx}/js/cust/manage/warehouse.js?v=1"></script>
    <!-- jQuery Form -->
    <script src="${ctx}/js/plugins/form/jquery.form.min.js"></script>
    <!-- 列过滤js插件 -->
	<!-- jQuery Validation plugin javascript-->
    <script src="${ctx}/js/plugins/validate/jquery.validate.min.js"></script>
    <script src="${ctx}/js/plugins/validate/messages_zh.min.js"></script>
    <script src="${ctx}/js/plugins/validate/jquery-validate-default.js"></script>
    <!-- 弹框插件 -->
	<script src="${ctx}/js/plugins/sweetalert/sweetalert.min.js"></script>
	<!-- 文件上传 -->
    <script src="${ctx}/js/plugins/prettyfile/bootstrap-prettyfile.js"></script>
               <!-- hashMap -->
    <script src="${ctx}/js/hashMap/hashMap.js"></script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox float-e-margins">
                <div class="ibox-content">
                    <div class="form-group">
                        <form method="get" class="form-horizontal">
                            <label class="col-sm-1 control-label">仓库：</label>
                            <div class="col-sm-3">
                                <select id="warehouse" class="form-control input-sm m-b">
                                    <c:forEach var="warehouse" items="${warehouseList}">
                                    	<option value="${warehouse.warehouseId}">
                                    		<c:out value="${warehouse.warehouserName}"/>
                                    	</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </form>
                        <div class="col-sm-8">
                            <button type="button" class="btn btn-success btn-sm" id="importBtn">
                                <i class="glyphicon glyphicon-import"></i> 导入
                            </button>
                            <button type="button" class="btn btn-info btn-sm" id="updateBtn">
                                <i class="fa fa-clipboard"></i> 编辑
                            </button>
                            <button type="button" class="btn btn-danger btn-sm" id="deleteBtn">
                                <i class="fa fa-trash"></i> 删除
                            </button>
                             <button type="button" class="btn btn-default btn-sm" id="printBarcodeBtn">
                                <i class="glyphicon glyphicon-print"></i> 打印仓位编码
                            </button>
                        </div>
                    </div>
                    <table id="table"  class="white-bg full-width table-bordered"></table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 导入弹出框  -->
<div class="modal inmodal fade" id="importModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">导入仓库</h4>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" id="importSaveBtn" class="btn btn-primary btn-sm">保存</button>
            </div>
        </div>
    </div>
</div>

<!-- 编辑弹出框  -->
<div class="modal inmodal fade" id="updateModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">编辑仓库</h4>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" id="updateSaveBtn" class="btn btn-primary btn-sm">保存</button>
            </div>
        </div>
    </div>
</div>

<!-- 小模态弹出框 -->
<div class="modal inmodal fade" id="warehouseNoteSmModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
               
            </div>
        </div>
    </div>
</div>
</body>
</html>