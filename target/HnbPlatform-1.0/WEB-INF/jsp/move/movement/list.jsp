<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>移库管理</title>
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
    <script src="${ctx}/js/cust/move/movement.js"></script>
    <script src="${ctx}/js/common/bootstrap-table-operation.js?v=1"></script>
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
		var userJson = 'json:${movementUserJson}';
		//温层
		var freezeJson = 'json:${freezeTypeJson}';
	</script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <div class="row row-lg">
           		<div id="toolBar">
           			<button id="reprotMovement" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export"></span>&nbsp;导出</button>
                    <button type="button" class="btn btn-default btn-sm" id="moveBtn">
                        <i class="fa fa-map-marker"></i> 移库
                    </button>
                </div>
                <div class="col-sm-12">
                    <table id="table" class="text-nowrap"   data-mobile-responsive="true"></table>
                </div>
            </div>
        </div>
    </div>
</div>

<!--  移库弹出框  -->
<div class="modal inmodal fade" id="moveModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-lg ">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">移库</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <form class="form-inline">
                        	<div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">移前仓位：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="fromContainerRfid" name="from.note" class="form-control" required>
                                	<div class="input-group-btn">
                                        <button type="button" class="btn btn-sm btn-white dropdown-toggle" data-toggle="dropdown">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                                    </div>
                                </div>
                                <label class='col-sm-3 no-margins no-padding hidden'>&nbsp;</label>
                            </div>
                            <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">移后仓位：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="toPositionNote" name="to.note" class="form-control" required>
                                	<div class="input-group-btn">
                                        <button type="button" class="btn btn-sm btn-white dropdown-toggle" data-toggle="dropdown">
                                            <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                                    </div>
                                </div>
                                <label class='col-sm-3 no-margins no-padding hidden'>&nbsp;</label>
                            </div>
                            
                            <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">移动箱数：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="moveBoxGoodNum" name="from.moveGoodNum" class="form-control" value="0" >
                                </div>
                            </div>
                             <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">移动件数：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="moveSingleGoodNum" name="from.moveSingleGoodNum" class="form-control" value="0" >
                                </div>
                            </div>
                            <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">库存箱数：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="goodNum"  class="form-control" readonly>
                                </div>
                            </div>
                            
                              <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">库存件数：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="goodSingleNum"  class="form-control" readonly>
                                </div>
                            </div>
                             <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">客户姓名：</label>
                                <div class="col-sm-8 input-group">
                                     <input type="hidden" id="userId" name="from.userId" class="form-control" readonly>
                                    <input type="text" id="userName" name="from.userName" class="form-control" readonly>
                                </div>
                            </div>
                         
                             <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">包装规格：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="packageNum"  name="from.packageNum" class="form-control" readonly>
                                </div>
                            </div>
                            
                            <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">单位：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="goodUnit"  class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">品项编码：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="goodShortName" name="from.goodShortName" class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">品项名称：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="goodName" name="from.goodName" class="form-control" readonly>
                                </div>
                            </div>
                              <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">生产日期：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="productionDate" name="from.productionDate" class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">有效日期：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="shelfDate" name="from.shelfDate" class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group col-sm-6 " style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">批次：</label>
                                <div class="col-sm-8 input-group">
                                    <input type="text" id="batchNumber" name="from.batchNumber" class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group col-sm-6" style="padding-bottom: 10px;">
                                <label class="col-sm-3 control-label">说明：</label>
                                <div class="col-sm-8 input-group">
                                    <textarea name="note" maxlength="200" class="form-control forbid-horizontal"></textarea>
                                </div>
                            </div>
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