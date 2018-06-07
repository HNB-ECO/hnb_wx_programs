/**
 * 订单明细
 */
var inInspectionInputTable;
// 仓位编号搜索到的数组
var searchObj;
var updateRowInspection;
var rowIndex;
$().ready(function() {
	var orderId = $("#inInspectionOrderId").val();
	inInspectionInputTable = $('#inInspectionInputTable')
	inInspectionInputTable.bootstrapTable({
		url : "../in/inspection!inputData.html?orderSearch.orderId=" + orderId,// 加载数据的url
		showRefresh : false,// 刷新
		showColumns : false,// 内容列下拉框
		buttonsToolbar : "toolBar",
		// pagination: false,//底部分页
		// fixHeader : "40px",
		filterControl : false,
		paginationShow : false,
		columns : [ {
			field : "state",
			checkbox : true
		},{
			field : 'id',
			visible : false,
			columnType : "Long"
		}, {
			field : 'goodNameId',
			visible : false,
			columnType : "Long"
		}, {
			field : 'workOrderId',
			visible : false,
			columnType : "Long"
		}, {
			field : 'isMerge',
			visible : false,
			columnType : "boolean"
		}
		, {
			field : "goodShortName",
			title : "品项编码",
			columnType : "String",
			formatter : function(value, row, index) {
				if (value == null) {
					return "";
				}
				return value;
			},
			editable : {
				type : 'text',
				title : '品项编码',
				showbuttons : false,
				defaultValue : '  ',
				inputclass : 'input-sm aotoInput',
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
			field : "packageNum",
			title : "包装规格",
			columnType : "Long"
		}, {
			field : "productionDate",
			title : "生产日期",
			columnType : "date"
		}, {
			field : "shelfDate",
			title : "有限日期",
			columnType : "date"
		}, {
			field : "batchNumber",
			title : "批号",
			columnType : "String"
		}, {
			field : "goodNum",
			title : "箱数",
			columnType : "Long",
			formatter : function(value, row, index) {
				if (value == null) {
					return 0;
				}
				return value;
			},
			editable : {
				type : 'text',
				title : '箱数',
				validate : function(v) {
					if (!v)
						return '比填';
				}
			}
		}, {
			field : "singleNum",
			title : "件数",
			columnType : "Long",
			formatter : function(value, row, index) {
				if (value == null) {
					return 0;
				}
				return value;
			},
			editable : {
				type : 'text',
				title : '件数',
				validate : function(v) {
					if (!v)
						return '比填';
				}
			}
		}, {
			field : "warehouseType",
			title : "温层",
			columnType : "Long",
			formatter : wcInitFunc
		}, {
			field : "conRfid",
			title : "是否拼盘",
			columnType : "String",
			formatter : function(value, row, index) {
				debugger
				if ( row.isMerge ) {
					return  '<span class="label label-danger">拼</span>';
				}
				return "" ;
			}
		}, 
		{
			field : "warehouseNote",
			title : "仓位编码",
			columnType : "String",
			formatter : function(value, row, index) {
				if (value == null) {
					return "";
				}
				return value;
			},
			editable : {
				type : 'text',
				title : '仓位编码',
				showbuttons : false,
				defaultValue : '  ',
				inputclass : 'input-sm aotoInput',
				validate : function(v) {
					if (!v)
						return '比填';
				},
				showAfter : initSuggest
			}
		}, {
			field : "note",
			title : "备注",
			columnType : "String"
		} ],
		onEditableHidden : function(field, row, oldValue, $el) {
			if( updateRowInspection == null ){
				return false;
			}
			
			if ( field == "goodShortName" ) {
				inInspectionInputTable.bootstrapTable("updateRow", {
					index : rowIndex,
					row : {
						"goodShortName" : updateRowInspection.goodShortName,
						"goodName" : updateRowInspection.goodName,
						"packageNum" : updateRowInspection.packageNum,
						"productionDate" : updateRowInspection.productionDate,
						"batchNumber" : updateRowInspection.batchNumber,
						"shelfDate" : updateRowInspection.shelfDate,
						"id" : updateRowInspection.id,
						"goodNameId" : updateRowInspection.goodNameId,
						"workOrderId" : updateRowInspection.workOrderId,
						"isMerge" : updateRowInspection.isMerge,
						"warehouseType" : updateRowInspection.warehouseType,
						"conRfid" : updateRowInspection.conRfid
					}
				});
			} else if ( field == "warehouseNote" ) {
				inInspectionInputTable.bootstrapTable("updateRow", {
					index : rowIndex,
					row : {
						"warehouseNote" : updateRowInspection.note
					}
				});
			}
			return false;
		}
	});

	$("#inInspectionAddLine").on("click", addInspectionLine);
	$("#inInspectionDelLine").on("click", delInspectionLine);
	$("#saveInInspectionBut").on("click", subInInspectionFrom);

});

function addInspectionLine() {
	// 添加行
	var data = inInspectionInputTable.bootstrapTable("getData");
	var newRowIndex = data.length;
	var row = {
		"goodNum" : 0,
		"singleNum" : 0,
		"state" : false
	}
	inInspectionInputTable.bootstrapTable('insertRow', {
		index : newRowIndex + 1,
		row : row
	});
}

function delInspectionLine() {
	var selectData=inInspectionInputTable.bootstrapTable('getSelections');
	if (selectData.length == 0) {
		swal({
			title : "",
			text : "请至少选择一条记录！",
			type : "warning"
		});
		return;
	}
	var tableData = inInspectionInputTable.bootstrapTable('getData');
	for (var int = 0; int < selectData.length; int++) {
		var tableRow = selectData[int];
		tableData.splice($.inArray(tableRow, tableData), 1);
	}
	var toAddData =  tableData.concat(); 
	inInspectionInputTable.bootstrapTable("removeAll");
	for (var int = 0; int < toAddData.length; int++) {
		inInspectionInputTable.bootstrapTable('insertRow', {
			index : int + 1,
			row : toAddData[int]
		});
	}
}

function subInInspectionFrom() {
	var newData = {
		"inspectionInData.orderId" : $("#inInspectionOrderId").val(),
		"inspectionInData.end" : true
	}
	var data = inInspectionInputTable.bootstrapTable("getData");
	for (var i = 0; i < data.length; i++) {
		var detail = data[i];
		if ( detail.warehouseNote == null || detail.warehouseNote == "") {
			swal({
				title : "",
				text : "请输入正确的仓位编码！",
				type : "warning"
			});
			return;
		}
		var detailKey = "inspectionInData.inspectionDetailList[" + i + "]"
		for ( var key in detail) {
			if ("state" == key) {
				continue;
			}
			var value = detail[key];
			var newDetailKey = detailKey + "." + key;
			newData[newDetailKey] = value;
		}
	}
	$.ajax({
		url : "../in/inspection!save.html",
		type : "POST",
		dataType : "json",
		data : newData,
		beforeSend : function(request) {
			showLoading();
		},
		complete : function() {
			removeLoading();
		},
		success : function(data) {
			if (data.ok) {
				$("#closeInInspectionBut").click();
				inInspectionTable.bootstrapTable("refresh");
				swal({
					title : "",
					text : "确认成功！",
					type : "success"
				});
			} else {
				swal({
					title : "",
					text : data.message,
					type : "warning"
				});
			}
		}
	});

}

function initGoodShortSuggest(editable){
	searchObj = {};
	var realInput = editable.input.$input;
	rowIndex = $(realInput).parents('tr[data-index]').data('index');
	var orderId = inInspectionTable.bootstrapTable("getSelections")[0].orderId
	$(realInput).after(dropdTownoggle);
	$(realInput).bsSuggest({
		getDataMethod : "url",
		url : "../in/inspection!getOrderInspection.html?orderPlatformDetailSearch.order.orderId=" + orderId + "&orderPlatformDetailSearch.goodShortName=",
		allowNoKeyword : false, // 是否允许无关键字时请求数据
		idField : "id",
		keyField : "id",
		showBtn : false,
		listAlign : "right",
		leftWidth : 0,
		effectiveFields : [ "goodShortName", "productionDate", "shelfDate", "batchNumber" ],
		effectiveFieldsAlias : {
			goodShortName : "品项编码",
			productionDate : "生产日期",
			shelfDate : "有效日期",
			batchNumber : "批次"
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
		updateRowInspection = searchObj[keyword.id];
	});
}
// 初始化插件
function initSuggest(editable) {
	searchObj = {};
	var realInput = editable.input.$input;
	rowIndex = $(realInput).parents('tr[data-index]').data('index');
	var warehouseType = inInspectionInputTable.bootstrapTable("getData")[rowIndex].warehouseType
	$(realInput).after(dropdTownoggle);
	$(realInput).bsSuggest({
		getDataMethod : "url",
		url : "../in/inspection!getWarehousePosition.html?orderSearch.warehouseType=" + warehouseType + "&orderSearch.note=",
		allowNoKeyword : false, // 是否允许无关键字时请求数据
		idField : "note",
		keyField : "note",
		showBtn : false,
		listAlign : "right",
		leftWidth : 0,
		effectiveFields : [ "note", "positionFreeze", "warehouseTypeName", "warehouseName" ],
		effectiveFieldsAlias : {
			note : "仓位编号",
			positionFreeze : "状态",
			warehouseTypeName : "温层",
			warehouseName : "仓库名称"
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
var changeGoodSearchObj = function(arr) {
	searchObj = {};
	if (arr.length == 0) {
		return;
	}
	for ( var index in arr) {
		var obj = arr[index];
		searchObj[obj.id] = obj;
	}
}

// 根据仓位编号搜索得到数组来json对象
var changeSearchObj = function(arr) {
	searchObj = {};
	if (arr.length == 0) {
		return;
	}
	for ( var index in arr) {
		var obj = arr[index];
		searchObj[obj.note] = obj;
	}
}