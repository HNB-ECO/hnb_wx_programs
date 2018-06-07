/**
 * 线路分拣
 */
$().ready(function() {
	debugger
	$('#storePickingOrderStatus').selectpicker();
	$('#storePickingRouteName').selectpicker();
	$('#storePickingStoreName').selectpicker();

	// 加载门店信息
	$("#storePickingLoadBut").on("click", loadListData);
	$("#printStorePicking").on("click", function() {
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
		var url = "../out/store-picking!printStorePicking.html?storePickingSearch.orderIds=" + selOrderIds  + storeIdList + routeIdList  + warehouseTypeList;
		//显示模态框
		showTotalPickingSmModal(url);
	});

})

function loadListData() {
	debugger
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
	var url = "../out/store-picking!listData.html?storePickingSearch.orderIds=" + selOrderIds   + storeIdList + routeIdList  + warehouseTypeList;
	$("#storePickingLoad").load(url, function() {
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

// 小模态框
function showStorePickingSmModal(url) {
	$("#storePickingApplicationSmModal").removeData("bs.modal");
	$("#storePickingApplicationSmModal").modal({
		keyboard : false,
		backdrop : 'static',
		show : true,
		remote : url
	});
}
// 大模态框
function showStorePickingModal(url) {
	$("#storePickingApplicationModal").removeData("bs.modal");
	$("#storePickingApplicationModal").modal({
		keyboard : false,
		backdrop : 'static',
		show : true,
		remote : url
	});
}