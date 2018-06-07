/**
 * 订单明细
 */
var outTotalPickingTable;
$().ready(function(){
	var toolbar =	[
	        	     '<div id="toolbar" class="float-e-margins" style="padding-bottom: 1px;">',
	        	     '<button id="printTotalPickingInputBut" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-print"></span>&nbsp;总拣单</button>',
	        	     '</div>'
	        	].join('')
	 outTotalPickingTable = $('#outTotalPickingTable');
	outTotalPickingTable.bootstrapTable({
        url: "../out/total-picking!detailData.html?orderSearch.ids=" + inOrderId,//加载数据的url
        toolbar: toolbar,
		showFooter: false,
    	uniqueId: "id",
    	searchObject: "mapManageContainerSearch.",
        columns: [{
				field: "state",
				checkbox: true
	    	},{
				field: "id",
			    columnType : "Long",
			    visible: false
	    	},
            {
                field : "workOrder.user.userName",
                title : "客户名称",
                sortable: true,
                filterControl: "input",
                columnType : "String"
            },
            {
                field : "goodsName.warehouseType",
                title : "温层",
            	sortable: true,
                formatter : wcInitFunc,
                filterControl : "select",
            	filterData : freezeJson,
                columnType : "Long"
            },
            {
                field : "goodsName.goodShortName",
                title : "品项编码",
                sortable: true,
                filterControl: "input",
                columnType : "String"
            },
            {
                field : "goodsName.goodName",
                title : "品项名称",
                sortable: true,
                filterControl: "input",
                columnType : "String"
            },
            {
                field : "workOrder.productionDate",
                title : "生产日期",
                sortable: true,
                filterControl: "input",
                columnType : "Date"
            },
            {
                field : "workOrder.shelfDate",
                title : "有效日期",
                sortable: true,
                filterControl: "input",
                columnType : "Date"
            },
            {
                field : "workOrder.batchNumber",
                title : "批号",
                sortable: true,
                filterControl: "input",
                columnType : "String"
            },
            {
                field : "goodsName.packageNum",
                title : " 包装规格",
                sortable: true,
                filterControl: "input",
                columnType : "Long"
            },
            {
                field : "realOutTotalGoodNum",
                title : "数量",
                columnType : "String"
            },
            {
                field : "warehousePosition.note",
                title : "仓位编码",
                filterControl: "input",
                sortable: true,
                columnType : "String"
            },
            {
                field : "note",
                title : "备注",
                filterControl: "input",
                sortable: true,
                columnType : "String"
            }
        ]
    });
	
	//送货单
	$("#printTotalPickingInputBut").on("click", printTotalPickingInpuFun);
});

function printTotalPickingInpuFun() {
	var newData = {
		"mapManageContainerSearch.workOrder.order.ids" : inOrderId
	};
	var row = outTotalPickingTable.bootstrapTable('getSelections');
	var filterColumnsPartial = outTotalPickingTable
			.bootstrapTable('getFilterColumnsPartial');
	if (!($.isEmptyObject(filterColumnsPartial))) {
		var filterColumnsPartialData = JSON.stringify(filterColumnsPartial,
				null);
		if (filterColumnsPartialData != undefined) {
			var filter = JSON.parse(filterColumnsPartialData);
			var i = 0;
			for ( var key in filter) {
				if ("state" == key && i == 0) {
					continue;
				}
				i++;
				newData["mapManageContainerSearch." + key] =  $.trim(filter[key]);
			}
		}
	}
	for (var i = 0; i < row.length; i++) {
		var detail = row[i];
		var detailKey = "mapManageContainerSearch.idList[" + i + "]";
		newData[detailKey] = detail["id"];
	}
	// 显示模态框
	showTotalPickingSmModal('../out/total-picking!printTotalPicking.html?'
			+ $.param(newData));
}