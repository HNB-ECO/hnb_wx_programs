/**
 * 入库办理
 */
var inApplicationTable;
$().ready(function() {
	inApplicationTable = $('#inApplicationTable');
	inApplicationTable.bootstrapTable({
		url: "../in/application!data.html",
		// 加载数据的url
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
			field: "reservationType",
			title: "是否CTM同步",
			visible: false,
			formatter: ctmInitFunc,
			filterControl: "select",
			// 搜索框
			filterData: reservationTypeJson,
			columnType: "Long"
		},
		{
			field: "reservationStatus",
			title: "CTM同步状态",
			visible: false,
			formatter: ctmStatusInitFunc,
			filterControl: "select",
			// 搜索框
			filterData: reservationStatusJson,
			columnType: "Long"
		},
		{
			field: "orderStatus",
			title: "订单状态",
			sortable: true,
			formatter: inOrderStatusInitFunc,
			filterControl: "select",
			// 搜索框
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
			field: "actualTime",
			title: "确认日期",
			sortable: true,
			filterControl: "daterangepicker",
			columnType: "DateTime"
		},
		{
			field: "actualUser.userName",
			title: "确认员",
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
			// 双击加载明细
//			showApplicationModal( '../in/application!detail.html?orderSearch.orderId=' + row.orderId);
		}
	});

	// 导入按钮点击，显示导入模态框
	$("#applicationImportBtn").on("click", function() {
		// 显示模态框
		showApplicationSmModal('../in/application!importInput.html');
	});
	
	// 添加入库单
	$("#addInputBut").on("click",function() {
		// 显示模态框
		showApplicationModal('../in/application!input.html');
	});
	
	// 预约确认
	$("#applicationConfirmBut").on("click", reserveInConfirm);
	
	// 删除
	$("#delInputBut").on("click",function() {
		// 显示模态框
		var orderIds = getSelectOrderId();
		if ( orderIds == null || orderIds == "" ) {
			return;
		}
		var isOk = checkDelOrderStatus();
		if ( !isOk ) {
			return ;
		}
		showApplicationSmModal('../in/application!delInput.html?orderSearch.ids='+orderIds);
	});
	
	//导出
	$("#reprotInSpection").on("click",function(){
		alertConfirm(function(){
        	var params = getExportParams("search");
    		location.href = "../report/report!inApplicationReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	$("#printInReport").on("click", function() {
		var row = inApplicationTable.bootstrapTable('getSelections');
		var ids = "";
		if (row.length != 1) {
			swal({
				title : "",
				text : "请选择一条记录！",
				type : "warning"
			});
			return;
		}
		var isOk = checkOrderStatus();
		if ( !isOk ) {
			return ;
		}
		// 显示模态框
		showApplicationSmModal('../in/application!printInReport.html?orderSearch.orderId=' + row[0].orderId);
	});
	
	$("#printInSpection").on("click", function() {
		var row = inApplicationTable.bootstrapTable('getSelections');
		var ids = "";
		if (row.length != 1) {
			swal({
				title : "",
				text : "请至少一条记录！",
				type : "warning"
			});
			return;
		}
		
		var isOk = checkOrderStatus();
		if ( !isOk ) {
			return ;
		}
		// 显示模态框
		showApplicationSmModal('../in/application!printInSpection.html?orderSearch.orderId=' + row[0].orderId);
	});
	});

// 预约确认
function reserveInConfirm(){
	var ids = getSelectOrderId();
	if ( ids==null || ids == "" ) {
		return
	}
	var data = {
		"orderSearch.ids":ids
    };
	$.ajax({
		url:"../in/application!reserveConfirm.html",
	    type : "POST",
	    dataType:"json",
	    data :data,
	    beforeSend:function(request){
	    	showLoading();
        },
		complete: function() {
			removeLoading();
		},
	    success:function(data){
	    	if( data.ok ){
	    		inApplicationTable.bootstrapTable("refresh");
	    		swal({
					title : "",
					text : "确认成功！",
					type : "success"
				});
	    	} else {
	    		swal({
	                title: "",
	                text: data.message,
	                type: "warning"
	            });
	    	}
	    }
	});
		
}

function checkOrderStatus(){
	var selectData = inApplicationTable.bootstrapTable('getSelections');
	var isOk = true;
	$.each(selectData, function(index,ele){
		var orderStatus = ele.orderStatus;
		if ( 5 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】已作废, 不可打印!",
				type : "warning"
			});
			isOk = false;
			return false;
		}
	});
	return isOk;
}

function checkDelOrderStatus(){
	var selectData = inApplicationTable.bootstrapTable('getSelections');
	var isOk = true;
	$.each(selectData, function(index,ele){
		var orderStatus = ele.orderStatus;
		if ( 5 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】已作废, 不可删除!",
				type : "warning"
			});
			isOk = false;
			return false;
		}
		if ( 2 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】已验货, 不可删除!",
				type : "warning"
			});
			isOk = false;
			return false;
		}
		if ( 3 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】已上架, 不可删除!",
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
	var selectData = inApplicationTable.bootstrapTable('getSelections');
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

// 小模态框
function showApplicationSmModal(url){
	$("#inApplicationSmModal").removeData("bs.modal");
	$("#inApplicationSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}
// 大模态框
function showApplicationModal(url){
	$("#inApplicationModal").removeData("bs.modal");
	$("#inApplicationModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
});
}