//row全局变量
var row;
//全局table对象
var $table;
//全局id
var warehouseId = "";
var warehouseName = "";

$().ready(function(){

    $table = $('#table');
    $table.bootstrapTable({
        url: "./blurry!data.html",//加载数据的url
        queryParams: function (params) {
        	var param = new Object();
        	//页号
        	param["pageNum"] = params.pageNumber;
        	//每页条数
        	param["numPerPage"] = params.pageSize;
        	//排序字段
        	param["orderField"] = params.sortName;
        	//排序方向
        	param["orderDirection"] = params.sortOrder;
        	if (params.filter != undefined) {
        		var filter = JSON.parse(params.filter);
        		var i = 0;
        		for (var key in filter) {
        			if( "state" == key && i == 0 ){
        				continue;
        			}
        			i++;
        			param["search." + key] = filter[key];
        		}
        	}
        	//额外的参数
        	param["search.warehouseId"] = warehouseId;
        	return param;
        },
        columns: [
            {
                field : "state",
                checkbox : true
            },
            {
                field : "positionsId",
                title : "positionsId",
                visible : false,
                switchable : false,
                columnType : "Long"
            },
            {
                field : "warehouse.warehouserName",
                title : "仓库名称",
            	sortable: true,
                columnType : "String"
            },
            {
                field : "warehouse.area",
                title : "地区",
            	sortable: true,
                columnType : "String"
            },
            {
                field : "warehouse.address",
                title : "地址",
            	sortable: true,
                columnType : "String"
            },
            {
                field : "warehouse.warehouseType",
                title : "温层",
                formatter : wcInitFunc,
            	sortable: true,
                columnType : "Long"
            },
            {
                field : "shelvesDirection",
                title : "货架方向",
                filterControl: "select",
                formatter : shelvesDirectionInitFunc,
            	// 搜索框
    			filterData: shelvesDirectionJson,
            	sortable: true,
                columnType : "Long"
            },
            {
                field : "leaseType",
                title : "仓位类别",
                filterControl: "select",
                formatter : lockTypeInitFunc,
            	// 搜索框
    			filterData: lockTypeJson,
            	sortable: true,
                columnType : "Long"
            },
            {
                field : "note",
                title : "仓位编码",
                filterControl: "input",
            	sortable: true,
                columnType : "String"
            }
        ]

    });
    
    //初始化表格数据
    $("ul:eq(0) > li:eq(0)").click();
    
    //添加
    $("#addBtn").on("click", function() {
    	if (warehouseId == "") {
    		alertWarning("请先选择仓库！");
    		return;
    	}
    	$("#saveModal .modal-title").text("添加");
    	showSaveInput("");
    });
    
    //保存按钮
    $("#saveBtn").on("click", function() {
        $("#saveModal form").submit();
    });

    //编辑
    $("#updateBtn").on("click", function () {
    	$("#saveModal .modal-title").text("编辑");
        //获取表格已选择项数组
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length != 1) {
            alertUpdateNone();
            return;
        }
        //选中row
        row = checkArr[0];
        //检查选中仓位是否存在
        $.ajax({
        	url: "../manage/blurry!checkBlurryPositionExist.html",
        	data: {
        		id: row.positionsId
        	},
        	cache: false,
        	type: "post",
        	dataType: "json",
        	beforeSend: function() {
				showLoading();
			},
        	success: function(data) {
        		if (data.errcode != 0) {
        			alertWarning(data.errmsg);
        			return;
        		}
        		showSaveInput(row.positionsId);
        	},
        	error: function() {
        		removeLoading();
        		alertWarning();
        	}
        });
    });

    //删除
    $("#deleteBtn").on("click", function () {
        //获取表格已选择项数组
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length == 0) {
        	alertDeleteNone();
            return;
        }
        //确认或取消选择框
        alertConfirm(function(){
        	var ids = getIds(checkArr, "positionsId");
            $.ajax({
            	type: "post",
            	url: "../manage/blurry!del.html",
            	data: {
            		id: ids
            	},
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
            		//刷新表格
					$table.bootstrapTable('refresh', {pageNumber: 1});
    				alertSuccess("删除成功");
            	},
            	error: function() {
            		alertWarning();
            	}
            });
        }, "您确定要删除已选择的记录吗？");
    })
    
    //导入按钮点击，显示导入模态框
	$("#importBtn").on("click", function() {
		if (warehouseId == "") {
    		alertWarning("请先选择仓库！");
    		return;
    	}
		$.ajax({
			url: "../manage/blurry!showImport.html",
			type: "get",
			cache: false,
			dataType: "html",
			beforeSend: function() {
				showLoading();
			},
			complete: function() {
				removeLoading();
			},
			success: function(data) {
				var $modal = $("#importModal");
		        $modal.find(".modal-body").html(data);
		        $modal.find('.modal-body :file').prettyFile();
		        //表单验证
		        importValidate();
		        //显示模态框
		        showModal($modal);
			},
			error: function() {
				alertWarning();
			}
		});
	});
    
    //导入模态框中的保存按钮
	$("#importSaveBtn").on("click", function() {
		$("#importModal form").submit();
	})
	
	// 打印仓位
	$("#printBarcodeBtn").on("click",function() {
		// 显示模态框
		showWarehouseSmModal('../manage/blurry!printBarCode.html?id=' + getSelectOrderId());
	});
	
	//导出
	$("#reprotBlurry").on("click",function(){
		alertConfirm(function(){
        	var params = getExportParams("orderSearch");
    		location.href = "../report/report!blurryReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	//树形视图
    $("#jsTree").jstree({
    	'core' : {
            'data' : {
                "url" : "./blurry!getJsTreeFormatData.html",
                'dataType': 'json'
            }
        },
        'plugins': ['types', 'dnd'],
        "types": {
            "default": {
                "icon": "fa fa-folder"
            }
        }
    }).on('changed.jstree',function(e,data){
    	//当前选中节点的id
        warehouseId = data.instance.get_node(data.selected[0]).original.id;
        warehouseName = data.instance.get_node(data.selected[0]).original.text;
        if (warehouseId == 0) {
        	warehouseId = "";
        }
        $table.bootstrapTable('refresh', {pageNumber: 1});
    });

});

function getSelectOrderId(){
	var ids = null;
	var selectData = $table.bootstrapTable('getSelections');
	if (selectData.length == 0) {
		swal({
			title : "",
			text : "请至少选择一条记录！",
			type : "warning"
		});
		return ids;
	}
	ids = $(selectData).map(function() {
		return this.positionsId;
	}).get().join(',');
	return ids;
}

//小模态框
function showWarehouseSmModal(url){
	$("#outApplicationSmModal").removeData("bs.modal");
	$("#outApplicationSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}

var showSaveInput = function(positionsId) {
	$.ajax({
		url: "../manage/blurry!input.html",
		type: "post",
		data: {
			id: positionsId
		},
		dataType: "html",
		beforeSend: function() {
			showLoading();
		}, 
		complete: function() {
			removeLoading();
		},
		success: function(res) {
			var $modal = $("#saveModal");
			$modal.find(".modal-body").html(res);
			//填充模态框数据
			$modal.find("#warehouseName").val(warehouseName);
			$modal.find("#warehouseId").val(warehouseId);
			//表单验证
			saveValidate();
			//显示模态框
			showModal($modal);
		},
		error: function() {
			alertWarning();
		}
	});
}

//导入表单验证
var importValidate = function() {
	//表单验证
	var validate = $("#importModal form").validate({
		ignore: ".input-large",
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				url: "../manage/blurry!saveWithImport.html",
				type: "post",
				data: {
					"search.warehouseId": warehouseId
				},
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
					//刷新表格
					$table.bootstrapTable('refresh', {pageNumber: 1});
					$("#importModal").modal("hide");
					alertSuccess("导入成功");
				},
				error: function() {
					alertWarning();
				}
			});
		},
		rules: {
			file: "required"
		}
	});
	validatePrettyFile($("#importModal form .input-append"), validate);
}

//保存表单验证
var saveValidate = function() {
	$("#saveModal form").validate({
		submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form   
			$(form).ajaxSubmit({
				url: "../manage/blurry!save.html",
				type: "post",
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
					//刷新表格
					$table.bootstrapTable('refresh', {pageNumber: 1});
					$("#saveModal").modal("hide");
					alertSuccess("保存成功");
				},
				error: function() {
					alertWarning();
				}
			});
	    },
		rules: {
			"inputInfo.note": {
				required: true,
				maxlength: 30
			}
		}
	});
}