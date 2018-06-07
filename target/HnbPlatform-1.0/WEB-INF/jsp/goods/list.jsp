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


  <style>
    #table img {
      cursor: pointer;
      transition: all 0.6s;
    }

    #table img:hover{
      transform: scale(5.0);
    }

  </style>




</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-content">
          <div class="row row-lg">
            <div class="col-md-12">
              <div id="toolBar">
                <button type="button" class="btn btn-primary btn-sm" id="addBtn">
                  <i class="fa fa-plus"></i> 添加
                </button>
                <button type="button" class="btn btn-warning btn-sm" id="updateBtn">
                  <i class="fa fa-edit"></i> 编辑
                </button>
                <button type="button" class="btn btn-danger btn-sm" id="deleteBtn">
                  <i class="fa fa-trash"></i> 删除
                </button>
                <%--<select id='choose' class="form-control selectpicker"  data-live-search="true"/>--%>
              </div>
              <table id="table" class="text-nowrap"  data-mobile-responsive="true"></table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--  添加弹出框  -->
<div class="modal inmodal fade" id="saveModal" tabindex="-1" role="dialog"  aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title">添加</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <form id="goodImageForm" role="form" class="form-validation-2" enctype="multipart/form-data" method="post">
              <div class="form-group col-sm-12 " style="padding-bottom: 10px;">
                <label class="col-sm-3 control-label">商品名称：</label>
                <div class="col-sm-8">
                  <input type="text" name="name" class="form-control" placeholder="">
                </div>
              </div>
              <div class="form-group col-sm-12 " style="padding-bottom: 10px;">
                <label class="col-sm-3 control-label">商品简称：</label>
                <div class="col-sm-8">
                  <input type="text" name="shortName" class="form-control" placeholder="">
                </div>
              </div>
              <div class="form-group col-sm-12 " style="padding-bottom: 10px;">
                <label class="col-sm-3 control-label">商品类型：</label>
                <div class="col-sm-8">
                  <select id="wc" name="goodTypeId" class="form-control">
                    <%-- <c:forEach items="${warehouseTypes}" var="warehouseType">
                       <option value="${warehouseType.id}">${warehouseType.key}</option>
                     </c:forEach>--%>
                  </select>
                </div>
              </div>
              <div class="form-group col-sm-12 " style="padding-bottom: 10px;">
                <label class="col-sm-3 control-label">商品价格：</label>
                <div class="col-sm-8">
                  <input id="goodPrice" type="text" name="goodsName.goodShortName" class="form-control" placeholder="">
                </div>
              </div>
              <div class="form-group col-sm-12 " style="padding-bottom: 10px;">
                <label class="col-sm-3 control-label">积分价：</label>
                <div class="col-sm-8">
                  <input id="iconPrice" type="text" name="goodsName.goodName" class="form-control" placeholder="">
                </div>
              </div>
              <div class="form-group col-sm-12 " style="padding-bottom: 10px;">
                <label class="col-sm-3 control-label">商品单位：</label>
                <div class="col-sm-8">
                  <input id="count" type="text" name="goodsName.goodName" class="form-control" placeholder="">
                </div>
              </div>
              <div class="form-group col-sm-12 " style="padding-bottom: 10px;">
                <label class="col-sm-3 control-label">商品图片：</label>
                <div class="col-sm-8" id="btn-uploader">
                  <img src=""  id="goodImg" style="width: 200px;height: 200px">
                  <input type="hidden" name="bannerUrl" id="bannerUrl" />
                  <input type="file" value="选择图片" name="uploadFile" class="fileinput-new select" style="margin-top: 10px" onChange="uploadImage('bannerImageForm','bannerUrl','bannerImg')" />
                </div>
              </div>

              <input id="bh" type="hidden" name="goodsName.goodNameId" class="form-control" placeholder="">
              <input id="lx" type="hidden" name="goodsName.goodType.goodTypeId" class="form-control" placeholder="">
            </form>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
        <button type="button" id="saveBtn" class="btn btn-primary btn-sm">保存</button>
      </div>
    </div>
  </div>
</div>



<%--查看大图--%>
<div id="ShowImage_Form" class="modal hide">
  <div class="modal-header">
    <button data-dismiss="modal" class="close" type="button"></button>
  </div>
  <div class="modal-body">
    <div id="img_show">
    </div>
  </div>
</div>

<script src="${ctx}/js/plupload.full.min.js"></script>
<script src="${ctx}/js/moxie.min.js"></script>
<script src="${ctx}/js/goods/list.js"></script>
<script>
  var  uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',
    browse_button: 'selectImg',//上传按钮的ID
    container: 'btn-uploader',//上传按钮的上级元素ID
    drop_element: 'btn-uploader',
    max_file_size: '100mb',//最大文件限制
    flash_swf_url: '/js/Moxie.swf',
    dragdrop: false,
    chunk_size: '4mb',//分块大小
    uptoken : 'vWxd-w1ipbuT3vMkHA8mRblGnFpJ9AlWYmCyTPRx:9wIXxxWHVWq2PZ_U0Tm2qm4TV0E=:eyJzY29wZSI6ImhuYmJsb2NrIiwiZGVhZGxpbmUiOjMzNTQ1MTQ0MjZ9',
    //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
    unique_names: true,
    // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
    //save_key: true,
    //默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
    domain: 'http://p97k4szaj.bkt.clouddn.com',//自己的七牛云存储空间域名
    multi_selection: false,//是否允许同时选择多文件
    //文件类型过滤，这里限制为图片类型
    filters: {
      mime_types : [
        {title : "Image files", extensions: "jpg,jpeg,gif,png"}
      ]
    },
    init: {
      'FilesAdded': function(up, files) {
        //do something
        $("#showImg").attr( "src", files);
      },
      'BeforeUpload': function(up, file) {
        //do something
      },
      'UploadProgress': function(up, file) {
        //可以在这里控制上传进度的显示
        //可参考七牛的例子
      },
      'UploadComplete': function() {
        //do something
      },
      'FileUploaded': function(up, file, info) {
        //每个文件上传成功后,处理相关的事情
        //其中 info 是文件上传成功后，服务端返回的json，形式如
        //
        //  "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
        //  "key": "gogopher.jpg"
        //}
        var domain = up.getOption('domain');
        var res = eval('(' + info + ')');
        var sourceLink = domain + res.key;//获取上传文件的链接地址
        $("#showImg").attr( "src",  sourceLink);
        console.log(sourceLink)
        //do something
      },
      'Error': function(up, err, errTip) {
        alert(errTip);
      },
      'Key': function(up, file) {
        //当save_key和unique_names设为false时，该方法将被调用
        var key = "";
        $.ajax({
          url: '/qiniu-token/get-key/',
          type: 'GET',
          async: false,//这里应设置为同步的方式
          success: function(data) {
            var ext = Qiniu.getFileExtension(file.name);
            key = data + '.' + ext;
          },
          cache: false
        });
        return key;
      }
    }
  });
</script>

</body>
</html>