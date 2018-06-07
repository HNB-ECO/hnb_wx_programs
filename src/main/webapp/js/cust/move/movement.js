/**
 * 移库管理
 */
//模态框
var $moveModal;
//table
var $table;
$().ready(function(){
	$moveModal = $("#moveModal");
	$table = $('#table');
	$table.bootstrapTable({
        url: "../move/movement!data.html",//加载数据的url
        columns: [
            {
            	field : "user.userName",
                title : "客户名称",
                sortable : true,
                filterControl: "input",
    			columnType : "String"
            },
            {
            	field : "goodsName.goodShortName",
                title : "品项编码",
                sortable : true,
                filterControl: "input",
    			columnType : "String"
            },
            {
            	field : "goodsName.goodName",
                title : "品项名称",
                sortable : true,
                filterControl: "input",
    			columnType : "String"
            },
            {
            	field : "toPosition.warehouse.warehouseType",
                title : "温层",
                sortable : true,
                formatter : wcInitFunc,
                filterControl: "select",    //搜索框
                filterData: freezeJson,
    			columnType : "Long"
            },
            {
                field : "fromPosition.note",
                title : "移前仓位",
                sortable : true,
                filterControl: "input",
    			columnType : "String"
            },
            {
                field : "toPosition.note",
                title : "移后仓位",
                sortable : true,
                filterControl: "input",
    			columnType : "String"
            },
            {
                field : "goodNum",
                title : "移动数量",
                sortable : true,
                filterControl: "input",
    			columnType : "Long"
            },
            {
                field : "workOrder.operatorUser.userName",
                title : "操作员",
                sortable : true,
                filterControl: "select",    //搜索框
                filterData: userJson,
    			columnType : "String"
            },
            {
                field : "note",
                title : "备注",
                sortable : true,
                filterControl: "input",
    			columnType : "String"
            }
        ]

    });
	
	var moveModalHtml = $moveModal.find(".modal-body").html();
	$moveModal.on("hidden.bs.modal", function (e) {
		//初始化模态框
		$(this).find(".modal-body").html(moveModalHtml);
	});
	
	//点击移库按钮
	$("#moveBtn").on("click", function() {
		initContainerSuggest();
		initPositionSuggest();
		formValidate();
		//显示模态框
		$moveModal.modal({
            keyboard : false,
            backdrop : 'static',
            show : true
        });
	});
	
	//导出
	$("#reprotMovement").on("click",function(){
		alertConfirm(function(){
        	var params = getMoveExportParams("orderSearch");
    		location.href = "../report/report!movementReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	//保存按钮点击，提交表单
	$("#moveSaveBtn").on("click", function() {
		$moveModal.find("form").submit();
	})
});	

var getMoveExportParams = function(prefix) {
	var params = new Object();
	for (var key in param) {
		if (key.indexOf(".") > 1) {
			params['movementSearch' + key.substring(key.indexOf("."))] = $.trim(param[key]);
		}
	}
	params["orderField"] = param["orderField"];
	params["orderDirection"] = param["orderDirection"];
	return params;
}

//初始化移前托盘搜索插件
var initContainerSuggest = function() {
	var $input = $("#fromContainerRfid");
	$input.bsSuggest({
		getDataMethod: "url",
		url: "../move/move-container!containerFreeze.html?containerFreeze=1&inputValue=",
        allowNoKeyword: false, //是否允许无关键字时请求数据
        idField: "id",
        keyField: "note",
        showBtn: false,
        effectiveFields: ["note","userName","goodShortName","goodName","productionDate","shelfDate","batchNumber","goodNum","goodSingleNum","goodUnit"],
    	effectiveFieldsAlias : {
    		note : "仓位编码",
    		userName : "客户姓名",
    		goodShortName : "品项编码",
    		goodName : "品项名称",
    		productionDate : "生产日期",
    		shelfDate : "有效日期",
    		batchNumber : "批次",
    		goodNum : "箱数",
    		goodSingleNum : "件数",
    		goodUnit :"单位"
		},
        //调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
        fnAdjustAjaxParam: function(keyword, opts) {
            return {timeout: 30000}
        },
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
        	changeSearchObj(json);
            return {value: json};
        }
	}).on('onSetSelectValue', function (e, keyword) {
    	var obj = searchObj[keyword.id];
        //填充模态框
        $("#goodShortName").val(obj.goodShortName);
        $("#goodName").val(obj.goodName);
        $("#goodNum").val(obj.goodNum);
        $("#productionDate").val(obj.productionDate);
        $("#shelfDate").val(obj.shelfDate);
        $("#batchNumber").val(obj.batchNumber);
        $("#goodUnit").val(obj.goodUnit);
        $("#userId").val(obj.userId);
        $("#userName").val(obj.userName);
        $("#packageNum").val(obj.packageNum);
        $("#goodSingleNum").val(obj.goodSingleNum);
	});
	//调整搜索框的样式
	$input.attr("style", "");
	$input.parent().attr("style", "");
}

//初始化移后仓位搜索插件
var initPositionSuggest = function() {
	var $input = $("#toPositionNote");
	$input.bsSuggest({
		getDataMethod: "url",
		url: "../manage/warehouse!getFreePositionByWarehouseIds.html",
        allowNoKeyword: false, //是否允许无关键字时请求数据
        idField: "note",
        keyField: "note",
        showBtn: false,
        effectiveFields: ["note"],
        //调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
        fnAdjustAjaxParam: function(keyword, opts) {
            return {
            	timeout: 30000,
            	data: {
            		inputValue: keyword
            	}
            }
        },
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
            return {value: json};
        }
	});
	//调整搜索框的样式
	$input.attr("style", "");
	$input.parent().attr("style", "");
}

var changeSearchObj = function(arr) {
	searchObj = {};
	if (arr.length == 0) {
		return;
	}
	for (var index in arr) {
		var obj = arr[index];
		searchObj[obj.id] = obj;
	}
}

//添加表单校验
var formValidate = function() {
	$moveModal.find("form").validate({
		submitHandler: function(form) {
			$.ajax({
				url: "../move/movement!save.html",
				type: "post",
				data: $(form).serialize(),
				dataType: "json",
				beforeSend: function() {
					showLoading();
				}, 
				complete: function() {
					removeLoading();
				},
				success: function(data) {
					if (data.errcode != 0) {
						alertWarning(data.errmsg);
						return;
					}
					$moveModal.modal("hide");
					//刷新表格
					$table.bootstrapTable("refresh");
					alertSuccess("操作成功");
				},
				error: function() {
					alertWarning();
				}
			});
		}
	});
} 