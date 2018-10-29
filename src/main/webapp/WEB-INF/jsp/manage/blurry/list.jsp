<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>虚拟仓位</title>
    <link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link href="${ctx}/css/animate.css" rel="stylesheet">
    <link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${ctx}/css/cust.css?v=4.1.0" rel="stylesheet">
    <!-- jsTree样式 -->
    <link href="${ctx}/css/plugins/jsTree/style.min.css" rel="stylesheet">
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
    <script src="${ctx}/js/cust/manage/blurry.js?v=2"></script>
    <script src="${ctx}/js/common/bootstrap-table-operation.js?v=1"></script>
    <!-- 列过滤js插件 -->
	<script src="${ctx}/js/plugins/bootstrap-table/extensions/bootstrap-table-filter-control.js"></script>
	<!-- jQuery Validation plugin javascript-->
    <script src="${ctx}/js/plugins/validate/jquery.validate.min.js"></script>
    <script src="${ctx}/js/plugins/validate/messages_zh.min.js"></script>
    <script src="${ctx}/js/plugins/validate/jquery-validate-default.js"></script>
    <!-- jQuery Form -->
    <script src="${ctx}/js/plugins/form/jquery.form.min.js"></script>
    <!-- jsTree插件 -->
	<script src="${ctx}/js/plugins/jsTree/jstree.min.js"></script>
    <!-- 弹框插件 -->
	<script src="${ctx}/js/plugins/sweetalert/sweetalert.min.js"></script>
	<!-- 文件上传 -->
    <script src="${ctx}/js/plugins/prettyfile/bootstrap-prettyfile.js"></script>
                <!-- hashMap -->
    <script src="${ctx}/js/hashMap/hashMap.js"></script>
    <script type="text/javascript">
		//类型
		var lockTypeJson = 'json:${lockTypeJson}';
		var shelvesDirectionJson = 'json:${shelvesDirectionJson}';
	</script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-3 white-bg">
            <div class="ibox float-e-margins">
                <div class="ibox-content mailbox-content">
                    <div class="height-5px"></div>
                    <div class="full-width text-center ware-house-div">虚拟仓位</div>
                    <div class="height-15px dashed-border-bottom"></div>
                    <div class="height-10px"></div>
                    <h5>仓库名称</h5>
                    <div id="jsTree"></div>
                </div>
            </div>
        </div>
        <div class="col-sm-9">
            <div class="ibox float-e-margins">
                <div class="ibox-content">
                    <div class="row row-lg">
                        <div class="col-sm-12">
                            <div id="toolBar">
<!--                             	<button id="reprotBlurry" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-export"></span>&nbsp;导出</button> -->
                                <button type="button" class="btn btn-primary btn-sm" id="addBtn">
                                    <i class="fa fa-check"></i> 添加
                                </button>
                                <button type="button" class="btn btn-info btn-sm" id="updateBtn">
                                    <i class="fa fa-clipboard"></i> 编辑
                                </button>
                                <button type="button" class="btn btn-danger" id="deleteBtn">
                                    <i class="fa fa-trash"></i> 删除
                                </button>
                                <button type="button" class="btn btn-success btn-sm" id="importBtn">
                                    <i class="glyphicon glyphicon-import"></i> 导入
                                </button>
                                <button type="button" class="btn btn-default btn-sm" id="printBarcodeBtn">
                            	    <i class="glyphicon glyphicon-print"></i> 打印仓位编码
                         	   </button>
                            </div>
                            <table id="table" class="text-nowrap"   data-mobile-responsive="true"></table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 保存弹出框  -->
<div class="modal inmodal fade" id="saveModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary btn-sm" id="saveBtn">保存</button>
            </div>
        </div>
    </div>
</div>

<!--  导入弹出框  -->
<div class="modal inmodal fade" id="importModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">导入虚拟仓位</h4>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
                <button type="button" id="importSaveBtn" class="btn btn-primary btn-sm">保存</button>
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