/**
 * 入库办理
 */
var inApplicationLtlTable;
$().ready(function() {
	inApplicationLtlTable = $('#inApplicationLtlTable');
	inApplicationLtlTable.bootstrapTable({
		url: "../in/application-ltl!data.html",
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
			field: "originPlace",
			title: "始发地",
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "destinationPlace",
			title: "目的地",
			filterControl: "input",
			columnType: "String"
		},
		{
			field: "orderStatus",
			title: "订单状态",
			formatter: inOrderStatusInitFunc,
			filterControl: "select",
			//搜索框
			filterData: inOrderStatusJson,
			columnType: "Long"
		},
		{
			field: "orderType",
			title: "订单类型",
			formatter: inLtlOrderTypeInitFunc,
			filterControl: "select",
			//搜索框
			filterData: inLtlOrderTypeJson,
			columnType: "Long"
		},
		{
			field: "actualTime",
			title: "确认日期",
			filterControl: "input",
			columnType: "Date"
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
			showapplicationLtlModal( '../in/application-ltl!detail.html?orderSearch.orderId=' + row.orderId);
		}
	});

	//导出
	$("#reportInApplicationLtl").on("click",function(){
		alertConfirm(function(){
	    	var params = getExportParams("orderSearch");
			location.href = "../report/report!applicationLtlReport.html?" + $.param(params);
			alertSuccess("导出成功");
	    }, "您确定要导出这些记录吗？");
	});
	
	//导入按钮点击，显示导入模态框
	$("#applicationLtlImportBtn").on("click", function() {
		//显示模态框
		showapplicationLtlSmModal('../in/application-ltl!importInput.html');
	});
	
	//添加入库单
	$("#addLtlInputBut").on("click",function() {
		//显示模态框
		showapplicationLtlModal('../in/application-ltl!input.html');
	});
});


/**
 * 入库订单类型
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var inLtlOrderTypeInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 5:
		str = "零担入库";
		break;
	default:
		str = "";
		break;
	}
    return str;
}


//小模态框
function showapplicationLtlSmModal(url){
	$("#inApplicationLtlSmModal").removeData("bs.modal");
	$("#inApplicationLtlSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}
//大模态框
function showapplicationLtlModal(url){
	$("#inApplicationLtlModal").removeData("bs.modal");
	$("#inApplicationLtlModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}