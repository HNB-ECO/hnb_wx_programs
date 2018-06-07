/**
 * 入库验货
 */
var inPlatformLtlTable;
$().ready(function() {
	inPlatformLtlTable = $('#inPlatformLtlTable');
	inPlatformLtlTable.bootstrapTable({
		url: "../in/platform-ltl!data.html",
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
			field: "orderStatus",
			title: "订单状态",
			formatter: inPlatformStatusInitFunc,
			filterControl: "select",
			//搜索框
			filterData: inOrderStatusJson,
			columnType: "Long"
		},
		{
			field: "platformTime",
			title: "验货日期",
			filterControl: "input",
			columnType: "Date"
		},
		{
			field: "platformUser.userName",
			title: "验货员",
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
			showPlatformLtlModal( '../in/platform-ltl!detail.html?orderSearch.orderId=' + row.orderId);
		}
	});
	
	//导出
	$("#reprotInPlatformLtl").on("click",function(){
		alertConfirm(function(){
        	var params = getExportParams("orderSearch");
    		location.href = "../report/report!platformLtlReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});

	//验货
	$("#platformLtlConfirmBut").on("click", platformLtlInConfirm);
	
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

//预约确认
function platformLtlInConfirm(){
	// 获取表格已选择项数组
	var checkArr = inPlatformLtlTable.bootstrapTable('getSelections');
	if (checkArr.length != 1) {
		swal({
			title : "",
			text : "请选择一条记录！",
			type : "warning"
		});
		return;
	} else {
		//验证选择状态
		var orderStatus = $.map(inPlatformLtlTable.bootstrapTable('getSelections'), function(row) {
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
		deleteOperation(inPlatformLtlTable, checkArr);
		var i = 0;
		$.each(checkArr, function(index,ele){
		   var val = ele.orderId;
	       id += i == 0 ? val : "," + val;
	       i ++;
		});
		var url = "../in/platform-ltl!input.html?orderSearch.orderId=" + id;
		showPlatformLtlModal(url);
	}
}

//小模态框
function showPlatformLtlSmModal(url){
	$("#inPlatformLtlSmModal").removeData("bs.modal");
	$("#inPlatformLtlSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}
//大模态框
function showPlatformLtlModal(url){
	$("#inPlatformLtlModal").removeData("bs.modal");
	$("#inPlatformLtlModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}