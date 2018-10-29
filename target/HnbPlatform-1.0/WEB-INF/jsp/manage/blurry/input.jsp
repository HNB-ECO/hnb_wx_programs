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
                 <label class="col-sm-3 control-label">仓库名称：</label>
                 <div class="col-sm-8">
                     <input type="text" id="warehouseName" class="form-control" readonly>
                 </div>
             </div>
             <div class="form-group">
                 <label class="col-sm-3 control-label">虚拟仓位：</label>
                 <div class="col-sm-8">
                     <input type="text" id="note" name="inputInfo.note" value="${warehousePosition.note}" class="form-control">
                 </div>
             </div>
             <input type="hidden" name="inputInfo.positionsId" value="${warehousePosition.positionsId}">
             <input type="hidden" name="search.warehouseId" id="warehouseId">
         </form>
    </div>
</div>
</body>
</html>