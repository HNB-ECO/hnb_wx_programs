var inOutDetailTable;
$().ready(function() {
	inOutDetailTable = $('#inOutDetailTable');
	inOutDetailTable.bootstrapTable({
		url: "../move/in-out-detail!data.html",
		// 加载数据的url
		uniqueId: "workOrderId",
		searchObject: "workOrderSearch.",
		columns: [
		{
			field: "user.userName",
			title: "客户名称",
			filterControl: "input",
			sortable: true,
			columnType: "String"
		},
		{
			field: "order.orderName",
			title: "单号",
			sortable: true,
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "operatorTime",
			title: "操作日期",
			sortable: true,
			filterControl: "daterangepicker",
			columnType: "Date"
		},
		{
			field: "operatorType",
			title: "操作类别",
			formatter : operatorTypeInitFunc,
			filterControl : "select", // 搜索框
			filterData : operatorTypeJson,
			sortable: true,
			columnType: "Long"
		}
		,
		{
			field: "storeName",
			title: "门店",
			filterControl: "input",
			sortable: true,
			columnType: "String"
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
			field: "goodsName.goodUnit",
			title: "单位",
			filterControl: "input",
			sortable: true,
			columnType: "String"
		},
		{
			field: "goodUnitNum",
			title: "数量 ",
			columnType: "Double"
		},
		{
			field: "productionDate",
			title: "生产日期",
			sortable: true,
			filterControl: "input",
			columnType: "Date"
		},
		{
			field: "shelfDate",
			title: "有效日期",
			sortable: true,
			filterControl: "input",
			columnType: "Date"
		},
		{
			field: "batchNumber",
			title: "批号",
			sortable: true,
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "goodsName.goodWeight",
			title: "单件重量（Kg）",
			sortable: true,
			filterControl: "input",
			columnType: "Double"
		},
		{
			field: "totalWeight",
			title: "操作重量(Kg)",
			columnType: "Double"
		},
		{
			field: "boardNum",
			title: "板数",
			sortable: true,
			filterControl: "input",
			columnType: "Double"
		},
		{
			field: "goodsName.warehouseType",
			title: "温层",
			sortable: true,
			formatter : wcInitFunc,
			filterControl : "select", // 搜索框
			filterData : freezeTypeJson,
			columnType: "Long"
		}]
	});

	$("#inOutDetailExportBtn").on("click", function() {
        alertConfirm(function(){
        	var params = getExportParams("inOutDetailSearch");
    		location.href = "../report/report!inOutDetail.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
});

function getSelectOrderId() {
	var ids = null;
	var selectData = inOutDetailTable.bootstrapTable('getSelections');
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