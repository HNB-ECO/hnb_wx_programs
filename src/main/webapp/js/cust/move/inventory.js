/**
 * 盘点管理
 */
var $table;
$().ready(function(){
	$table = $('#table');
	$table.bootstrapTable({
        url: "../move/inventory!data.html",//加载数据的url
        uniqueId: "id",
		searchObject: "inventoryOrderSearch.",
        columns : [{
			field: "state",
			checkbox: true
		},{
			field: "id",
		    columnType : "Long",
		    visible: false
    	},{
			field : "customerUser.userName",
			title : "客户名称",
			sortable : true,
			filterControl : "input",
			columnType : "String"
		},{
			field : "orderName",
			title : "盘点单号",
			sortable : true,
			filterControl : "input",
			columnType : "String"
		},{
			field : "orderStatus",
            title : "盘点状态",
        	sortable: true,
            formatter : wcInitOrderStatusFunc,
            filterControl : "select",
        	filterData : orderStatusTypeJson,
            columnType : "Long"
		}
		,
        {
            field : "type",
            title : "类型",
        	sortable: true,
            formatter : wcInitTypeFunc,
            filterControl : "select",
        	filterData : inventoryTypeJson,
            columnType : "Long"
        }, {
			field : "createDate",
			title : "创建日期",
			sortable : true,
			filterControl : "input",
			columnType : "Date"
		}, {
			field : "createUser.userName",
			title : "创建人",
			sortable : true,
			filterControl : "input",
			columnType : "String"
		}, {
			field : "operatorDate",
			title : "盘点日期",
			sortable : true,
			filterControl : "input",
			columnType : "DateTime"
		}, {
			field : "operatorUser.userName",
			title : "盘点人",
			sortable : true,
			filterControl : "input",
			columnType : "String"
		}, {
			field : "reviewDate",
			title : "审核日期",
			sortable : true,
			filterControl : "input",
			columnType : "DateTime"
		}, {
			field : "reviewUser.userName",
			title : "审核人",
			sortable : true,
			filterControl : "input",
			columnType : "String"
		}, {
			field : "note",
			title : "备注",
			sortable : true,
			filterControl : "input",
			columnType : "String"
		} ],
		onDblClickRow: function(row) {
			// 双击加载明细
			showInventoryModal( '../move/inventory!detail.html?inventoryOrderSearch.id=' + row.id);
		}
    });
	
	$("#reviewBtn").on("click", function() {
		var ids = getSignSelectMapOrderId();
		if ( ids==null || ids == "" ) {
			return
		}
		showInventoryModal( '../move/inventory!detail.html?inventoryOrderSearch.id=' + ids);
	})
	
	$("#delInputBut").on("click", function() {
		var ids = getSelectMapOrderId();
		if ( ids==null || ids == "" ) {
			return
		}
		var data = {
			"inventoryOrderSearch.ids":ids
	    };
		$.ajax({
			url:"../move/inventory!del.html",
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
		    		$table.bootstrapTable("refresh");
		    		swal({
						title : "",
						text : "删除成功！",
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
	});
	// 导入按钮点击，显示导入模态框
	$("#importBtn").on("click", function() {
		// 显示模态框
		showInventorySmModal('../move/inventory!importInput.html');
	});
	
	//导出
	$("#reprotInventory").on("click",function(){
		alertConfirm(function(){
        	var params = getExportParams("inventoryOrderSearch");
    		location.href = "../report/report!inventoryReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
});

function getSelectMapOrderId(){
	var ids = null;
	var selectData = $table.bootstrapTable('getSelections');
	if (selectData.length == 0) {
		swal({
			title : "",
			text : "请至少选择一条记录！",
			type : "warning"
		});
		return ids;
	}
	ids = $(selectData).map(function() {
		return this.id;
	}).get().join(',');
	return ids;
}

function getSignSelectMapOrderId(){
	var ids = null;
	var selectData = $table.bootstrapTable('getSelections');
	if (selectData.length != 1) {
		swal({
			title : "",
			text : "请至少选择一条记录！",
			type : "warning"
		});
		return ids;
	}
	ids = $(selectData).map(function() {
		return this.id;
	}).get().join(',');
	return ids;
}

var wcInitTypeFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 0:
		str = "<span class='badge badge-primary'>正常</span>";
		break;
	case 1:
		str = "<span class='badge badge-warning'>盘盈</span>";
		break;
	case 2:
		str = "<span class='badge badge-info'>盘亏</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

var wcInitOrderStatusFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 1:
		str = "<span class='badge badge-warning'>待审核</span>";
		break;
	case 2:
		str = "<span class='badge'>已审核</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

//小模态框
function showInventorySmModal(url){
	$("#inInventorySmModal").removeData("bs.modal");
	$("#inInventorySmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}
// 大模态框
function showInventoryModal(url){
	$("#inInventoryModal").removeData("bs.modal");
	$("#inInventoryModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}
