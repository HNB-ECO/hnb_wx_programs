<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户信息</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>用户信息</title>

<link rel="shortcut icon" href="../favicon.ico"> 
<link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
<link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
<link href="${ctx}/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
<link href="${ctx}/css/animate.css" rel="stylesheet">
<link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
<!-- Sweet Alert -->
<link href="${ctx}/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
<!-- 全局js -->
<script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
<script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
<!-- 自定义js -->
<script src="${ctx}/js/content.js?v=1.0.0"></script>
<script src="${ctx}/js/common/common.js?v=1.0.0"></script>
<script src="${ctx}/js/plugins/validate/jquery.validate.min.js"></script>
<script src="${ctx}/js/plugins/validate/messages_zh.min.js"></script>
<script src="${ctx}/js/plugins/validate/jquery-validate-default.js"></script>
<!-- jQuery Form -->
<script src="${ctx}/js/plugins/form/jquery.form.min.js"></script>
<script src="${ctx}/js/plugins/sweetalert/sweetalert.min.js"></script>
<!-- Bootstrap table -->
<script src="${ctx}/js/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="${ctx}/js/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script type="text/javascript">
/* function checkOldPass(){
	var oldPassword=$("#oldPwd").val();
	if(oldPassword==null || oldPassword==""){
		swal({
			title : "",
			text : "原密码不能为空!",
			type : "warning"
		});
	}
}
function checkNewPass(){
	var newPassword=$("#userPass").val();
	if(newPassword==null || newPassword==""){
		swal({
			title : "",
			text : "新密码不能为空!",
			type : "warning"
		});
	}
}
function checkPassword(){
	var password=$("#userPass").val();
	var repass=$("#confirmPassword").val();
	if(repass==null  || repass==""){
		swal({
			title : "",
			text : "请再次确认密码!",
			type : "warning"
		});
	}
	if(password!=repass){
		swal({
			title : "",
			text : "两次密码不一致!",
			type : "warning"
		});
		$("#userPass").val("");
		$("#confirmPassword").val("");
	}
} */

$().ready(function() {
	$("#signupForm").validate({
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				dataType: "json",
				beforeSend: function() {
					showLoading();
				}, 
				complete: function() {
					removeLoading();
				},
				success: function(data) {
					if (data.errcode != 0) {
						alertWarning(data.errmsg);
						return;
					}
					alertWithFunc("保存成功", "success", function(){
						location.reload();
					})
				},
				error: function() {
					alertWarning();
				}
			});
		},
		rules: {
			oldPwd: {
				required: true,
				maxlength: 50
			},
			"sysUser.userPass": {
				required: true,
				maxlength: 50
			},
			confirmPwd: {
				required: true,
				equalTo: "#userPass"
			}
		}
	});
});


</script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <form class="form-horizontal m-t" id="signupForm" action="${ctx}/system/sys-user!saveUser.html" method="post">
                <div class="form-group" style="display:none;">
                    <label class="col-sm-3 control-label">id<span style="color:red;">*</span></label>
                    <div class="col-sm-8">
                        <input id="userId" name="sysUser.userId" class="form-control" type="text" aria-required="true" readonly="readonly" value="${sysUser.userId}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">用户名<span style="color:red;">*</span></label>
                    <div class="col-sm-8">
                        <input id="userCode" name="sysUser.userCode" class="form-control" type="text" aria-required="true" readonly="readonly" value="${sysUser.userCode}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">用户名<span style="color:red;">*</span></label>
                    <div class="col-sm-8">
                        <input id="userName" name="sysUser.userName" class="form-control" type="text" aria-required="true" aria-invalid="false" class="valid" readonly="readonly" value="${sysUser.userName}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">原密码<span style="color:red;">*</span></label>
                    <div class="col-sm-8">
                        <input id="oldPwd" name="oldPwd" class="form-control" type="password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">新密码<span style="color:red;">*</span></label>
                    <div class="col-sm-8">
                        <input id="userPass" name="sysUser.userPass" class="form-control" type="password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">确认新密码<span style="color:red;">*</span></label>
                    <div class="col-sm-8">
                        <input id="confirmPassword" name="confirmPwd" class="form-control" type="password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">身份证</label>
                    <div class="col-sm-8">
                        <input id="userIdkey" name="sysUser.userIdkey" class="form-control" readonly="readonly">
                    </div>
                </div>
                 <div class="form-group">
                    <label class="col-sm-3 control-label">手机</label>
                    <div class="col-sm-8">
                        <input id="userMb" name="sysUser.userMb" class="form-control" readonly="readonly">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">QQ</label>
                    <div class="col-sm-8">
                        <input id="userIm" name="sysUser.userIm" class="form-control" readonly="readonly">
                    </div>
                </div>
                 <div class="form-group">
                    <label class="col-sm-3 control-label">E-mail</label>
                    <div class="col-sm-8">
                        <input id="userMail" name="sysUser.userMail" class="form-control" type="email" readonly="readonly">
                    </div>
                 </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">地址</label>
                    <div class="col-sm-8">
                        <input id="userAddress" name="sysUser.userAddress" class="form-control" readonly="readonly">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">备注</label>
                    <div class="col-sm-8">
                      <textarea id="userNote" name="sysUser.userNote" cols="93" rows="5" disabled="disabled">  </textarea>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-8 col-sm-offset-3">
                        <button class="btn btn-primary btn-sm" type="submit">保存</button>
                    </div>
                </div>
            </form>
        </div>
   </div>
</div>
</body>
</html>