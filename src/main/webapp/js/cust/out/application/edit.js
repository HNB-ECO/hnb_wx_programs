/**
 * 订单明细
 */
var outApplicationEditTable;
var rowIndex;
var searchPlatformObj;
var updateRowInspection;
$().ready(function() {
	var toolbar =	[
	     '<div id="toolbar" class="float-e-margins" style="padding-bottom: 1px;">',
	     '<button id="outApplicationAddLine" type="button" class="btn btn-info btn-sm" style="margin-right: 5px;"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加</button>',
	     '<button id="outApplicationDelLine" type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span>&nbsp;删除</button>',
	     '<select id="outOrderTypeEdit" name="orderSearch.reservationType"  class="selectpicker show-tick btn-sm"  data-live-search="true">',
	     '<option value="1">配送</option>',
	     '<option value="0">自提</option>',
	     '</select>',
	     '</div>'
	].join('')
	outApplicationEditTable = $('#outApplicationEditTable');
	outApplicationEditTable.bootstrapTable({
        url: "../out/application!editData.html?orderGoodsSearch.order.orderId=" + inOrderId,//加载数据的url
        toolbar: toolbar,
//    	buttonsToolbar: "toolBar",
		showFooter: true,
    	uniqueId: "id",
    	searchObject: "orderGoodsSearch.",
        columns: [{
				field: "state",
				checkbox: true
        	},
        	{
				field: "hideOperate",
				visible: false,
			    columnType : "Long"
        	},
        	{
				field: "id",
				visible: false,
			    columnType : "Long"
        	},
        	{
				field: "goods.goodNameId",
				visible: false,
			    columnType : "Long"
        	},
            {
                field : "order.user.userName",
                title : "客户名称",
            	sortable: true,
            	filterControl: "input",
                columnType : "String"
            },
            {
                field : "store.storeNum",
                title : "门店代码",
            	sortable: true,
            	filterControl: "input",
                columnType : "String",
    			formatter : function(value, row, index) {
    				if (value == null) {
    					return "";
    				}
    				return value;
    			},
    			editable : {
    				type : 'text',
    				title : '门店代码',
    				showbuttons : false,
    				defaultValue : '  ',
    				editable : canDoStoreNumEditable,
    				inputclass : 'input-sm aotoInput',
    				validate : function(v) {
    					if (!v)
    						return '比填';
    				},
    				showAfter : initStoreSuggest
    			}
            },
            {
                field : "store.storeName",
                title : "门店名称",
            	sortable: true,
            	filterControl: "input",
                columnType : "String"
            },
            {
                field : "goods.goodShortName",
                title : "品项编码",
            	sortable: true,
            	filterControl: "input",
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
    				editable : canDoGoodShortNameEditable,
    				inputclass : 'input-sm aotoInput',
    				validate : function(v) {
    					if (!v)
    						return '比填';
    				},
    				showAfter : initGoodSuggest
    			}
            },
            {
                field : "goods.goodName",
                title : "品项名称",
            	sortable: true,
            	filterControl: "input",
                columnType : "String"
            },{
                field : "goods.transiType",
                title : "是否中转",
            	sortable: true,
                formatter : function (value, row, index) {
                    var str = "";
                    if (value == 2) {
                        str = "<span class='badge badge-primary'>是</span>";
                    } else {
                        str = "<span class='badge badge-danger'>否</span>";
                    }
                    return str;
                },
                columnType : "Long",
                filterControl : "select",
    			filterData : transiTypeJson,
            },
            {
                field : "warehouseType",
                title : "温层",
            	sortable: true,
                formatter : wcInitFunc,
                filterControl : "select",
            	filterData : warehouseTypeJson,
                columnType : "Long"
            },
            {
                field : "productionDate",
                title : "生产日期",
            	sortable: true,
            	filterControl: "input",
                columnType : "Date",
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
            },
            {
                field : "shelfDate",
                title : "有效日期",
            	sortable: true,
            	filterControl: "input",
                columnType : "Date",
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
            },
            {
                field : "batchNumber",
                title : "批号",
            	sortable: true,
                filterControl: "input",
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
            },
            {
                field : "goods.goodUnit",
                title : "单位",
            	sortable: true,
                filterControl: "input",
                columnType : "String"
            },
            {
                field : "goods.packageNum",
                title : " 包装规格",
            	sortable: true,
            	filterControl: "input",
                columnType : "Long"
            },
            {
                field : "originalGoodNum",
                title : "箱数",
            	sortable: true,
            	showTotal : true,
                columnType : "Long",
                filterControl: "input",
    			formatter : function(value, row, index) {
    				if (value == null) {
    					return "";
    				}
    				return value;
    			},
    			editable : {
    				type : 'text',
    				title : '批号',
    				editable : canDoGoodShortNameEditable
    			}
            },
            {
                field : "originalSingleNum",
                title : "件数",
            	sortable: true,
            	showTotal : true,
                columnType : "Long",
                filterControl: "input",
    			formatter : function(value, row, index) {
    				if (value == null) {
    					return "";
    				}
    				return value;
    			},
    			editable : {
    				type : 'text',
    				title : '批号',
    				editable : canDoGoodShortNameEditable
    			}
            }
            
        ],
        onEditableHidden : function(field, row, oldValue, $el) {
        	var hideOperate = row.hideOperate;
        	if (hideOperate == null) {
        		var mapOrderGoodsId = row.id;
            	if (mapOrderGoodsId != null) {
            		hideOperate = 2;
    			}
            	row["hideOperate"] = hideOperate;
			}
			if ( field != "goods.goodShortName" && field != "store.storeNum") {
				outApplicationEditTable.bootstrapTable("resetView");
			} else {
				if (updateRowInspection!=null) {
					var newRow = {};
					if("store.storeNum" == field){
						newRow["hideOperate"] = hideOperate;
						newRow["order.user.userName"] = updateRowInspection.userName;
						newRow["store.storeNum"] = updateRowInspection.storeNum;
						newRow["store.storeName"] = updateRowInspection.storeName;
					} else {
						newRow["hideOperate"] = hideOperate;
						newRow["goods.goodNameId"] = updateRowInspection.goodNameId;
						newRow["goods.goodShortName"] = updateRowInspection.goodShortName;
						newRow["goods.goodName"] = updateRowInspection.goodName;
						newRow["goods.transiType"] = updateRowInspection.transiType;
						newRow["warehouseType"] = updateRowInspection.warehouseType;
						newRow["goods.goodUnit"] = updateRowInspection.goodUnit;
						newRow["goods.packageNum"] = updateRowInspection.packageNum;
					}
					outApplicationEditTable.bootstrapTable("updateRow", {
						index : rowIndex,
						row : newRow
					});
				}
			}
			return false;
		}
	});
	$("#outApplicationAddLine").on("click", addOutApplicationLine);
	$("#outApplicationDelLine").on("click", delOutApplicationLine);
	$("#applicationEditSaveBtn").on("click", applicationEditSaveFun);
	$( '#outOrderTypeEdit' ).selectpicker();
	
});

function applicationEditSaveFun() {
	var newData = {
		"outOrderData.orderId" : inOrderId,
		"outOrderData.userId" : outUserId
	}
	var data = outApplicationEditTable.bootstrapTable("getData");
	var doSave = false;
	for (var i = 0; i < data.length; i++) {
		var detail = data[i];
		if (detail.hideOperate == null) {
			continue;
		}
		if (detail["goods.goodName"] == null || detail["goods.goodName"] == "") {
			swal({
				title : "",
				text : "请输入正确的品项编码！",
				type : "warning"
			});
			return;
		}
		if (detail["store.storeName"] == null || detail["store.storeName"] == "") {
			swal({
				title : "",
				text : "请输入正确的门店编码！",
				type : "warning"
			});
			return;
		}
		if (detail.originalSingleNum == null && detail.originalGoodNum == null) {
			swal({
				title : "",
				text : "请输入验货数量",
				type : "warning"
			});
			return;
		}
		if (Number(detail.originalSingleNum) == 0 && Number(detail.originalGoodNum) == 0) {
			swal({
				title : "",
				text : "请输入验货数量",
				type : "warning"
			});
			return;
		}
		doSave = true;
		var detailKey = "outOrderData.mapOrderGoodList[" + i + "]"
		for ( var key in detail) {
			if ("state" == key) {
				continue;
			}
			var value = detail[key];
			var newDetailKey = "";
			newDetailKey = detailKey + "." + key;
			newData[newDetailKey] = value;
		}
	}
	if (!doSave) {
		$("#applicationEditCloseBtn").click();
		return;
	}
	$.ajax({
		url : "../out/application!saveOrderGood.html",
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
				$("#applicationEditCloseBtn").click();
				outApplicationEditTable.bootstrapTable("refresh");
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

function getSelectMapOrderId(){
	var ids = null;
	var selectData = outApplicationEditTable.bootstrapTable('getSelections');
	if (selectData.length == 0) {
		swal({
			title : "",
			text : "请至少选择一条记录！",
			type : "warning"
		});
		return ids;
	}
	ids = $(selectData).map(function() {
		return this.id;
	}).get().join(',');
	return ids;
}

function addOutApplicationLine() {
	// 添加行
	var row = {
		"hideOperate" : 1,
		"originalGoodNum" : 0,
		"originalSingleNum" : 0,
		"state" : false
	}
	outApplicationEditTable.bootstrapTable('insertRow', {
		index : 0,
		row : row
	});
}

function delOutApplicationLine() {
	// 删除行
	var selectData = outApplicationEditTable.bootstrapTable('getSelections');
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
	var tableData = outApplicationEditTable.bootstrapTable('getData');
	for (var int = 0; int < selectData.length; int++) {
		var tableRow = selectData[int];
		tableData.splice($.inArray(tableRow, tableData), 1);
	}
	if (ids != null && ids != "") {
		$.ajax({
			url : "../out/application!deleteOrderGood.html",
			type : "POST",
			dataType : "json",
			data : {
				"orderGoodsSearch.ids" : ids
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
	outApplicationEditTable.bootstrapTable("removeAll");
	for (var int = 0; int < toAddData.length; int++) {
		outApplicationEditTable.bootstrapTable('insertRow', {
			index : int + 1,
			row : toAddData[int]
		});
	}
}

function canDoStoreNumEditable(row, column, result){
	var hasId = row.id;
	if (hasId) {
		return false;
	}
	return true;
}

function canDoGoodShortNameEditable(row, column, result){
	var hasId = row.id;
	if (hasId) {
		return false;
	}
	return true;
}

//初始化插件
function initGoodSuggest(editable) {
	var realInput = editable.input.$input;
	rowIndex = $(realInput).parents('tr[data-index]').data('index');
	$(realInput).after(dropdTownoggle);
	$(realInput)
			.bsSuggest(
					{
						getDataMethod : "url",
						url : "../in/platform!getUserGoods.html?customerGoodsSearch.customer.userId="
								+ outUserId
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

//根据仓位编号搜索得到数组来json对象
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

//门店
function initStoreSuggest(editable) {
	var realInput = editable.input.$input;
	rowIndex = $(realInput).parents('tr[data-index]').data('index');
	$(realInput).after(dropdTownoggle);
	$(realInput)
			.bsSuggest(
					{
						getDataMethod : "url",
						url : "../warehouse/store!getUserStore.html?search.customerUser.userId="
								+ outUserId
								+ "&search.storeNum=",
						allowNoKeyword : false, // 是否允许无关键字时请求数据
						idField : "storeNum",
						keyField : "storeNum",
						showBtn : false,
						listAlign : "right",
						leftWidth : 0,
						effectiveFields : [ "storeNum", "storeName"],
						effectiveFieldsAlias : {
							storeNum : "门店代码",
							storeName : "门店名称",
						},
						// 调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
						fnAdjustAjaxParam : function(keyword, opts) {
							return {
								timeout : 30000,// 超时时间30秒
							};
						},
						processData : function(json) { // url 获取数据时，对数据的处理，作为
							changeStoreSearchObj(json);
							return {
								value : json
							};
						}
					}).on('onSetSelectValue', function(e, keyword) {
				updateRowInspection = searchPlatformObj[keyword.id];
			});
}

var changeStoreSearchObj = function(arr) {
	searchPlatformObj = {};
	if (arr.length == 0) {
		return;
	}
	for ( var index in arr) {
		var obj = arr[index];
		searchPlatformObj[obj.storeNum] = obj;
	}
}

