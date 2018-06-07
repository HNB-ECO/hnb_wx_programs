/**
 * 订单明细
 */
$().ready(function(){
	$('#inApplicationDetailTable').bootstrapTable({
        url: "../in/application!detailData.html?orderSearch.orderId=" + inOrderId,//加载数据的url
    	showRefresh: false,//刷新
		showColumns: false,//内容列下拉框
//		pagination: false,//底部分页
		toolbar : "undefined",
//		fixHeader : "40px",
		filterControl : false,
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
            },
            {
                field : "reserveGoodNum",
                title : "预约数量",
                columnType : "String"
            },
            {
                field : "realGoodNum",
                title : "实际数量",
                columnType : "String"
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