/**
 * 订单明细
 */
var inventoryDetailTable;
$().ready(function(){
	var toolbar =	[
	        	].join('')
	inventoryDetailTable = $('#inventoryDetailTable')
	inventoryDetailTable.bootstrapTable({
        url: "../move/inventory!detailData.html?inventoryOrderDetailSearch.inventoryOrder.id=" + inOrderId,//加载数据的url
        toolbar: toolbar,
		showFooter: true,
    	uniqueId: "id",
    	searchObject: "inventoryOrderDetailSearch.",
        columns: [{
			field: "id",
		    columnType : "Long",
		     visible: false
    	},{
                field : "inventoryOrder.customerUser.userName",
                title : "客户名称",
                sortable: true,
            	filterControl: "input",
                columnType : "String"
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
                field : "type",
                title : "类型",
            	sortable: true,
                formatter : wcInitTypeFunc,
                filterControl : "select",
            	filterData : inventoryTypeJson,
                columnType : "Long"
            },
            {
                field : "batchNumber",
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
                field : "warehouseNote",
                title : "仓位编码",
            	showTotal : true,
            	filterControl: "input",
                columnType : "String"
            },
            {
                field : "originalNum",
                title : "盘前库存",
            	showTotal : true,
            	filterControl: "input",
                columnType : "Long"
            },
            {
                field : "inventoryNum",
                title : "盘后库存",
            	showTotal : true,
            	filterControl: "input",
                columnType : "Long"
            },
            {
                field : "goodsName.warehouseType",
                title : "温层",
                sortable: true,
                formatter : wcInitFunc,
                filterControl : "select",
                columnType : "Long",
               	filterData : freezeJson
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
	
	//导入模态框中的保存按钮
	$("#inventoryReviewSaveBtn").on("click", function() {
		$.ajax({
			url : "../move/inventory!review.html",
			type : "POST",
			dataType : "json",
			data : {"inventoryOrderSearch.ids":inOrderId},
			beforeSend : function(request) {
				showLoading();
			},
			complete : function() {
				removeLoading();
			},
			success : function(data) {
				if (data.ok) {
					$("#inventoryReviewCloseBtn").click();
					$table.bootstrapTable("refresh");
					swal({
						title : "",
						text : "审核成功！",
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
	})

});
