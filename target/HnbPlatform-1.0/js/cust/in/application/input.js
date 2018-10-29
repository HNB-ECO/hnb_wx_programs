/**
 * 订单明细
 */
var inApplicationInputTable;
$().ready(function() {
	inApplicationInputTable = $('#inApplicationInputTable');
	inApplicationInputTable.bootstrapTable({
		showRefresh: false,
		showColumns: false,
		filterControl: false,
		showTriggerSearch:false,
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
                showbuttons : false,
                defaultValue: '  ',
                inputclass:'input-sm aotoInput',
                validate: function (v) {
                    if (!v) return '比填';
                },
                showAfter : initSuggest
            }
		},
		{
			field: "goods.goodName",
			title: "品项名称",
			columnType: "String"
		},
		{
			field: "originalGoodNum",
			title: "单位数量",
			columnType: "String",
			editable: {
                type: 'text',
                title: '单位数量',
                mode: "inline", 
                validate: function (v) {
                    if (!v) return '比填';
                }
            }
		},
		{
			field: "unit",
			title: "单位",
			columnType: "String"
		},
		{
			field: "originalSingleNum",
			title: "件数",
			columnType: "String",
			editable: {
                type: 'text',
                title: '件数',
                mode: "inline", 
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
                mode: "inline", 
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
        	inApplicationInputTable.bootstrapTable("resetView");
        	return false;
        }
	});

	$('.i-checks').iCheck({
		checkboxClass: 'icheckbox_square-green',
		radioClass: 'iradio_square-green',
	});

	$("#inApplicationAddLine").on("click",function() {
		var data = inApplicationInputTable.bootstrapTable("getData");
	    var rowIndex = data.length;
		//添加行
		var row = {
			"id": rowIndex + 1,
			"goods.goodShortName": "",
			"goods.goodName": "",
			"originalGoodNum": "0",
			"unit": "",
			"originalSingleNum": "0",
			"warehouseType": "",
			"note": ""
		}
		inApplicationInputTable.bootstrapTable('insertRow', {
			index: 0,
			row: row
		});
	});
	
	$("#inApplicationDelLine").on("click",function() {
		//删除行
		 var ids = $.map(inApplicationInputTable.bootstrapTable('getSelections'), function (row) {
             return row.id;
         });
         inApplicationInputTable.bootstrapTable('remove', {
             field: 'id',
             values: ids
         });
	});
});

//初始化插件
function initSuggest(editable) {
	var realInput = editable.input.$input;
	rowIndex = $(realInput).parents('tr[data-index]').data('index');
	$(realInput).after(dropdTownoggle);
	$(realInput).bsSuggest({
		getDataMethod : "url",
		url : "../in/inspection!getWarehousePosition.html?orderSearch.note=",
		allowNoKeyword : false, // 是否允许无关键字时请求数据
		idField : "note",
		keyField : "note",
		showBtn : false,
		listAlign : "right",
		effectiveFields : [ "note", "warehouseName",  "warehouseTypeName" ],
		effectiveFieldsAlias : {
			note : "仓位编号",
			warehouseName : "仓库名称",
			warehouseTypeName : "温层"
		},
		// 调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
		fnAdjustAjaxParam : function(keyword, opts) {
			return {
				timeout : 30000,// 超时时间30秒
			};
		},
		processData : function(json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
			changeSearchObj(json);
			return {
				value : json
			};
		}
	}).on('onSetSelectValue', function(e, keyword) {
		updateRowInspection = searchObj[keyword.id];
	});
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