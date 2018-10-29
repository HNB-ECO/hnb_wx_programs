/**
 * 入库办理
 */
var totalPickingApplicationTable;
$().ready(function() {
	totalPickingApplicationTable = $('#totalPickingApplicationTable');
	totalPickingApplicationTable.bootstrapTable({
		url: "../out/total-picking!data.html",
		//加载数据的url
		uniqueId: "id",
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
			title: "出库单号",
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "user.userName",
			title: "客户名称",
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "reserveDate",
			title: "出库日期",
			filterControl: "input",
			columnType: "Date"
		},
		{
			field: "orderStatus",
			title: "订单状态",
			formatter: outOrderStatusInitFunc,
			sortable: true,
			filterControl: "select",
			// 搜索框
			filterData: outOrderStatusJson,
			columnType: "Long"
		},
		{
			field: "reservationType",
			title: "配送类别",
			filterControl: "select",
			formatter: outReservationTypeFunc,
			sortable: true,
			filterData : reservationTypeJson,
			columnType: "Long"
		},
		{
			field: "totalMapOrderGoodsNum",
			title: "总数",
			columnType: "Long"
		},
		{
			field: "actualTime",
			title: "确认日期",
			filterControl: "input",
			columnType: "DateTime"
		},
		{
			field: "actualUser.userName",
			title: "确认员",
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "note",
			title: "备注",
			filterControl: "input",
			columnType: "String"
		}],
		onDblClickRow: function(row) {
			//双击加载明细
			showTotalPickingModal('../out/total-picking!detail.html?orderSearch.ids=' + row.orderId);
		}
	});

	//导出
	$("#reportTotalPick").on("click",function(){
		alertConfirm(function(){
        	var params = getExportParams("orderSearch");
    		location.href = "../report/report!totalPickReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	//预约确认
	$("#totalPickingPrintBut").on("click", printTotalPicking);
	
});

/**
 * 上架状态
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var outInspectionStatusInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 11:
		str = "<span class='badge badge-warning'>待拣货</span>";
		break;
	case 12:
		str = "<span class='badge '>已生成</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

function getSelectOrderId(){
	var ids = null;
	var selectData = totalPickingApplicationTable.bootstrapTable('getSelections');
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
function printTotalPicking() {
	// 获取表格已选择项数组
	var checkArr = totalPickingApplicationTable.bootstrapTable('getSelections');
	if (checkArr.length == 0) {
		swal({
			title : "",
			text : "请选择一条记录！",
			type : "warning"
		});
		return;
	}
	var ids = getSelectOrderId();
	//双击加载明细
	showTotalPickingModal('../out/total-picking!detail.html?orderSearch.ids=' + ids);
//	// 显示模态框
//	showTotalPickingSmModal('../out/total-picking!printTotalPicking.html?mapManageContainerSearch.workOrder.order.ids=' + ids);
}

// 小模态框
function showTotalPickingSmModal(url){
	$("#totalPickingApplicationSmModal").removeData("bs.modal");
	$("#totalPickingApplicationSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}
//大模态框
function showTotalPickingModal(url){
	$("#totalPickingApplicationModal").removeData("bs.modal");
	$("#totalPickingApplicationModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}