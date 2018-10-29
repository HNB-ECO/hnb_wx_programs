/**
 * 订单明细
 */
$().ready(function(){
	$('#inInspectionDetailTable').bootstrapTable({
        url: "../in/inspection!detailData.html?orderSearch.orderId=" + inOrderId,//加载数据的url
    	showRefresh : false,// 刷新
		showColumns : false,// 内容列下拉框
		buttonsToolbar : "toolBar",
		// pagination: false,//底部分页
		// fixHeader : "40px",
		filterControl : false,
		paginationShow : false,
		columns : [ {
			field : 'id',
			visible : false,
			columnType : "Long"
		}, {
			field : 'goodsName.goodNameId',
			visible : false,
			columnType : "Long"
		}, {
			field : 'mergeContainerType',
			visible : false,
			columnType : "Long"
		}, {
			field : "goodsName.goodShortName",
			title : "品项编码",
			columnType : "String"
		}, {
			field : "goodsName.goodName",
			title : "品项名称",
			columnType : "String"
		}, {
			field : "goodsName.packageNum",
			title : "包装规格",
			columnType : "Long"
		}, {
			field : "workOrder.productionDate",
			title : "生产日期",
			columnType : "date"
		}, {
			field : "workOrder.shelfDate",
			title : "有限日期",
			columnType : "date"
		}, {
			field : "workOrder.batchNumber",
			title : "批号",
			columnType : "String"
		}, {
			field : "realGoodNum",
			title : "数量",
			columnType : "String"
		}, {
			field : "warehousePosition.warehouse.warehouseType",
			title : "温层",
			columnType : "Long",
			formatter : wcInitFunc
		}, {
			field : "container.containerRfid",
			title : "托盘号",
			columnType : "String",
			formatter : function(value, row, index) {
				if (value == null) {
					return "";
				}
				if ( row.mergeContainerType == 1 ) {
					return  '<span class="label label-danger">' + value  + '</span>';
				}
				return value ;
			}
		},{
			field : "warehousePosition.note",
			title : "仓位编码",
			columnType : "String"
		},{
			field : "note",
			title : "备注",
			columnType : "String"
		} ]
    });
});