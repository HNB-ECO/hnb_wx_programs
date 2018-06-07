<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>虚拟仓位</title>
</head>
<body>
<div class="row">
    <div class="col-md-12">
        <form class="form-horizontal">
            <div class="form-group">
				<label class="col-sm-3 control-label">虚拟仓位文件：</label>
				<div class="col-sm-9">
					<input type="file" name="file" class="form-control" accept=".xls,.xlsx"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">&nbsp;</label>
				<div class="col-sm-9">
					<p class="form-control-static"><a href="${ctx}/template/虚拟仓位模板.xls">下载：虚拟仓位模板</a></p>
				</div>
			</div>
		</form>
    </div>
</div>
</body>
</html>