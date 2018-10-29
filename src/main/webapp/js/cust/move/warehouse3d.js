/**
 * 库存明细
 */
var table3d
$().ready(function(){
	$("#update3d").on("click", updateHightlightOn);
	initUserSuggest();
	initGoodSuggest();
	initWarehouseNoteSuggest();
	table3d = $('#table3d');
	table3d.bootstrapTable({
		url: "../move/inventory-detail!listData.html",
		showRefresh: false,//刷新
		showColumns: false,//内容列下拉框
		showTriggerSearch:false,
//		pagination: false,//底部分页
		toolbar : "undefined",
//		fixHeader : "40px",
		filterControl : false,
		paginationShow:false,
		queryParams: queryParams3d,
		columns: [
		{
			field: 'id',
			visible: false,
			columnType: "Long"
		},
		{
			field: "user.userName",
			title: "客户姓名",
			columnType: "String"
		},
		{
			field: "order.reserveDate",
			title: "入库日期",
			columnType: "Date"
		},
		{
			field: "goodsName.goodShortName",
			title: "品项编码",
			columnType: "String"
		},
		{
			field: "goodsName.goodName",
			title: "品项名称",
			columnType: "String"
		},
		{
			field: "workOrder.productionDate",
			title: "生产日期",
			columnType: "Date"
		},
		{
			field: "workOrder.shelfDate",
			title: "有效日期",
			columnType: "Date"
		},
		{
			field: "workOrder.batchNumber",
			title: "批次",
			columnType: "String"
		},
		{
			field: "warehousePosition.note",
			title: "仓位",
			columnType: "String"
		}
		,
		{
			field: "totalGoodNum",
			title: "数量",
			columnType: "String"
		}
		]
	});
});

function queryParams3d(params){
	var newparams = {};
	var warehouseId = $("#warehouse3DId").val()
	var good3dId = $("#good3dId").val();
	var user3dId = $("#user3dId").val();
	var warehouseNote3dId = $("#warehouseNote3dId").val();
	if (warehouseId!=null && warehouseId != "") {
		newparams["mapWarehousePositionGoodsSearch.warehousePosition.warehouse.warehouseId"] = warehouseId;
	}
	
	if (good3dId!=null&&good3dId != "") {
		newparams["mapWarehousePositionGoodsSearch.goodsName.goodName"] = good3dId;
	}
	
	if (user3dId!=null&&user3dId != "") {
		newparams["mapWarehousePositionGoodsSearch.user.userName"] = user3dId;
	}
	if (warehouseNote3dId!=null&&warehouseNote3dId != "") {
		newparams["mapWarehousePositionGoodsSearch.warehousePosition.note"] = warehouseNote3dId;
	}
	
	return newparams;
}

function updateHightlightOn(){
	var warehouseId = $("#warehouse3DId").val()
	var good3dId = $("#good3dId").val();
	var user3dId = $("#user3dId").val();
	var warehouseNote3dId = $("#warehouseNote3dId").val();
	 $.ajax({
		 url:"../move/inventory-detail!getPositionId.html?warehouseId=" + warehouseId + "&userName=" + user3dId  + "&goodName=" + good3dId + "&warehouseNote=" + warehouseNote3dId,
     	type: "get",
     	dataType: "json",
     	cache: false,
     	beforeSend: function() {
 			showLoading();
 		}, 
 		success: function(data) {
 			removeLoading();
 			hightlightOn(data.data);
 			table3d.bootstrapTable("refresh");
 		},
 		error: function() {
 			removeLoading();
 			alertWarning();
 		}
     });
	
}

function changeWarehouse3D(){
	$("#warehouse3d").submit();
}

function initWarehouseNoteSuggest(){
	var warehouseId = $("#warehouse3DId").val()
	var $input = $("#warehouseNote3dId");
	
	$input.bsSuggest({
		getDataMethod: "url",
		url: "../move/inventory-detail!warehosueNoteSuggest.html?warehouseId=" + warehouseId + "&userName=" + $("#user3dId").val()  + "&goodName=" + $("#good3dId").val() + "&warehouseNote=",
		allowNoKeyword : true, // 是否允许无关键字时请求数据
		showBtn : false,
		listAlign : "right",
		leftWidth : 0,
		idField: "note",
        keyField: "note",
        effectiveFields: ["note"],
		effectiveFieldsAlias : {
			note : "仓位编码"
		},
		// 调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
		fnAdjustAjaxParam : function(keyword, opts) {
			opts.url = "../move/inventory-detail!warehosueNoteSuggest.html?warehouseId=" + $("#warehouse3DId").val() + "&userName=" + $("#user3dId").val()  + "&goodName=" + $("#good3dId").val() + "&warehouseNote=";
			return {
				timeout : 30000,// 超时时间30秒
			};
		},
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
            return {value: json};
        }
	}).on('onSetSelectValue', function (e, keyword) {

	});
}

function initUserSuggest(){
	var warehouseId = $("#warehouse3DId").val()
	var $input = $("#user3dId");
	$input.bsSuggest({
		getDataMethod: "url",
		url: "../move/inventory-detail!userSuggest.html?warehouseId=" + warehouseId + "&warehouseNote=" + $("#warehouseNote3dId").val()  + "&goodName=" + $("#good3dId").val() + "&userName=",
		allowNoKeyword : true, // 是否允许无关键字时请求数据
		showBtn : false,
		listAlign : "right",
		leftWidth : 0,
		idField: "userName",
        keyField: "userName",
        effectiveFields: ["userCode","userName"],
		effectiveFieldsAlias : {
			userCode : "用户编码",
			userName : "用户名"
		},
		// 调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
		fnAdjustAjaxParam : function(keyword, opts) {
			opts.url = "../move/inventory-detail!userSuggest.html?warehouseId=" + $("#warehouse3DId").val() + "&warehouseNote=" + $("#warehouseNote3dId").val()  + "&goodName=" + $("#good3dId").val() + "&userName=";
			return {
				timeout : 30000,// 超时时间30秒
			};
		},
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
            return {value: json};
        }
	}).on('onSetSelectValue', function (e, keyword) {
	});
}

function initGoodSuggest(){
	var warehouseId = $("#warehouse3DId").val()
	var $input = $("#good3dId");
	$input.bsSuggest({
		getDataMethod: "url",
		url: "../move/inventory-detail!goodSuggest.html?warehouseId=" + warehouseId + "&warehouseNote=" + $("#warehouseNote3dId").val()  + "&userName=" + $("#user3dId").val() + "&goodName=",
		allowNoKeyword : true, // 是否允许无关键字时请求数据
		showBtn : false,
		listAlign : "right",
		leftWidth : 0,
		idField: "goodName",
        keyField: "goodName",
        effectiveFields: ["goodShortName","goodName"],
		effectiveFieldsAlias : {
			goodShortName : "品项编码",
			goodName : "品项名称"
		},
		// 调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
		fnAdjustAjaxParam : function(keyword, opts) {
			opts.url = "../move/inventory-detail!goodSuggest.html?warehouseId=" + $("#warehouse3DId").val() + "&warehouseNote=" + $("#warehouseNote3dId").val()  + "&userName=" + $("#user3dId").val() + "&goodName=";
			return {
				timeout : 30000,// 超时时间30秒
			};
		},
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
            return {value: json};
        }
	}).on('onSetSelectValue', function (e, keyword) {
	});
	//调整搜索框的样式
}
