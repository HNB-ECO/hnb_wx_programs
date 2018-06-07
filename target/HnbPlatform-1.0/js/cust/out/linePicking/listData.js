$().ready(function() {
	var outLinePickingTable = $('#outLinePickingTable');
	var warehouseTypeArr = $("#linePickingOrderStatus").val()
	var key = "storePickingSearch.goodsName.warehouseTypeList";
	var warehouseTypeList = convertToWarehouseTypeList(key, warehouseTypeArr);
	
	var routeTypeArr = $("#linePickingRouteName").val()
	var key = "storePickingSearch.store.route.idList";
	var routeTypeList = convertToWarehouseTypeList(key, routeTypeArr);
	var selOrderIds = $("#selOrderIds").val()
	var url = "../out/line-picking!data.html?storePickingSearch.orderIds=" + selOrderIds  + warehouseTypeList + routeTypeList 
	outLinePickingTable.bootstrapTable({
		url: url,
		//加载数据的url
		fixHeader : "120px",
    	showRefresh: false,//刷新
		showColumns: false,//内容列下拉框
		showTriggerSearch:false,
//		pagination: false,//底部分页
		toolbar : "undefined",
//		fixHeader : "40px",
		filterControl : false,
		paginationShow:false,
		showFooter: true,
//		fixedColumns: true,
//        fixedNumber: 4,
		columns: jQuery.parseJSON($("#lineLoadColumnData").val())
	});
});