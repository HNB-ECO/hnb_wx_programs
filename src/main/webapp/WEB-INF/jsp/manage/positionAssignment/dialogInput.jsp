<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div class="row">
	<div class="col-md-12">
	    <form class="form-horizontal">
			<c:forEach items="${positionList}" var="position" varStatus="status">
				<div class="form-group">
					<label class="col-sm-3 control-label">标识仓位<c:out value="${status.count}"/>：</label>
					<div class="col-sm-9">
						<input type="text" maxlength="30" name="note_${status.index}" value="${position.note}" class="form-control" required/>
					</div>
					<input type="hidden" name="positionId_${status.index}" value="${position.positionsId}">
				</div>
			</c:forEach>
		</form>
     </div>
</div>
</body>
</html>