<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>客户档案</title>
</head>
<body>
<div class="row">
    <div class="col-md-12">
    	 <form class="form-horizontal m-t" id="signupForm">
		        <div class="form-group">
		            <label class="col-sm-3 control-label">货主简称</label>
		            <div class="col-sm-8">
		                <input id="userCode" name="customerUser.userCode" class="form-control" type="text" aria-required="true" value="${customerUser.userCode}">
		            </div>
		        </div>
		        <div class="form-group">
		            <label class="col-sm-3 control-label">姓名</label>
		            <div class="col-sm-8">
		                <input id="userName" name="customerUser.userName" class="form-control" type="text" aria-required="true" value="${customerUser.userName}">
		            </div>
		        </div>
		        <c:if test="${customerUser.userId == null}">
		        	<div class="form-group">
			            <label class="col-sm-3 control-label">密码</label>
			            <div class="col-sm-8">
			                <input id="userPass" name="customerUser.userPass" class="form-control" type="password" aria-required="true">
			            </div>
			        </div>
			        <div class="form-group">
			            <label class="col-sm-3 control-label">确认密码</label>
			            <div class="col-sm-8">
			                <input id="userRepass" name="confirmpassword" class="form-control" type="password" aria-required="true">
			            </div>
			        </div>
		        </c:if>
		        <div class="form-group">
		            <label class="col-sm-3 control-label">身份证</label>
		            <div class="col-sm-8">
		                <input id="userIdkey" name="customerUser.userIdkey" class="form-control" type="text" aria-required="true" value="${customerUser.userIdkey}">
		            </div>
		        </div>
		        <div class="form-group">
		            <label class="col-sm-3 control-label">电子邮箱</label>
		            <div class="col-sm-8">
		                <input id="userMail" name="customerUser.userMail" class="form-control" type="text" aria-required="true" value="${customerUser.userMail}">
		            </div>
		        </div>
		        <div class="form-group">
		            <label class="col-sm-3 control-label">手机号码</label>
		            <div class="col-sm-8">
		                <input id="userMb" name="customerUser.userMb" class="form-control" type="text" aria-required="true" value="${customerUser.userMb}">
		            </div>
		        </div>
	        	<div class="form-group">
		            <label class="col-sm-3 control-label">电话</label>
		            <div class="col-sm-8">
		                <input id="userPhone" data-mask="9999-99-99"  name="customerUser.userPhone" class="form-control" type="text" aria-required="true" value="${customerUser.userPhone}">
		            </div>
		        </div>
		        <div class="form-group">
		           <label class="col-sm-3 control-label">地址</label>
		            <div class="col-sm-8">
		                <input id="userAddress" name="customerUser.userAddress" class="form-control" type="text" aria-required="true" value="${customerUser.userAddress}">
		            </div>
		        </div>
	            <input type="hidden" id="userId" name="customerUser.userId" value="${customerUser.userId}">
		 </form>
    </div>
</div>
</body>
</html>