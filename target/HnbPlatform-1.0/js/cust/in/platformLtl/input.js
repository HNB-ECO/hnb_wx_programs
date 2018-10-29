/**
 * 订单明细
 */
var searchPlatformLtlObj;
var updateRowPlatformLtl;
var rowIndex;
var inPlatformLtlInputTable;
$().ready(function() {
	var orderId = $("#inPlatformLtlOrderId").val();
	inPlatformLtlInputTable = $('#inPlatformLtlInputTable')
	inPlatformLtlInputTable.bootstrapTable({
		url : "../in/platform-ltl!inputData.html?orderSearch.orderId=" + orderId,// 加载数据的url
		showRefresh : false,// 刷新
		showColumns : false,// 内容列下拉框
		buttonsToolbar : "toolBar",
		// pagination: false,//底部分页
		// fixHeader : "40px",
		filterControl : false,
		columns : [ {
			field : "state",
			checkbox : true
		}, {
			field : 'goodNameId',
			visible : false,
			columnType : "Long"
		}, {
			field : "goodShortName",
			title : "品项编码",
			columnType : "String",
			editable : {
				type : 'text',
				title : '品项编码',
				inputclass : 'input-sm myClass',
				validate : function(v) {
					if (!v)
						return '比填';
				}, 
				showAfter : initGoodShortSuggest
			}
		}, {
			field : "goodName",
			title : "品项名称",
			columnType : "String"
		}, {
			field : "unit",
			title : "单位",
			columnType : "String"
		},{
			field : "goodNum",
			title : "单位数量",
			columnType : "Long",
			editable : {
				type : 'text',
				title : '单位数量',
				inputclass : 'input-sm myClass',
				validate : function(v) {
					if (!v)
						return '比填';
				}
			}
		}, {
			field : "singleNum",
			title : "件数",
			columnType : "Long",
			editable : {
				type : 'text',
				title : '件数',
				validate : function(v) {
					if (!v)
						return '比填';
				}
			}
		}, {
			field : "conRfid",
			title : "托盘号",
			columnType : "String"
		}, {
			field : "note",
			title : "备注",
			columnType : "String"
		} ],
		onEditableHidden : function(field, row, oldValue, $el) {
			if("goodShortName" == field ){
				var updateRow = {
					"goodShortName" : updateRowPlatformLtl.goodShortName,
					"goodName" : updateRowPlatformLtl.goodName,
					"unit" : updateRowPlatformLtl.goodUnit
				}
				updateInPlatformLtlTableRow(updateRow);
			}
			return false;
		}
	});

	$("#inPlatformLtlAddLine").on("click", addPlatformLtlLine);
	$("#inPlatformLtlDelLine").on("click", delPlatformLtlLine);
	$("#saveInPlatformLtlBut").on("click", subInPlatformLtlFrom);

});

function updateInPlatformLtlTableRow(row){
	inPlatformLtlInputTable.bootstrapTable("updateRow",{
		index : rowIndex,
		row : row
	});
}

function subInPlatformLtlFrom() {
	var newData = {
		"platformInData.orderId" : $("#inPlatformLtlOrderId").val(),
		"platformInData.end" : true
	}
	var data = inPlatformLtlInputTable.bootstrapTable("getData");
	for (var i = 0; i < data.length; i++) {
		var detail = data[i];
		var detailKey = "platformInData.detailList[" + i + "]"
		for ( var key in detail) {
			var value = detail[key];
			var newDetailKey = detailKey + "." + key;
			newData[newDetailKey] = value;
		}
	}
	$.ajax({
		url:"../in/platform-ltl!save.html",
	    type : "POST",
	    dataType:"json",
	    data :newData,
	    beforeSend:function(request){
	    	showLoading();
        },
		complete: function() {
			removeLoading();
		},
	    success:function(data){
	    	if( data.ok ){
	    		inPlatformLtlInputTable.bootstrapTable("refresh");
	    		swal({
					title : "",
					text : "确认成功！",
					type : "success"
				});
	    	} else {
	    		swal({
	                title: "",
	                text: data.message,
	                type: "warning"
	            });
	    	}
	    }
	});
	
}

function addPlatformLtlLine() {
	// 添加行
	var row = {
		"id" : 1,
		"goods.goodShortName" : "",
		"goods.goodName" : "",
		"originalGoodNum" : "0",
		"unit" : "",
		"originalSingleNum" : "0",
		"warehouseType" : "",
		"note" : ""
	}
	inPlatformLtlInputTable.bootstrapTable('insertRow', {
		index : 0,
		row : row
	});

	initSuggest();
}

function delPlatformLtlLine() {
	// 删除行
	var ids = $.map($table.bootstrapTable('getSelections'), function(row) {
		return row.id;
	});
	$table.bootstrapTable('remove', {
		field : 'id',
		values : ids
	});
}

//初始化插件
function initGoodShortSuggest(editable){
	var realInput = editable.input.$input;
	rowIndex = $(realInput).parents('tr[data-index]').data('index');
	$(realInput).after(dropdTownoggle);
	$(realInput).bsSuggest({
		getDataMethod : "url",
		url : "../in/platform-ltl!getUserGoods.html?customerGoodsSearch.customer.userId=" + customerId + "&customerGoodsSearch.goods.goodShortName=",
		allowNoKeyword : false, // 是否允许无关键字时请求数据
		idField : "goodShortName",
		keyField : "goodShortName",
		showBtn : false,
		effectiveFields : [ "goodShortName", "goodName",  "goodUnit" ],
		effectiveFieldsAlias : {
			goodShortName : "品项编码",
			goodName : "品项名称",
			goodUnit : "单位"
		},
		// 调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
		fnAdjustAjaxParam : function(keyword, opts) {
			return {
				timeout : 30000,// 超时时间30秒
			};
		},
		processData : function(json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
			changeGoodSearchObj(json);
			return {
				value : json
			};
		}
	}).on('onSetSelectValue', function(e, keyword) {
		updateRowPlatformLtl = searchPlatformLtlObj[keyword.id];
	});
}

// 根据仓位编号搜索得到数组来json对象
var changeGoodSearchObj = function(arr) {
	searchPlatformLtlObj = {};
	if (arr.length == 0) {
		return;
	}
	for ( var index in arr) {
		var obj = arr[index];
		searchPlatformLtlObj[obj.goodShortName] = obj;
	}
}