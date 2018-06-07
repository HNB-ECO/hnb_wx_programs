/**
 * 入库验货
 */
var inPlatformTable;
$().ready(function() {
	inPlatformTable = $('#inPlatformTable');
	inPlatformTable.bootstrapTable({
		url: "../in/platform!data.html",
		//加载数据的url
		uniqueId: "orderId",
		searchObject: "orderSearch.",
		columns: [{
			field: "state",
			checkbox: true
		},
		{
			field: 'orderId',
			visible: false,
			columnType: "Long"
		},
		{
			field: "orderName",
			title: "入库单号",
			sortable: true,
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "user.userName",
			title: "客户名称",
			sortable: true,
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "supplierName",
			title: "供应商",
			filterControl: "input",
			sortable: true,
			columnType: "String"
		},
		{
			field: "carTemperature",
			title: "车温",
			sortable: true,
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "reserveDate",
			title: "预约日期",
			sortable: true,
			filterControl: "daterangepicker",
			columnType: "Date"
		},
		{
			field: "totalReserveNum",
			title: "预约总数",
			columnType: "Long"
		},
		{
			field: "totalNum",
			title: "实收总数",
			columnType: "Long"
		},
		{
			field: "orderStatus",
			title: "订单状态",
			sortable: true,
			formatter: inPlatformStatusInitFunc,
			filterControl: "select",
			//搜索框
			filterData: inOrderStatusJson,
			columnType: "Long"
		},
		{
			field: "orderType",
			title: "订单类型",
			sortable: true,
			formatter: inOrderTypeInitFunc,
			filterControl: "select",
			// 搜索框
			filterData: inOrderTypeJson,
			columnType: "Long"
		},
		{
			field: "platformTime",
			title: "验货日期",
			sortable: true,
			filterControl: "daterangepicker",
			columnType: "DateTime"
		},
		{
			field: "platformUser.userName",
			title: "验货员",
			sortable: true,
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "note",
			title: "备注",
			sortable: true,
			filterControl: "input",
			columnType: "String"
		}],
		onDblClickRow: function(row) {
			//双击加载明细
			showPlatformModal( '../in/platform!detail.html?orderSearch.orderId=' + row.orderId);
		}
	});

	//验货
	$("#platformConfirmBut").on("click", platformInConfirm);
	
	//导出
	$("#reprotInPlatform").on("click",function(){
		alertConfirm(function(){
        	var params = getExportParams("orderSearch");
    		location.href = "../report/report!inPlatformReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	$("#inPlatformPrintInspection").on("click", function() {
		var row = inPlatformTable.bootstrapTable('getSelections');
		if (row.length != 1) {
			swal({
				title : "",
				text : "请至少一条记录！",
				type : "warning"
			});
			return;
		}
		var isOk = checkOrderStatus();
		if(!isOk){
			return;
		}
		//显示模态框
		showPlatformSmModal('../in/platform!printInSpection.html?orderSearch.orderId=' + row[0].orderId);
	});
});

/**
 * 验货状态
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var inPlatformStatusInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 1:
		str = "<span class='badge badge-warning'>未验货</span>";
		break;
	case 2:
		str = "<span class='badge '>已验货</span>";
		break;
	case 3:
		str = "<span class='badge '>已验货</span>";
		break;
	case 4:
		str = "<span class='badge '>已验货</span>";
		break;
	case 5:
		str = "<span class='badge '>已验货</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

function checkOrderStatus(){
	var selectData = inPlatformTable.bootstrapTable('getSelections');
	var isOk = true;
	$.each(selectData, function(index,ele){
		var orderStatus = ele.orderStatus;
		if ( 0 == orderStatus || 1 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】未验货, 请选择一条已验货的订单 !",
				type : "warning"
			});
			isOk = false;
			return false;
		}
	});
	return isOk;
}

function getSelectOrderId(){
	var ids = null;
	var selectData = inPlatformTable.bootstrapTable('getSelections');
	if (selectData.length == 0) {
		swal({
			title : "",
			text : "请至少选择一条记录！",
			type : "warning"
		});
		return ids;
	}
	ids = $(selectData).map(function() {
		return this.orderId;
	}).get().join(',');
	return ids;
}

//预约确认
function platformInConfirm(){
	// 获取表格已选择项数组
	var checkArr = inPlatformTable.bootstrapTable('getSelections');
	if (checkArr.length != 1) {
		swal({
			title : "",
			text : "请选择一条记录！",
			type : "warning"
		});
		return;
	} else {
		//验证选择状态
		var orderStatus = $.map(inPlatformTable.bootstrapTable('getSelections'), function(row) {
			return row.orderStatus;
		});
		//
		if(1 != orderStatus){
			swal({
				title : "",
				text : "订单已验货，请选择未验货的订单!",
				type : "warning"
			});
			return;
		}
		var id = "";
		deleteOperation(inPlatformTable, checkArr);
		var i = 0;
		$.each(checkArr, function(index,ele){
		   var val = ele.orderId;
	       id += i == 0 ? val : "," + val;
	       i ++;
		});
		var url = "../in/platform!input.html?orderSearch.orderId=" + id;
		showPlatformModal(url);
	}
}

//小模态框
function showPlatformSmModal(url){
	$("#inPlatformSmModal").removeData("bs.modal");
	$("#inPlatformSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}
//大模态框
function showPlatformModal(url){
	$("#inPlatformModal").removeData("bs.modal");
	$("#inPlatformModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}