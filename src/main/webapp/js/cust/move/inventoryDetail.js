/**
 * 库存明细
 */
var $table;

$().ready(function(){
	// 表单样式
	$( '#importInputFile' ).prettyFile();
	$table = $('#table');
	$table.bootstrapTable({
        url: "../move/inventory-detail!data.html",//加载数据的url
        showFooter: true,
        columns : [ {
			field : "user.userName",
			title : "客户名称",
			sortable: true,
			filterControl : "input",
			columnType : "String"
		}, {
			field : "reserveDate",
			title : "入库日期",
			sortable: true,
			sortName: "workOrder.order.reserveDate",
			filterControl: "daterangepicker",
			columnType : "String"
		}, {
			field : "goodsName.goodShortName",
			title : "品项编码",
			sortable: true,
			filterControl : "input",
			columnType : "String"
		}, {
			field : "goodsName.goodName",
			title : "品项名称",
			sortable: true,
			filterControl : "input",
			columnType : "String"
		}, {
			field : "warehousePosition.warehouse.warehouseType",
			title : "温层",
			sortable: true,
			formatter : wcInitFunc,
			filterControl : "select", // 搜索框
			filterData : freezeTypeJson,
			columnType : "Long"
		}, {
			field : "goodsName.packageNum",
			title : "包装数量",
			sortable: true,
			filterControl : "input",
			columnType : "Long"
		}, {
			field : "totalGoodNum",
			title : "数量",
			columnType : "String"
		}, {
			field : "productionDate",
			title : "生产日期",
			sortable: true,
			sortName: "workOrder.productionDate",
			filterControl: "daterangepicker",
			columnType : "String"
		}, {
			field : "shelfDate",
			title : "有效日期",
			sortable: true,
			sortName: "workOrder.shelfDate",
			filterControl: "daterangepicker",
			columnType : "String"
		}, {
			field : "workOrder.batchNumber",
			title : "批次",
			sortable: true,
			filterControl: "input",
			columnType : "String"
		}, {
			field : "warehousePosition.note",
			title : "仓位编号",
			sortable: true,
			filterControl : "input",
			columnType : "String"
		},
		{
			field : "workOrder.platformUser.userName",
			title : "验货员",
			sortable: true,
			filterControl : "select",
			filterData : platformUserJson,
			columnType : "String"
		},{
			field : "workOrder.inspectionUser.userName",
			title : "仓管员",
			sortable: true,
			filterControl : "select", // 搜索框
			filterData : inspectionUserJson,
			columnType : "String"
		}, {
			field : "note",
			title : "备注",
			sortable: true,
			filterControl : "input",
			columnType : "String"
		} ]

    });
	
	$("#exportBtn").on("click", function() {
        alertConfirm(function(){
        	var params = getExportParams("mapWarehousePositionGoodsListSearch");
    		location.href = "../report/report!detailReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	$("#exportInventoryBtn").on("click", function() {
        alertConfirm(function(){
        	var params = getExportParams("mapWarehousePositionGoodsListSearch");
    		location.href = "../report/report!detailInventoryReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	//导入按钮点击，显示导入模态框
	$("#inventoryDetailImportBtn").on("click", function() {
		//显示模态框
		showApplicationSmModal('../move/inventory-detail!importInput.html');
	});
});

//小模态框
function showApplicationSmModal(url){
	$("#inventoryDetailSmModal").removeData("bs.modal");
	$("#inventoryDetailSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}