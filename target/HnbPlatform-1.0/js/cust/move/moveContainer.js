/**
 * 移盘管理
 */
//模态框
var $moveModal;
//table
var $table;
//搜索框插件选择对象
var searchObj;
//流水号
var workOrderNo = "";
//托盘号
var conRfid = "";

$().ready(function(){
	$moveModal = $("#moveModal");
	$table = $('#table');
	$table.bootstrapTable({
        url: "../move/move-container!data.html",//加载数据的url
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
                field : "fromContainer.containerRfid",
                title : "移前托盘",
                sortable : true,
                filterControl: "input",
    			columnType : "String"
            },
            {
                field : "toContainer.containerRfid",
                title : "移后托盘",
                sortable : true,
                filterControl: "input",
    			columnType : "String"
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
		workOrderNo = "";
		conRfid = "";
		//初始化模态框
		$(this).find(".modal-body").html(moveModalHtml);
	});
	//点击移盘按钮
	$("#moveBtn").on("click", function() {
		$moveModal.find(".modal-title").text("移盘");
		initSuggest($("#fromContainerRfid"), "../move/move-container!containerFreeze.html?containerFreez=1&inputValue=", 1, "move");
		initSuggest($("#toContainerRfid"), "../manage/container!containerFreeze.html?containerFreez=0&inputValue=", 0, "move");
		formValidate("move");
		//显示模态框
		showModal($moveModal);
	});
	
	//点击拼盘按钮
	$("#mergeBtn").on("click", function() {
		$moveModal.find(".modal-title").text("拼盘");
		initSuggest($("#fromContainerRfid"), "../move/move-container!containerFreeze.html?containerFreez=1&inputValue=", 1, "merge");
		initSuggest($("#toContainerRfid"), "../move/move-container!containerFreeze.html", 0, "merge");
		formValidate("merge");
		//显示模态框
		showModal($moveModal);
	});
	
	//保存按钮点击，提交表单
	$("#moveSaveBtn").on("click", function() {
		$moveModal.find("form").submit();
	})
});	

//初始化搜索插件
var initSuggest = function($input, url, needInit, type) {
	$input.bsSuggest({
		getDataMethod: "url",
		url: url,
        allowNoKeyword: false, //是否允许无关键字时请求数据
        idField: "containerRfid",
        keyField: "containerRfid",
        showBtn: false,
        effectiveFields: ["containerRfid"],
        //调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
        fnAdjustAjaxParam: function(keyword, opts) {
            if (needInit || type == "move") {
            	//超时时间30秒
            	return {timeout: 30000};
            }
            return {
            	timeout: 30000,
            	data: {
            		workOrderNo: workOrderNo,
            		conRfid: conRfid,
            		inputValue: keyword
            	}
            }
        },
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
        	if (needInit) {
        		changeSearchObj(json);
        	}
            return {value: json};
        }
	}).on('onSetSelectValue', function (e, keyword) {
        if (needInit) {
        	var obj = searchObj[keyword.id];
            //填充模态框
            $("#goodShortName").val(obj.goodShortName);
            $("#goodName").val(obj.goodName);
            $("#workOrderNo").val(obj.workOrderNo);
            workOrderNo = obj.workOrderNo;
            conRfid = obj.containerRfid;
        }
	});
	//调整搜索框的样式
	var $suggestInput = $moveModal.find("input:lt(2)");
	$suggestInput.attr("style", "");
	$suggestInput.parent().attr("style", "");
}

var changeSearchObj = function(arr) {
	searchObj = {};
	if (arr.length == 0) {
		return;
	}
	for (var index in arr) {
		var obj = arr[index];
		searchObj[obj.containerRfid] = obj;
	}
}

//添加表单校验
var formValidate = function(type) {
	var $input = $moveModal.find("#toContainerRfid");
	if (type == "move") {
		$input.attr("required", false);
	} else {
		$input.attr("required", "required");
	}
	$moveModal.find("form").validate({
		submitHandler: function(form) {
			$.ajax({
				url: "../move/move-container!save.html",
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