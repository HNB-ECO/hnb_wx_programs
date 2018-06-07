<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>移盘管理</title>
	<link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link href="${ctx}/css/animate.css" rel="stylesheet">
    <link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${ctx}/css/cust.css?v=4.1.0" rel="stylesheet">
    <!-- 列过滤样式 -->
    <link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table-filter-control.css" rel="stylesheet">
    <!-- 弹框样式 -->
    <link href="${ctx}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <!-- 全局js -->
	<script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
	<script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
	<!-- 自定义js -->
	<script src="${ctx}/js/content.js?v=1.0.0"></script>
	<script src="${ctx}/js/common/common.js?v=1.0.0"></script>
	<!-- Bootstrap table -->
	<script src="${ctx}/js/plugins/bootstrap-table/bootstrap-table.js"></script>
	<script src="${ctx}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
    <script src="${ctx}/js/cust/move/moveContainer.js?v=1"></script>
    <script src="${ctx}/js/common/bootstrap-table-operation.js"></script>
    <!-- 列过滤js插件 -->
	<script src="${ctx}/js/plugins/bootstrap-table/extensions/bootstrap-table-filter-control.js"></script>
	<!-- jQuery Validation plugin javascript-->
    <script src="${ctx}/js/plugins/validate/jquery.validate.min.js"></script>
    <script src="${ctx}/js/plugins/validate/messages_zh.min.js"></script>
    <script src="${ctx}/js/plugins/validate/jquery-validate-default.js"></script>
    <!-- jQuery Form -->
    <script src="${ctx}/js/plugins/form/jquery.form.min.js"></script>
    <!-- 弹框插件 -->
	<script src="${ctx}/js/plugins/sweetalert/sweetalert.min.js"></script>
	<!-- 搜索插件 -->
	<script src="${ctx}/js/plugins/suggest/bootstrap-suggest.js"></script>
	<script type="text/javascript">
		//操作员
		var userJson = 'json:${moveContainerUserJson}';
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
	                    <button type="button" class="btn btn-info btn-sm" id="moveBtn">
                           	<i class="fa fa-clipboard"></i> 移盘
                       	</button>
						<button type="button" class="btn btn-warning btn-sm" id="mergeBtn">
						    <i class="fa fa-exclamation-triangle"></i> 并盘
						</button>
                    </div>
                    <table id="table" class="text-nowrap"  data-mobile-responsive="true"></table>
                </div>
            </div>
        </div>
    </div>
</div>

<!--  移盘弹出框  -->
<div class="modal inmodal fade" id="moveModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">移盘</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <form class="form-horizontal">
                        	<div class="form-group">
                                <label class="col-sm-3 control-label">移前托盘：</label>
                                <div class="col-sm-8 input-group">
                                    <input id="fromContainerRfid" type="text" name="from.containerRfid" class="form-control" required>
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-sm btn-white dropdown-toggle" data-toggle="dropdown">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                                    </div>
                                </div>
                                <label class='col-sm-3 no-margins no-padding hidden'>&nbsp;</label>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">移后托盘：</label>
                                <div class="col-sm-8 input-group">
                                    <input id="toContainerRfid" type="text" name="to.containerRfid" class="form-control" required>
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-sm btn-white dropdown-toggle" data-toggle="dropdown">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                                    </div>
                                </div>
                                <label class='col-sm-3 no-margins no-padding hidden'>&nbsp;</label>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">品项编码：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="goodShortName" name="" class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">品项名称：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="goodName" name="from.goodName" class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">说明：</label>
                                <div class="col-sm-8 input-group">
                                    <textarea name="note" maxlength="200" class="form-control forbid-horizontal"></textarea>
                                </div>
                            </div>
                            <input type="hidden" id="workOrderNo" name="from.workOrderNo" class="form-control">
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary btn-sm" id="moveSaveBtn">保存</button>
            </div>
        </div>
    </div>
</div>

</body>
</html>