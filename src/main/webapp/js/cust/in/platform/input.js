/**
 * 订单明细
 */
var inPlatformInputTable;
var userId = $('#inPlatformUserId').val();
var rowIndex;
var searchPlatformObj;
var updateRowInspection;
$().ready(function() {
	var orderId = $("#inPlatformOrderId").val();
	inPlatformInputTable = $('#inPlatformInputTable')
	inPlatformInputTable.bootstrapTable({
		url : "../in/platform!inputData.html?orderSearch.orderId=" + orderId,// 加载数据的url
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
		}, {
			field : 'goodNameId',
			visible : false,
			columnType : "Long"
		}, {
			field : 'id',
			visible : false,
			columnType : "Long"
		}, {
			field : 'packageStyle',
			visible : false,
			columnType : "String"
		}, {
			field : 'mergeContainerType',
			visible : false,
			columnType : "Long"
		}, {
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
				showAfter : initGoodSuggest
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
			columnType : "String",
			editable : {
				type : 'date',
				format : 'yyyy-mm-dd',
				viewformat : 'yyyy-mm-dd',
				title : '生产日期',
				clear : false,
				placement : 'right',
				datepicker : {
					weekStart : 1
				},
				validate : function(v) {
					if (!v)
						return '比填';
				}
			}
		}, {
			field : "shelfDate",
			title : "有限日期",
			columnType : "String",
			editable : {
				type : 'date',
				format : 'yyyy-mm-dd',
				viewformat : 'yyyy-mm-dd',
				title : '有限日期',
				clear : false,
				placement : 'right',
				datepicker : {
					weekStart : 1,
					language : ""
				},
				validate : function(v) {
					if (!v)
						return '比填';
				}
			}
		}, {
			field : "batchNumber",
			title : "批号",
			columnType : "String",
			formatter : function(value, row, index) {
				if (value == null) {
					return "";
				}
				return value;
			},
			editable : {
				type : 'text',
				title : '批号',
			}
		}, {
			field : "warehouseType",
			title : "温层",
			columnType : "Long",
			formatter : function(value, row, index) {
				if (!value) {
					return "1";
				}
				return value;
			},
			editable : {
				type : 'select',
				title : '温层',
				source : [ {
					value : 1,
					text : "常温"
				}, {
					value : 2,
					text : "恒温"
				}, {
					value : 3,
					text : "冷冻"
				}, {
					value : 4,
					text : "冷藏"
				} ]
			}
		}, {
			field : 'unit',
			title : "单位",
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
			field : "note",
			title : "备注",
			columnType : "String",
			formatter : function(value, row, index) {
				if (value == null) {
					return "";
				}
				return value;
			},
			editable : {
				type : 'text',
				title : '批号',
			}
		}, {
			field : "disabled",
			title : "是否残次",
			columnType : "Long",
			formatter : function(value, row, index) {
				if (!value) {
					return 0;
				}
				return value;
			},
			editable : {
				type : 'select',
				title : '是否残次',
				source : [ {
					value : 0,
					text : "正常"
				}, {
					value : 1,
					text : "残次"
				} ]
			}
		} ],
		onEditableHidden : function(field, row, oldValue, $el) {
			if (field != "goodShortName") {
				inPlatformInputTable.bootstrapTable("resetView");
			} else {
				if (updateRowInspection!=null) {
					inPlatformInputTable.bootstrapTable("updateRow", {
						index : rowIndex,
						row : {
							"goodShortName" : updateRowInspection.goodShortName,
							"goodName" : updateRowInspection.goodName,
							"unit" : updateRowInspection.goodUnit,
							"packageStyle" : updateRowInspection.packageStyle,
							"goodNameId" : updateRowInspection.goodNameId,
							"packageNum" : updateRowInspection.packageNum,
							"warehouseType" : updateRowInspection.warehouseType,
							"disabled" : 0
						}
					});
				}
			}
			return false;
		}
	});

	$("#inPlatformAddLine").on("click", addPlatformLine);
	$("#inPlatformDelLine").on("click", delPlatformLine);
	$("#saveInPlatformBut").on("click", subInPlatformFrom);

});

function subInPlatformFrom() {
	var newData = {
		"platformInData.orderId" : $("#inPlatformOrderId").val(),
		"platformInData.end" : true
	}
	var data = inPlatformInputTable.bootstrapTable("getData");
	for (var i = 0; i < data.length; i++) {
		var detail = data[i];
		if( detail.goodName == null || detail.goodName == ""){
			swal({
				title : "",
				text : "请输入正确的品项编码！",
				type : "warning"
			});
			return;
		}
		if ( detail.singleNum == null && detail.goodNum == null ) {
			swal({
				title : "",
				text : "请输入验货数量",
				type : "warning"
			});
			return;
		}
		if ( Number(detail.singleNum) == 0 && Number(detail.goodNum) == 0 ) {
			swal({
				title : "",
				text : "请输入验货数量",
				type : "warning"
			});
			return;
		}
		var detailKey = "platformInData.detailList[" + i + "]"
		for ( var key in detail) {
			if ("state" == key) {
				continue;
			}
			var value = detail[key];
			var newDetailKey = "";
			if ("singleNum" == key) {
				newDetailKey = detailKey + "." + "singleNum";
			} else {
				newDetailKey = detailKey + "." + key;
			}
			newData[newDetailKey] = value;
		}
	}
	
	$.ajax({
		url : "../in/platform!saveEcheck.html",
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
				savePlatform(newData)
			} else {
				 alertConfirm(function(){
					 $.ajax({
							url : "../in/platform!save.html",
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
									$("#closeInPlatformBut").click();
									inPlatformTable.bootstrapTable("refresh");
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
			        }, data.message);
				
				
			}
		}
	});

}

function savePlatform(newData){
	$.ajax({
		url : "../in/platform!save.html",
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
				$("#closeInPlatformBut").click();
				inPlatformTable.bootstrapTable("refresh");
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

function addPlatformLine() {
	// 添加行
	var data = inPlatformInputTable.bootstrapTable("getData");
	var newRowIndex = data.length;
	var row = {
		"warehouseType" : 1,
		"goodNum" : 0,
		"singleNum" : 0,
		"disabled" : 0,
		"state" : false
	}
	inPlatformInputTable.bootstrapTable('insertRow', {
		index : newRowIndex + 1,
		row : row
	});
}

function delPlatformLine() {
	// 删除行
	var selectData = inPlatformInputTable.bootstrapTable('getSelections');
	if (selectData.length == 0) {
		swal({
			title : "",
			text : "请至少选择一条记录！",
			type : "warning"
		});
		return;
	}
	var ids = $(selectData).map(function() {
		return this.id;
	}).get().join(',');
	var tableData = inPlatformInputTable.bootstrapTable('getData');
	for (var int = 0; int < selectData.length; int++) {
		var tableRow = selectData[int];
		tableData.splice($.inArray(tableRow, tableData), 1);
	}
	if (ids != null && ids != "") {
		$.ajax({
			url : "../in/platform!deleteOrderPlatformDetail.html",
			type : "POST",
			dataType : "json",
			data : {
				"orderSearch.ids" : ids
			},
			beforeSend : function(request) {
				showLoading();
			},
			complete : function() {
				removeLoading();
			},
			success : function(data) {
				if (!data.ok) {
					swal({
						title : "",
						text : data.message,
						type : "warning"
					});
				}
			}
		});
	}
	var toAddData =  tableData.concat(); 
	inPlatformInputTable.bootstrapTable("removeAll");
	for (var int = 0; int < toAddData.length; int++) {
		inPlatformInputTable.bootstrapTable('insertRow', {
			index : int + 1,
			row : toAddData[int]
		});
	}
	
}

// 初始化插件
function initGoodSuggest(editable) {
	var realInput = editable.input.$input;
	rowIndex = $(realInput).parents('tr[data-index]').data('index');
	$(realInput).after(dropdTownoggle);
	$(realInput)
			.bsSuggest(
					{
						getDataMethod : "url",
						url : "../in/platform!getUserGoods.html?customerGoodsSearch.customer.userId="
								+ userId
								+ "&customerGoodsSearch.goods.goodShortName=",
						allowNoKeyword : false, // 是否允许无关键字时请求数据
						idField : "goodNameId",
						keyField : "goodNameId",
						showBtn : false,
						listAlign : "right",
						leftWidth : 0,
						effectiveFields : [ "goodShortName", "goodName",
								"packageNum" ],
						effectiveFieldsAlias : {
							goodShortName : "品项编码",
							goodName : "品项名称",
							packageNum : "包装规格"
						},
						// 调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
						fnAdjustAjaxParam : function(keyword, opts) {
							return {
								timeout : 30000,// 超时时间30秒
							};
						},
						processData : function(json) { // url 获取数据时，对数据的处理，作为
														// getData 的回调函数
							changeSearchObj(json);
							return {
								value : json
							};
						}
					}).on('onSetSelectValue', function(e, keyword) {
				updateRowInspection = searchPlatformObj[keyword.id];
			});
}

// 根据仓位编号搜索得到数组来json对象
var changeSearchObj = function(arr) {
	searchPlatformObj = {};
	if (arr.length == 0) {
		return;
	}
	for ( var index in arr) {
		var obj = arr[index];
		searchPlatformObj[obj.goodNameId] = obj;
	}
}