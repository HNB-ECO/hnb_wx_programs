/**
 * 线路分拣
 */
$().ready(function() {
	// 加载线路信息
	$("#linePickingLoadBut").on("click", loadLineListData);
	$('#linePickingRouteName').selectpicker();
	$('#linePickingOrderStatus').selectpicker();
	$("#printLinePicking").on("click", function() {
		var warehouseTypeArr = $("#linePickingOrderStatus").val()
		var key = "storePickingSearch.goodsName.warehouseTypeList";
		var warehouseTypeList = convertToWarehouseTypeList(key, warehouseTypeArr);
		
		var routeTypeArr = $("#linePickingRouteName").val()
		var key = "storePickingSearch.store.route.idList";
		var routeTypeList = convertToWarehouseTypeList(key, routeTypeArr);
		var selOrderIds = $("#selOrderIds").val();
		var url = "../out/line-picking!printLinePicking.html?storePickingSearch.orderIds=" + selOrderIds   + warehouseTypeList + routeTypeList
		//显示模态框
		showTotalPickingSmModal(url);
	});

})

function loadLineListData() {
	var warehouseTypeArr = $("#linePickingOrderStatus").val()
	var key = "storePickingSearch.goodsName.warehouseTypeList";
	var warehouseTypeList = convertToWarehouseTypeList(key, warehouseTypeArr);
	
	var routeTypeArr = $("#linePickingRouteName").val()
	var key = "storePickingSearch.store.route.idList";
	var routeTypeList = convertToWarehouseTypeList(key, routeTypeArr);
	var selOrderIds = $("#selOrderIds").val()
	var url = "../out/line-picking!listData.html?storePickingSearch.orderIds=" + selOrderIds  + warehouseTypeList + routeTypeList
	$("#linePickingLoad").load(url, function() {
	});
}

function convertToWarehouseTypeList(key,warehouseTypeArr){
	var warehouseTypeList = {};
	if (warehouseTypeArr==null || warehouseTypeArr.length == 0) {
		return "";
	}
	var has = false;
	for (var i = 0; i < warehouseTypeArr.length; i++) {
		if ("" == key || key ==null) {
			continue;
		}
		has = true;
		var detailKey = key + "[" + i + "]";
		warehouseTypeList[detailKey] = warehouseTypeArr[i];
	}
	if (has) {
		return "&" + $.param(warehouseTypeList);
	}
	return "";
}
