//index全局变量
var rowIndex;
// row全局变量
var row;
// 全局table对象
var $table;
function loadData(obj){
	obj.bootstrapTable({
		url:"../fee/customer-fee!data.html",
	    uniqueId: "id",
		columns : [
		{
			field : 'state',
			checkbox : true
		}, {
			field : 'id',
			visible : false,
			filterControl : "input", // 搜索框
			columnType : "Long"
		}, 
		 {
			field : 'user.userId',
			visible : false,
			filterControl : "input", // 搜索框
			columnType : "Long"
		},
		{
			field : 'user.userName',
			title : '客户名称',
			filterControl : "input", // 搜索框
			columnType : "String"
		}, {
			field : 'feeType',
			title : '收费类别',
			formatter : function(value, row, index) {
				var str = "";
				if (row.feeType == 1) {
					str = "<span class='badge badge-primary'>入库收费</span>";
				} else if (row.feeType == 2){
					str = "<span class='badge badge-info'>出库收费</span>";
				}else if (row.feeType  == 3){
					str = "<span class='badge badge-success'>存储收费</span>";
				}else if (row.feeType  == 4){
					str = "<span class='badge badge-warning'>包库收费</span>";
				}else if(row.feeType ==5){
					str="<span class='badge badge-danger'>越库收费</span>"
				}
				return str;
			},
			filterControl : "select",
			filterData : feeTypeData,
			columnType : "Long"
		},
		{
			field:'feeUnit',
			title:'计费单位',
			formatter : function(value, row, index) {
				var str = "";
				if (row.feeUnit == 1) {
					str="<span class='badge badge-primary'>按重收费</span>";
				}else if(row.feeUnit==2){
					str="<span class='badge badge-info'>按板收费</span>";
				}else if(row.feeUnit==3){
					str="<span class='badge badge-success'>按件收费</span>";
				}else if(row.feeUnit==4){
					str="<span class='badge badge-warning'>按单收费</span>";
				}else if(row.feeUnit==5){
					str="<span class='badge badge-success'>按体积收费</span>";
				}else if(row.feeUnit==6){
					str="<span class='badge'>按门店收费</span>";
				}
				return str;
			},
			filterControl : "select",
			filterData : feeUnitData,
			columnType : "Long"
		},
		{
			field:'feeName',
			title:'收费名称',
			filterControl : "input",
			columnType:'String'
		},
		{
			field:'date',
			title:'收费日期',
			filterControl:"daterangepicker",
			columnType:'Date'
		},
		{
			field:'price',
			title:'收费标准',
			filterControl:"input",
			columnType:'Double'
		},
		{
			field:'feeNum',
			title:'收费数量',
			filterControl : "input",
			columnType:'Double'
		},
		{
			field:'amount',
			title:'应收金额',
			filterControl : "input",
			columnType:'Double'
		}
		]
	});
}
$().ready(function() {

	$table = $('#table');
	loadData($table);
	$table.on('all.bs.table', function(e, name, args) {
		console.log('Event:', name, ', data:', args);
	}).on('click-row.bs.table', function(e, row, $element) {
		console.log('Event: click-row.bs.table');
	}).on('dbl-click-row.bs.table', function(e, row, $element) {
		console.log('Event: dbl-click-row.bs.table');
	}).on('sort.bs.table', function(e, name, order) {
		console.log('Event: sort.bs.table');
	}).on('check.bs.table', function(e, row) {
		console.log('Event: check.bs.table');
	}).on('uncheck.bs.table', function(e, row) {
		console.log('Event: uncheck.bs.table');
	}).on('check-all.bs.table', function(e) {
		console.log('Event: check-all.bs.table');
	}).on('uncheck-all.bs.table', function(e) {
		console.log('Event: uncheck-all.bs.table');
	}).on('load-error.bs.table', function(e, status) {
		console.log('Event: load-error.bs.table');
	}).on('column-switch.bs.table', function(e, field, checked) {
		console.log('Event: column-switch.bs.table');
	}).on('page-change.bs.table', function(e, size, number) {
		console.log('Event: page-change.bs.table');
	}).on('search.bs.table', function(e, text) {
		console.log('Event: search.bs.table');
	});

	//导出
	$("#exportFeesearchBtn").on("click",function(){
		alertConfirm(function(){
        	var params = getExportParams("orderSearch");
    		location.href = "../report/report!feeSearchReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
});
