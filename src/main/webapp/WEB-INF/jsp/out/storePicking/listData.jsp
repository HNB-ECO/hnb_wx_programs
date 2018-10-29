<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="${ctx}/js/cust/out/storePicking/listData.js"></script>
</head>

<body class="gray-bg">
	<input id="loadColumnData" type="hidden" value='${columnArr}'>
 	<table id="outStorePickingTable" class="text-nowrap"  data-mobile-responsive="true"></table>
</body>
</html>