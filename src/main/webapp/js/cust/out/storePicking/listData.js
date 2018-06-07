$().ready(function() {
	var outStorePickingTable = $('#outStorePickingTable');
	var warehouseTypeArr = $("#storePickingOrderStatus").val()
	var key = "storePickingSearch.goodsName.warehouseTypeList";
	var warehouseTypeList = convertToWarehouseTypeList(key, warehouseTypeArr);
	
	var storePickingStoreNameArr = $("#storePickingStoreName").val()
	var key = "storePickingSearch.store.idList";
	var storeIdList = convertToWarehouseTypeList(key, storePickingStoreNameArr);
	
	var storePickingRouteArr = $("#storePickingRouteName").val()
	var key = "storePickingSearch.store.route.idList";
	var routeIdList = convertToWarehouseTypeList(key, storePickingRouteArr);
	var selOrderIds = $("#selOrderIds").val();
	debugger
	var url = "../out/store-picking!data.html?storePickingSearch.orderIds=" + selOrderIds  + storeIdList + routeIdList  + warehouseTypeList;
	outStorePickingTable.bootstrapTable({
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
		columns: jQuery.parseJSON($("#loadColumnData").val())
	});
});