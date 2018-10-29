/**
 * 订单明细
 */
$().ready(function(){
	$('#inApplicationDetailTable').bootstrapTable({
        url: "../in/platform!detailData.html?orderSearch.orderId=" + inOrderId,//加载数据的url
    	showRefresh : false,// 刷新
		showColumns : false,// 内容列下拉框
		buttonsToolbar : "toolBar",
		// pagination: false,//底部分页
		// fixHeader : "40px",
		filterControl : false,
		paginationShow:false,
		columns : [ {
			field : "state",
			checkbox : true
		}, {
			field : "goodShortName",
			title : "品项编码",
			columnType : "String"
		}, {
			field : "goodName",
			title : "品项名称",
			columnType : "String"
		}, {
			field : "packageNum",
			title : "包装规格",
			columnType : "Long"
		},
		{
			field : "productionDate",
			title : "生产日期",
			columnType : "String"
		}, {
			field : "shelfDate",
			title : "有限日期",
			columnType : "String"
		},{
			field : "batchNumber",
			title : "批号",
			columnType : "String"
		},{
			field : "warehouseType",
			title : "温层",
			columnType : "Long",
			formatter : wcInitFunc
		},{
			field : "unit",
			title : "单位",
			columnType : "String"
		},{
			field : "realGoodNum",
			title : "箱数",
			columnType : "String"
		},{
			field : "disabledType",
			title : "是否残次",
			columnType : "Long",
			formatter : disabledTypeFunc
		}, {
			field : "note",
			title : "备注",
			columnType : "String"
		}]
    });
});