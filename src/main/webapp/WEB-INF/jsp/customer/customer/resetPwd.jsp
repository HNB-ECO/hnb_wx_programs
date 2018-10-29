<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>重置密码</title>
</head>
<body>
<div class="row">
    <div class="col-md-12">
    	 <form class="form-horizontal m-t" id="resetPwdForm">
		        <div class="form-group">
		            <label class="col-sm-3 control-label">新密码</label>
		            <div class="col-sm-8">
		                <input id="resetNewPwd" name="customerUser.userPass" class="form-control" type="password"/>
		            </div>
		        </div>
		        <div class="form-group">
		            <label class="col-sm-3 control-label">确认密码</label>
		            <div class="col-sm-8">
		                <input name="confirmPass" class="form-control" type="password"/>
		            </div>
		        </div>
	            <input type="hidden" name="customerUser.userId" value="${customerUser.userId}">
		 </form>
    </div>
</div>
</body>
</html>