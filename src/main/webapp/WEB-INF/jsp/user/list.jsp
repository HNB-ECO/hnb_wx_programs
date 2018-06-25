<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>品项管理</title>
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
  <!-- jsTree样式 -->
  <link href="${ctx}/css/plugins/jsTree/style.min.css" rel="stylesheet">
  <!-- 单/复选框样式 -->
  <link href="${ctx}/css/plugins/iCheck/custom.css" rel="stylesheet">
  <!-- bootstrap-select样式 -->
  <link href="${ctx}/css/plugins/bootstrap-select/bootstrap-select.min.css" rel="stylesheet">
  <!-- 全局js -->
  <script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
  <script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
  <!-- 自定义js -->
  <script src="${ctx}/js/content.js?v=1.0.0"></script>
  <script src="${ctx}/js/common/common.js?v=1.0.0"></script>
  <!-- Bootstrap table -->
  <script src="${ctx}/js/plugins/bootstrap-table/bootstrap-table.js"></script>
  <script src="${ctx}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
  <%--<script src="${ctx}/js/cust/manage/good.js?v=2"></script>--%>

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
  <!-- jsTree插件 -->
  <script src="${ctx}/js/plugins/jsTree/jstree.min.js"></script>
  <!-- iCheck -->
  <script src="${ctx}/js/plugins/iCheck/icheck.min.js"></script>
  <!-- bootstrap-select -->
  <script src="${ctx}/js/plugins/bootstrap-select/bootstrap-select.min.js"></script>
  <script src="${ctx}/js/plugins/bootstrap-select/defaults-zh_CN.min.js"></script>
  <!-- 文件上传 -->
  <script src="${ctx}/js/plugins/prettyfile/bootstrap-prettyfile.js"></script>

  <script type="text/javascript">
    //拼托
    var mergeTypeJson = 'json:${mergeTypeJson}';
    //温层
    var freezeTypeJson = 'json:${freezeTypeJson}';
    //中转
    var transiTypeJson = 'json:${transiTypeJson}';
  </script>
  <style>
    .fixed-table-toolbar {
      display:none;
    }
    .fixed-table-container{
      margin-top: 30px;
    }
    .wrapper-content{
      padding-top: 50px;
      padding-left: 15px;
      padding-right: 15px;
    }

  </style>
</head>
<body class="gray-bg">
*
<div class="form-group" style="margin-top: 20px;height: 50px">
  <label class="col-sm-1 control-label">平台ID：</label>
  <div class="col-sm-2">
    <select id="selectID" name="goodTypeId" class="form-control">
    </select>
  </div>
  <label class="col-sm-1 control-label">用户：</label>
  <div class="col-sm-2">
    <input type="text" class="form-control" id="nickName" name="workNo" value="" placeholder="请输入用户姓名查询"/>
  </div>
  <div class="col-sm-3">
    <button type="button" style="float: right" id="btnSearch"  class="btn btn-primary">查询</button>
  </div>
</div>

<div class="wrapper wrapper-content animated fadeInRight">
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-content">
          <div class="row row-lg">
            <div class="col-md-12">
              <table id="table" class=""  data-mobile-responsive="true"></table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="${ctx}/js/user/list.js"></script>
<script src="${ctx}/js/base64.js"></script>
</body>
</html>