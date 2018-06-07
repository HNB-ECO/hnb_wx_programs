/**
 * 订单明细
 */
var outApplicationDetailTable;
$().ready(function(){
	var toolbar =	[
	        	     '<div id="toolbar" class="float-e-margins" style="padding-bottom: 1px;">',
	        	     '<button id="deliveryDetailInputBut" type="button" class="btn btn-success btn-sm"><span class="glyphicon glyphicon-print"></span>&nbsp;送货单</button>',
	        	     '</div>'
	        	].join('')
	outApplicationDetailTable = $('#outApplicationDetailTable')
	outApplicationDetailTable.bootstrapTable({
        url: "../out/application!detailData.html?orderGoodsSearch.order.ids=" + $("#inOrderId").val(),//加载数据的url
//      	showRefresh: false,//刷新
//		showColumns: false,//内容列下拉框
//		showTriggerSearch:false,
//		pagination: false,//底部分页
        toolbar: toolbar,
		showFooter: true,
//		fixHeader : "40px",
//		filterControl : false,
//		paginationShow:false,
    	uniqueId: "id",
    	searchObject: "orderGoodsSearch.",
        columns: [{
			field: "state",
			checkbox: true
    	},{
			field: "id",
		    columnType : "Long",
		    visible: false
    	},
            {
                field : "order.user.userName",
                title : "客户名称",
                sortable: true,
            	filterControl: "input",
                columnType : "String"
            },
            {
                field : "store.storeNum",
                title : "门店代码",
                sortable: true,
            	filterControl: "input",
                columnType : "String"
            },
            {
                field : "store.storeName",
                title : "门店名称",
                sortable: true,
            	filterControl: "input",
                columnType : "String"
            },
            {
                field : "goods.goodShortName",
                title : "品项编码",
                sortable: true,
            	filterControl: "input",
                columnType : "String"
            },
            {
                field : "goods.transiType",
                title : "是否中转",
                sortable: true,
                formatter : function (value, row, index) {
                    var str = "";
                    if (value == 2) {
                        str = "<span class='badge badge-primary'>是</span>";
                    } else {
                        str = "<span class='badge badge-danger'>否</span>";
                    }
                    return str;
                },
                columnType : "Long",
                filterControl : "select",
    			filterData : 'json:'+$("#outApplicationModal #transiTypeJson").val()
            },
            {
                field : "goods.goodName",
                title : "品项名称",
                sortable: true,
            	filterControl: "input",
                columnType : "String"
            },
            {
                field : "productionDate",
                title : "生产日期",
                sortable: true,
            	filterControl: "input",
                columnType : "Date"
            },
            {
                field : "shelfDate",
                title : "有效日期",
                sortable: true,
            	filterControl: "input",
                columnType : "Date"
            },
            {
                field : "batchNumber",
                title : "批号",
                sortable: true,
            	filterControl: "input",
                columnType : "String"
            },
            {
                field : "goods.packageNum",
                title : " 包装规格",
                sortable: true,
            	filterControl: "input",
                columnType : "Long"
            },
            {
                field : "reserveGoodNum",
                title : "数量",
            	showTotal : true,
                columnType : "String"
            },
            {
                field : "warehouseType",
                title : "温层",
                sortable: true,
                formatter : wcInitFunc,
                columnType : "Long",
                filterControl : "select",
                filterData : 'json:'+$("#outApplicationModal #freezeJson").val()
            },
            {
                field : "note",
                title : "备注",
                sortable: true,
            	filterControl: "input",
                columnType : "String"
            }
        ]
    });
	
	//送货单
	$("#deliveryDetailInputBut").on("click", deliveryDetailInputFun);
});

function deliveryDetailInputFun() {
	var newData = {
		"orderGoodsSearch.order.ids" : $("#inOrderId").val()
	};
	var filterColumnsPartial = outApplicationDetailTable.bootstrapTable('getFilterColumnsPartial');
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
				newData["orderGoodsSearch." + key] = $
						.trim(filter[key]);
			}
		}
	}
	var row = outApplicationDetailTable.bootstrapTable('getSelections');
	for (var i = 0; i < row.length; i++) {
		var detail = row[i];
		var detailKey = "orderGoodsSearch.idList[" + i + "]";
		newData[detailKey] = detail["id"];
	}
	// 显示模态框
	showApplicationSmModal('../out/application!printDeliveryInput.html?'
			+ $.param(newData));
}

function getutApplicationDetailTableSelectId(){
	var ids = null;
	var selectData = outApplicationDetailTable.bootstrapTable('getSelections');
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