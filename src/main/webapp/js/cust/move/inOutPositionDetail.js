var inOutPositionDetail;
$().ready(function() {
	inOutPositionDetail = $('#inOutPositionDetail');
	inOutPositionDetail.bootstrapTable({
		url: "../move/in-out-position-detail!data.html",
		// 加载数据的url
		uniqueId: "id",
		searchObject: "mapManageContainerSearch.",
		columns: [
		{
			field: "workOrder.user.userName",
			title: "客户名称",
			filterControl: "input",
			sortable: true,
			columnType: "String"
		},
		{
			field: "workOrder.order.orderName",
			title: "单号",
			sortable: true,
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "workOrder.order.reserveDate",
			title: "操作日期",
			sortable: true,
			filterControl: "daterangepicker",
			columnType: "Date"
		},
		{
			field: "workOrder.workType.workTypeId",
			title: "操作类别",
			formatter : operatorTypeInitFunc,
			filterControl : "select", // 搜索框
			filterData : operatorTypeJson,
			sortable: true,
			columnType: "Long"
		},
		{
			field: "goodsName.goodShortName",
			title: "品项代码",
			filterControl: "input",
			sortable: true,
			columnType: "String"
		},
		{
			field: "goodsName.goodName",
			title: "品项名称",
			filterControl: "input",
			sortable: true,
			columnType: "String"
		},
		{
			field: "workOrder.productionDate",
			title: "生产日期",
			sortable: true,
			filterControl: "daterangepicker",
			columnType: "Date"
		},
		{
			field: "workOrder.shelfDate",
			title: "有效日期",
			sortable: true,
			filterControl: "daterangepicker",
			columnType: "Date"
		},
		{
			field: "workOrder.batchNumber",
			title: "批号",
			sortable: true,
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "goodsName.warehouseType",
			title: "温层",
			sortable: true,
			formatter : wcInitFunc,
			filterControl : "select", // 搜索框
			filterData : freezeTypeJson,
			columnType: "Long"
		},
		{
			field: "warehousePosition.note",
			title: "仓位编码",
			sortable: true,
			filterControl: "input",
			columnType: "String"
		},{
			field: "goodsName.goodUnit",
			title: "单位",
			filterControl: "input",
			sortable: true,
			columnType: "String"
		},
		{
			field: "realGoodNum",
			title: "数量 ",
			sortable: true,
			sortName: "goodNum",
			columnType: "String"
		}
		]
	});

	$("#reprotInOutPosition").on("click", function() {
        alertConfirm(function(){
        	var params = getExportParams("mapManageContainerSearch");
        	debugger
    		location.href = "../report/report!positionDetailReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
});

function getSelectOrderId() {
	var ids = null;
	var selectData = inOutPositionDetail.bootstrapTable('getSelections');
	if (selectData.length == 0) {
		swal({
			title: "",
			text: "请至少选择一条记录！",
			type: "warning"
		});
		return ids;
	}
	ids = $(selectData).map(function() {
		return this.orderId;
	}).get().join(',');
	return ids;
}

// 小模态框
function showInOutDetailSmModal(url) {
	$("#inOutDetailSmModal").removeData("bs.modal");
	$("#inOutDetailSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}
// 大模态框
function showInOutDetailModal(url) {
	$("#inOutDetailModal").removeData("bs.modal");
	$("#inOutDetailModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}