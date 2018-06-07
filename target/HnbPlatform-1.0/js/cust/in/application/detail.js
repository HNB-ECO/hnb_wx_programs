/**
 * 订单明细
 */
$().ready(function(){
	$('#inApplicationDetailTable').bootstrapTable({
        url: "../in/application!detailData.html?orderSearch.orderId=" + inOrderId,//加载数据的url
    	showRefresh: false,//刷新
		showColumns: false,//内容列下拉框
		showTriggerSearch:false,
//		pagination: false,//底部分页
		toolbar : "undefined",
//		fixHeader : "40px",
		filterControl : false,
		paginationShow:false,
        columns: [
            {
                field : "order.user.userName",
                title : "客户名称",
                columnType : "String"
            },
            {
                field : "goods.goodShortName",
                title : "品项编码",
                columnType : "String"
            },
            {
                field : "goods.goodName",
                title : "品项名称",
                columnType : "String"
            },{
    			field : "productionDate",
    			title : "生产日期",
    			columnType : "Date"
    		}, {
    			field : "shelfDate",
    			title : "有限日期",
    			columnType : "Date"
    		},{
    			field : "batchNumber",
    			title : "批号",
    			columnType : "String"
    		},
            {
                field : "reserveGoodUnitNum",
                title : "预约数量",
                columnType : "Long"
            },
            {
                field : "warehouseType",
                title : "温层",
                formatter : wcInitFunc,
                columnType : "Long"
            },
            {
                field : "note",
                title : "备注",
                columnType : "String"
            }
        ]
    });
});