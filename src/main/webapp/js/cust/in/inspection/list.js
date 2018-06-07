/**
 * 入库验货
 */
var inInspectionTable;
$().ready(function() {
	inInspectionTable = $('#inInspectionTable');
	inInspectionTable.bootstrapTable({
		url: "../in/inspection!data.html",
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
			field: "totalNum",
			title: "实收总数",
			columnType: "Long"
		},
		{
			field: "orderStatus",
			title: "订单状态",
			sortable: true,
			formatter: inInspectionStatusInitFunc,
			filterControl: "select",
			filterData: inOrderStatusJson,
			columnType: "Long"
		},{
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
			field: "arriveTime",
			title: "上架日期",
			sortable: true,
			filterControl: "daterangepicker",
			columnType: "DateTime"
		},
		{
			field: "arriveUser.userName",
			title: "仓管员",
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
			showInspectionModal( '../in/inspection!detail.html?orderSearch.orderId=' + row.orderId);
		}
	});

	//验货
	$("#inspectionConfirmBut").on("click", inspectionInConfirm);
	
	//导出
	$("#reportInspection").on("click",function(){
		alertConfirm(function(){
	    	var params = getExportParams("orderSearch");
			location.href = "../report/report!inspectionReport.html?" + $.param(params);
			alertSuccess("导出成功");
	    }, "您确定要导出这些记录吗？");
	});
});


/**
 * 上架状态
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var inInspectionStatusInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 2:
		str = "<span class='badge badge-warning'>待上架</span>";
		break;
	case 3:
		str = "<span class='badge '>已上架</span>";
		break;
	case 4:
		str = "<span class='badge '>已上架</span>";
		break;
	case 5:
		str = "<span class='badge '>已上架</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

//预约确认
function inspectionInConfirm(){
	// 获取表格已选择项数组
	var checkArr = inInspectionTable.bootstrapTable('getSelections');
	if (checkArr.length != 1) {
		swal({
			title : "",
			text : "请选择一条记录！",
			type : "warning"
		});
		return;
	} else {
		//验证选择状态
		var orderStatus = $.map(inInspectionTable.bootstrapTable('getSelections'), function(row) {
			return row.orderStatus;
		});
		//
		if(2 != orderStatus){
			swal({
				title : "",
				text : "订单已上架，请选择未上架的订单!",
				type : "warning"
			});
			return;
		}
		var id = "";
		deleteOperation(inInspectionTable, checkArr);
		var i = 0;
		$.each(checkArr, function(index,ele){
		   var val = ele.orderId;
	       id += i == 0 ? val : "," + val;
	       i ++;
		});
		var url = "../in/inspection!input.html?orderSearch.orderId=" + id;
		showInspectionModal(url);
	}
}

//小模态框
function showInspectionSmModal(url){
	$("#inInspectionSmModal").removeData("bs.modal");
	$("#inInspectionSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}
//大模态框
function showInspectionModal(url){
	$("#inInspectionModal").removeData("bs.modal");
	$("#inInspectionModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}