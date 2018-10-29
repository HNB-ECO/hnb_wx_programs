/**
 * 订单明细
 */
var $table;
$().ready(function() {
	$table = $('#inApplicationLtlInputTable');
	$table.bootstrapTable({
		showRefresh: false,
		showColumns: false,
		filterControl: false,
		toolbar: "undefined",
		buttonsToolbar: "toolBar",
		url: undefined,
		pagination: false,
		uniqueId: "id",
		columns: [{
			field: "state",
			checkbox: true
		},
		{
			field: 'id',
			visible: false,
			columnType: "Long"
		},
		{
			field: "goods.goodShortName",
			title: "品项编码",
			columnType: "String",
			editable: {
                type: 'text',
                title: '品项编码',
                inputclass:'input-sm myClass',
                validate: function (v) {
                    if (!v) return '比填';
                }
            }
		},
		{
			field: "goods.goodName",
			title: "品项名称",
			columnType: "String"
		},
		{
			field: "unit",
			title: "单位",
			columnType: "String"
		},
		{
			field: "originalGoodNum",
			title: "单位数量",
			columnType: "String",
			editable: {
                type: 'text',
                title: '单位数量',
                validate: function (v) {
                    if (!v) return '比填';
                }
            }
		},
		{
			field: "originalSingleNum",
			title: "件数",
			columnType: "String",
			editable: {
                type: 'text',
                title: '件数',
                validate: function (v) {
                    if (!v) return '比填';
                }
            }
		},
		{
			field: "warehouseType",
			title: "温层",
			formatter: wcInitFunc,
			columnType: "Long",
			editable: {
                type: 'text',
                title: '温层',
                validate: function (v) {
                    if (!v) return '比填';
                }
            }
		},
		{
			field: "note",
			title: "备注",
			columnType: "String"
		}],
        onEditableHidden:function(field, row, oldValue, $el){
        	$table.bootstrapTable("resetView");
        	return false;
        }
	});

	$("#inApplicationLtlAddLine").on("click", addInLtlLine);
	$("#inApplicationLtlDelLine").on("click", delInLtlLine);
});

//添加行
function addInLtlLine(){
	var row = {
		"id": 1,
		"goods.goodShortName": "",
		"goods.goodName": "",
		"originalGoodNum": "0",
		"unit": "",
		"originalSingleNum": "0",
		"warehouseType": "",
		"note": ""
	}
	$table.bootstrapTable('insertRow', {
		index: 0,
		row: row
	});
}

//删除行
function delInLtlLine(){
	 var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id;
    });
    $table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
}
//初始化插件
var initSuggest = function() {
	$("#note").bsSuggest({
		getDataMethod: "url",
		url: "../move/inventory!positionNoteFreeze.html?inputValue=",
        allowNoKeyword: false, //是否允许无关键字时请求数据
        idField: "note",
        keyField: "note",
        showBtn: false,
        effectiveFields: ["note", "containerRfid", "goodName"],
        effectiveFieldsAlias: {
            note: "仓位编号",
            containerRfid: "托盘号",
            goodName: "品项名称"
        },
        //调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
        fnAdjustAjaxParam: function(keyword, opts) {
            return {
                timeout: 30000,//超时时间30秒
            };
        },
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
        	changeSearchObj(json);
            return {value: json};
        }
	}).on('onSetSelectValue', function (e, keyword) {
        var obj = searchObj[keyword.id];
        //填充模态框
        $("#goodNameId").val(obj.goodNameId);
        $("#goodName").val(obj.goodName);
        $("#maxNum").val(obj.maxNum);
        $("#originalNum").val(obj.originalNum);
        $("#containerRfid").val(obj.containerRfid);
        $("#positionsId").val(obj.positionsId);
        $("#containerId").val(obj.containerId);
        $("#workOrderId").val(obj.workOrderId);
        $("#workOrderNo").val(obj.workOrderNo);
    });
	//调整搜索框的样式
	var $suggestInput = $("#addModal input:first");
	$suggestInput.attr("style", "");
	$suggestInput.parent().attr("style", "");
}

//根据仓位编号搜索得到数组来json对象
var changeSearchObj = function(arr) {
	searchObj = {};
	if (arr.length == 0) {
		return;
	}
	for (var index in arr) {
		var obj = arr[index];
		searchObj[obj.note] = obj;
	}
}