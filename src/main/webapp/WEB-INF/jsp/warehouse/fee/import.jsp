<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>收费设置</title>
</head>
<body>
<div class="row">
    <div class="col-md-12">
        <form class="form-horizontal">
            <div class="form-group">
				<label class="col-sm-3 control-label">收费设置文件：</label>
				<div class="col-sm-9">
					<input type="file" name="file" accept=".xls,.xlsx" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">&nbsp;</label>
				<div class="col-sm-9">
					<p class="form-control-static"><a href="${ctx}/template/收费设置模板.xls">下载：收费设置模板</a></p>
				</div>
			</div>
        </form>
    </div>
</div>
</body>
</html>