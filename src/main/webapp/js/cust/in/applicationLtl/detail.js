/**
 * 订单明细
 */
$().ready(function(){
	$('#inApplicationLtlDetailTable').bootstrapTable({
        url: "../in/application-ltl!detailData.html?orderSearch.orderId=" + inOrderId,//加载数据的url
    	showRefresh: false,//刷新
		showColumns: false,//内容列下拉框
//		pagination: false,//底部分页
		toolbar: "undefined",
		buttonsToolbar: "toolBar",
//		fixHeader : "40px",
		filterControl : false,
        columns: [
            {
                field : "goods.goodShortName",
                title : "品项编码",
                columnType : "String"
            },
            {
                field : "goods.goodName",
                title : "品项名称",
                columnType : "String"
            },
            {
                field : "warehouseType",
                title : "温层",
                formatter : wcInitFunc,
                columnType : "Long"
            },
            {
                field : "goods.goodUnit",
                title : "单位",
                columnType : "String"
            },
            {
                field : "originalGoodNum",
                title : "预约数量",
                columnType : "String"
            },
            {
                field : "originalSingleNum",
                title : "预约件数",
                columnType : "String"
            },
            {
                field : "goodNum",
                title : "实际数量",
                columnType : "String"
            },
            {
                field : "singleNum",
                title : "实际件数",
                columnType : "String"
            },
            {
                field : "note",
                title : "备注",
                columnType : "String"
            }
        ]
    });
});