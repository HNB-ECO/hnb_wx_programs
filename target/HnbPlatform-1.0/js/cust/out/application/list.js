/**
 * 入库办理
 */
var outApplicationTable;
$().ready(function() {
	outApplicationTable = $('#outApplicationTable');
	outApplicationTable.bootstrapTable({
		url: "../out/application!data.html",
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
			title: "出库单号",
			filterControl: "input",
			sortable: true,
			columnType: "String"
		},
		{
			field: "user.userName",
			title: "客户名称",
			filterControl: "input",
			sortable: true,
			columnType: "String"
		},
		{
			field: "reserveDate",
			title: "预约日期",
			filterControl: "daterangepicker",
			sortable: true,
			columnType: "Date"
		},
		{
			field: "totalMapOrderGoodsNum",
			title: "预约总数",
			columnType: "Long"
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
			field: "actualTime",
			title: "确认日期",
			filterControl: "daterangepicker",
			sortable: true,
			columnType: "DateTime"
		},
		{
			field: "actualUser.userName",
			title: "确认员",
			filterControl: "input",
			sortable: true,
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
			showApplicationModal( '../out/application!detail.html?orderSearch.ids=' + row.orderId);
		}
	});

	//导入按钮点击，显示导入模态框
	$("#applicationImportBtn").on("click", function() {
		//显示模态框
		showApplicationSmModal('../out/application!importInput.html');
	});
	
	//添加入库单
	$("#addInputBut").on("click",function() {
		//显示模态框
		showApplicationModal('../out/application!input.html');
	});
	
	//导出
	$("#reprotOutSpection").on("click",function(){
		alertConfirm(function(){
        	var params = getExportParams("orderSearch");
    		location.href = "../report/report!outApplicationReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	//预约确认
	$("#applicationConfirmBut").on("click", reserveInConfirm);
	
	//编辑订单
	$("#editInputBut").on("click", editInputFun);
	
	//删除订单
	$("#delInputBut").on("click", delInputFun);
	
	//确认出库
	$("#platformBut").on("click", platformFun)
	
		//回滚
	$("#resetBut").on("click", resetOrderFun)
	
	//送货单
	$("#deliveryInputBut").on("click", deliveryInputFun);
	
	//生成总拣
	$("#inspectionBut").on("click", inspectionFun);
;
});

function editInputFun(){
	var row = outApplicationTable.bootstrapTable('getSelections');
	if (row.length != 1) {
		swal({
			title : "",
			text : "请选择一条记录！",
			type : "warning"
		});
		return;
	}
	var isOk = checkEditOrderStatus();
	if ( !isOk ) {
		return ;
	}
	// 显示模态框
	showApplicationModal('../out/application!editInput.html?orderSearch.orderId=' + row[0].orderId);
}

function delInputFun(){
	var ids = getSelectOrderId();
	if ( ids==null || ids == "" ) {
		return ;
	}
	var isOk = checkDelOrderStatus();
	if ( !isOk ) {
		return ;
	}
	// 显示模态框
	showApplicationSmModal('../out/application!delInput.html?orderSearch.ids=' + ids);
}


function deliveryInputFun(){
	var row = outApplicationTable.bootstrapTable('getSelections');
	if (row.length < 1) {
		swal({
			title : "",
			text : "请选择一条记录！",
			type : "warning"
		});
		return;
	}
	var isOk = checkDeliveryOrderStatus();
	if ( !isOk ) {
		return ;
	}
	showApplicationModal( '../out/application!detail.html?orderSearch.ids=' + getSelectOrderId());
}

function inspectionFun(){
	var row = outApplicationTable.bootstrapTable('getSelections');
	if (row.length != 1) {
		swal({
			title : "",
			text : "请选择一条记录！",
			type : "warning"
		});
		return;
	}
	var ids = getSelectOrderId();
	var isOk = checkInspectionOrderStatus();
	if (!isOk) {
		return ;
	}
	var data = {
		"orderSearch.ids" : ids
	};
	$.ajax({
		url : "../out/application!inspection.html",
		type : "POST",
		dataType : "json",
		data : data,
		beforeSend : function(request) {
			showLoading();
		},
		complete : function() {
			removeLoading();
		},
		success : function(data) {
			if (data.ok) {
				outApplicationTable.bootstrapTable("refresh");
				swal({
					title : "",
					text : "生成成功！",
					type : "success"
				});
			} else {
				swal({
					title : "",
					text : data.message,
					type : "warning"
				});
			}
		}
	});
}

function resetOrderFun(){
	var ids = getSelectOrderId();
	if ( ids==null || ids == "" ) {
		return ;
	}
	var isOk = checkResetOrderStatus();
	if (!isOk) {
		return ;
	}
	var data = {
		"orderSearch.ids" : ids
	};
	$.ajax({
		url : "../out/application!resetOrder.html",
		type : "POST",
		dataType : "json",
		data : data,
		beforeSend : function(request) {
			showLoading();
		},
		complete : function() {
			removeLoading();
		},
		success : function(data) {
			if (data.ok) {
				outApplicationTable.bootstrapTable("refresh");
				swal({
					title : "",
					text : "确认成功！",
					type : "success"
				});
			} else {
				swal({
					title : "",
					text : data.message,
					type : "warning"
				});
			}
		}
	});
}

function platformFun(){
	var ids = getSelectOrderId();
	if ( ids==null || ids == "" ) {
		return ;
	}
	var isOk = checkPlatformOrderStatus();
	if (!isOk) {
		return ;
	}
	var data = {
		"orderSearch.ids" : ids
	};
	$.ajax({
		url : "../out/application!platform.html",
		type : "POST",
		dataType : "json",
		data : data,
		beforeSend : function(request) {
			showLoading();
		},
		complete : function() {
			removeLoading();
		},
		success : function(data) {
			if (data.ok) {
				outApplicationTable.bootstrapTable("refresh");
				swal({
					title : "",
					text : "确认成功！",
					type : "success"
				});
			} else {
				swal({
					title : "",
					text : data.message,
					type : "warning"
				});
			}
		}
	});
}

function checkDeliveryOrderStatus() {
	var selectData = outApplicationTable.bootstrapTable('getSelections');
	var isOk = true;
	$.each(selectData,
			function(index, ele) {
				var orderStatus = ele.orderStatus;
				if (15 == orderStatus) {
					swal({
						title : "",
						text : "订单【" + ele.orderName + "】已作废, 请确认!",
						type : "warning"
					});
					isOk = false;
					return false;
				} else if (10 == orderStatus || 11 == orderStatus) {
					swal({
						title : "",
						text : "订单【" + ele.orderName + "】状态不正确, 请选择已生成的订单！",
						type : "warning"
					});
					isOk = false;
					return false;
				}
			});
	return isOk;
}

function checkResetOrderStatus(){
	var selectData = outApplicationTable.bootstrapTable('getSelections');
	var isOk = true;
	$.each(selectData, function(index,ele){
		var orderStatus = ele.orderStatus;
		if ( 15 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】已作废, 请确认!",
				type : "warning"
			});
			isOk = false;
			return false;
		} else if ( 10 == orderStatus || 11 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】状态不正确, 当前订单不可回滚！",
				type : "warning"
			});
			isOk = false;
			return false;
		}
	});
	return isOk;
}

function checkPlatformOrderStatus(){
	var selectData = outApplicationTable.bootstrapTable('getSelections');
	var isOk = true;
	$.each(selectData, function(index,ele){
		var orderStatus = ele.orderStatus;
		if ( 15 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】已作废, 请确认!",
				type : "warning"
			});
			isOk = false;
			return false;
		} else if ( 12 != orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】状态不正确, 请选择已生成的订单！",
				type : "warning"
			});
			isOk = false;
			return false;
		}
	});
	return isOk;
}

function checkInspectionOrderStatus(){
	var selectData = outApplicationTable.bootstrapTable('getSelections');
	var isOk = true;
	$.each(selectData, function(index,ele){
		var orderStatus = ele.orderStatus;
		if ( 15 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】已作废, 请确认!",
				type : "warning"
			});
			isOk = false;
			return false;
		} else if ( 11 != orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】状态不正确, 请选择已导入的订单！",
				type : "warning"
			});
			isOk = false;
			return false;
		}
	});
	return isOk;
}

function checkEditOrderStatus(){
	var selectData = outApplicationTable.bootstrapTable('getSelections');
	var isOk = true;
	$.each(selectData, function(index,ele){
		var orderStatus = ele.orderStatus;
		if ( 15 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】已作废, 请确认!",
				type : "warning"
			});
			isOk = false;
			return false;
		} else if( 11 != orderStatus ) {
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】状态不正确, 请选择已导入的订单!",
				type : "warning"
			});
			isOk = false;
			return false;
		}
	});
	return isOk;
}

function checkReserveOrderStatus(){
	var selectData = outApplicationTable.bootstrapTable('getSelections');
	var isOk = true;
	$.each(selectData, function(index,ele){
		var orderStatus = ele.orderStatus;
		if ( 15 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】已作废, 请确认!",
				type : "warning"
			});
			isOk = false;
			return false;
		} else if ( 10 != orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】状态不正确, 请选择已预约的订单!",
				type : "warning"
			});
			isOk = false;
			return false;
		}
	});
	return isOk;
}

function checkDelOrderStatus(){
	var selectData = outApplicationTable.bootstrapTable('getSelections');
	var isOk = true;
	$.each(selectData, function(index,ele){
		var orderStatus = ele.orderStatus;
		if ( 15 == orderStatus ){
			swal({
				title : "",
				text : "订单【" + ele.orderName + "】已作废, 请确认!",
				type : "warning"
			});
			isOk = false;
			return false;
		}
		if ( 11 != orderStatus ){
			swal({
				title : "",
				text : "请选择订单状态【已导入】的订单, 请确认!",
				type : "warning"
			});
			isOk = false;
			return false;
		}
	});
	return isOk;
}

//预约确认
function reserveInConfirm() {
	// 获取表格已选择项数组
	var ids = getSelectOrderId();
	if ( ids==null || ids == "" ) {
		return ;
	}
	var isOk = checkReserveOrderStatus();
	if (!isOk) {
		return ;
	}
	var data = {
		"orderSearch.ids" : ids
	};
	$.ajax({
		url : "../out/application!reserveConfirm.html",
		type : "POST",
		dataType : "json",
		data : data,
		beforeSend : function(request) {
			showLoading();
		},
		complete : function() {
			removeLoading();
		},
		success : function(data) {
			if (data.ok) {
				outApplicationTable.bootstrapTable("refresh");
				swal({
					title : "",
					text : "确认成功！",
					type : "success"
				});
			} else {
				swal({
					title : "",
					text : data.message,
					type : "warning"
				});
			}
		}
	});

}

function getSelectOrderId(){
	var ids = null;
	var selectData = outApplicationTable.bootstrapTable('getSelections');
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

//小模态框
function showApplicationSmModal(url){
	$("#outApplicationSmModal").removeData("bs.modal");
	$("#outApplicationSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}
//大模态框
function showApplicationModal(url){
	$("#outApplicationModal").removeData("bs.modal");
	$("#outApplicationModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}