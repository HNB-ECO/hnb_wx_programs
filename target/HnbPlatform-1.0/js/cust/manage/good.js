//row全局变量
var row;
//全局table对象
var $table;
//全局类型id
var goodTypeId = "";
//是否可以编辑添加
var canSave = false;
var param = new Object();
$().ready(function(){
    $table = $('#table');
    $table.bootstrapTable({
        url: "../manage/good!data.html",//加载数据的url
        uniqueId: "goodNameId",
        queryParams: function (params) {
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
        		for (var key in filter) {
        			param["search." + key] = filter[key];
        		}
        	}
        	//额外的参数
        	param["search.goodTypeId"] = goodTypeId;
        	return param;
        },
        columns: [
            {
                field : "state",
                checkbox : true
            },
            {
                field : "goodNameId",
                title : "goodNameId",
                visible : false,
                switchable : false,
    			columnType : "Long"
            },
            {
                field : "customerUserName",
                title : "客户名称",
    			filterControl : "input",
    			columnType : "String"
            },
            {
                field : "goodShortName",
                title : "品项编码",
                sortable: true,
    			filterControl : "input",
    			columnType : "String"
            },
            {
                field : "goodName",
                title : "品项名称",
                sortable: true,
    			filterControl : "input",
    			columnType : "String"
            },
            {
                field : "goodMergeContainerType",
                title : "是否拼托",
                sortable: true,
                formatter : function (value, row, index) {
                    var str = "";
                    if (value == 1) {
                        str = "<span class='badge badge-primary'>是</span>";
                    } else {
                        str = "<span class='badge badge-danger'>否</span>";
                    }
                    return str;
                },
    			filterControl : "select",
    			filterData : mergeTypeJson,
    			columnType : "Long"
            },
            {
                field : "goodMergeContainerCode",
                title : "拼托代号",
                sortable: true,
    			filterControl : "input",
    			columnType : "String"
            },
            {
                field : "transiType",
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
                filterControl : "select",
    			filterData : transiTypeJson,
    			columnType : "Long"
            },
            {
                field : "warehouseType",
                title : "温层",
                sortable: true,
                formatter : wcInitFunc,
    			filterControl : "select", // 搜索框
    			filterData : freezeTypeJson,
    			columnType : "Long"
            },
            {
                field : "goodSpecification",
                title : "规格",
                sortable: true,
    			filterControl : "input",
    			columnType : "String"
            },
            {
                field : "goodWeight",
                title : "单重",
                sortable: true,
    			filterControl : "input",
    			columnType : "Double"
            },
            {
                field : "goodUnit",
                title : "出库单位",
                sortable: true,
    			filterControl : "input",
    			columnType : "String"
            },
            {
                field : "packageStyle",
                title : "包装形式",
                sortable: true,
    			filterControl : "input",
    			columnType : "String"
            },
            {
                field : "packageNum",
                title : "包装规格",
                sortable: true,
    			filterControl : "input",
    			columnType : "Long"
            },
            {
                field : "containerInfoNum",
                title : "托盘最大数量",
                sortable: true,
    			filterControl : "input",
    			columnType : "Long"
            },
            {
                field : "safeStock",
                title : "安全库存",
                sortable: true,
    			filterControl : "input",
    			columnType : "Long"
            },
            {
                field : "dangerStock",
                title : "危险库存",
                sortable: true,
    			filterControl : "input",
    			columnType : "Long"
            }
        ],
		onDblClickRow: function(row) {
			// 双击加载明细
			openEdit(row.goodNameId);
		}

    });

    //保存模态框初始内容
	var saveModalBodyHtml = $("#saveModal .modal-body").html();
	//导入模态框初始内容
	var importModalBodyHtml = $("#importModal .modal-body").html();
	
	//保存模态框关闭事件
	$('#saveModal').on('hidden.bs.modal', function (e) {
		//初始化模态框
		$(this).find(".modal-body").html(saveModalBodyHtml);
		$(this).find(".modal-body select").selectpicker();
		initICheck();
	});
	
	//导入模态框关闭事件
	$('#importModal').on('hidden.bs.modal', function (e) {
		//初始化模态框
		$(this).find(".modal-body").html(importModalBodyHtml);
	});
    
    //添加
    $("#addBtn").on("click", function() {
    	if (!canSave) {
    		alertWarning("请先选择商品类别！");
    		return;
    	}
        var $modal = $("#saveModal");
        $modal.find(".modal-title").text("添加");
        $modal.find("#lx").val(goodTypeId);
        saveFormValidate();
        //显示模态框
        showModal($modal);
    });
    
    //初始化单选框
    initICheck();

    //添加保存按钮
    $("#saveBtn").on("click", function() {
        $("#saveModal form").submit();
    });

    //编辑
    $("#updateBtn").on("click", function () {
        //获取表格已选择项数组
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length != 1) {
        	alertUpdateNone();
            return;
        }
        //选中row
        row = checkArr[0];
        openEdit(row.goodNameId);
    });

    //删除
    $("#deleteBtn").on("click", function () {
        //获取表格已选择项数组
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length == 0) {
        	alertDeleteNone();
            return;
        }
        var ids = getIds(checkArr, "goodNameId");
        //确认或取消选择框
        alertConfirm(function(){
        	$.ajax({
            	url: "../manage/good!goodsNameDelete.html",
            	type: "post",
            	data: {
            		id: ids
            	},
            	cache: false,
            	dataType: "json",
            	beforeSend: function() {
        			showLoading();
        		}, 
        		complete: function() {
        			removeLoading();
        		},
            	success: function(data) {
            		if (data.errcode != 0) {
            			alertWarning();
            			return;
            		}
            		$table.bootstrapTable('refresh', {pageNumber: 1});
            		alertSuccess("删除成功");
            	},
            	error: function() {
            		alertWarning();
        		}
            })
        }, "您确定要删除已选择的记录吗？");
    });
    
    //导出
	$("#reprotGood").on("click",function(){
		alertConfirm(function(){
        	var params = getGoodExportParams("search");
    		location.href = "../report/report!goodReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
    
    //导入按钮点击事件
    $("#importBtn").on("click", function() {
    	if (!canSave) {
    		alertWarning("请先选择商品类别！");
    		return;
    	}
    	var $modal = $("#importModal");
    	$modal.find('.modal-body :file').prettyFile();
    	importFormValidate();
    	//显示模态框
        showModal($modal);
    });
    
    $("#importSaveBtn").on("click", function() {
    	$("#importModal form").submit();
    })

    //树形视图
    $("#jsTree").jstree({
    	'core' : {
            'data' : {
                "url" : "../manage/good!getJsTreeFormatData.html",
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
        goodTypeId = data.instance.get_node(data.selected[0]).id;
        if (goodTypeId == "j1_1" || goodTypeId == 0) {
        	goodTypeId = "";
        }
        $table.bootstrapTable('refresh', {pageNumber: 1});
        if (data.node.children.length) {
        	canSave = false;
        } else {
        	canSave = true;
        }
    });
});

/**
 * 获取导出文件所需的参数
 */
var getGoodExportParams = function(prefix) {
	var params = new Object();
	for (var key in param) {
		if (key.indexOf(".") > 1) {
			params['goodSearch' + key.substring(key.indexOf("."))] = $.trim(param[key]);
		}
	}
	params["orderField"] = param["orderField"];
	params["orderDirection"] = param["orderDirection"];
	return params;
}

var openEdit = function(id){
	 $.ajax({
     	type: "post",
     	url: "../manage/good!detail.html",
     	data: {
     		id: id
     	},
     	cache: false,
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
 			var $modal = $("#saveModal");
 		    $modal.find(".modal-title").text("编辑");
 		    $modal.find("#khmc").selectpicker('val', data.data.userIdList);
 	        $modal.find("#cpbm").val(data.data.goodShortName);
 	        $modal.find("#cpmc").val(data.data.goodName);
 	        if (data.data.goodMergeContainerType == 1) {
 	            $modal.find("#yes").iCheck('check');
 	        } else {
 	            $modal.find("#no").iCheck('check');
 	        }
 	        if (data.data.transiType == 2) {
 	            $modal.find("#tran-yes").iCheck('check');
 	        } else {
 	            $modal.find("#tran-no").iCheck('check');
 	        }
 	        
 	       if (data.data.thawType == 1) {
	            $modal.find("#thaw-type-yes").iCheck('check');
	        } else {
	            $modal.find("#thaw-type-no").iCheck('check');
	        }
 	       
 	      if (data.data.transiTypeStatus == 1) {
	            $modal.find("#transiTypeStatus-yes").iCheck('check');
	        } else {
	            $modal.find("#transiTypeStatus-no").iCheck('check');
	        }
 	        $modal.find("#wc").selectpicker('val', data.data.warehouseType);
 	        $modal.find("#ptdh").val(data.data.goodMergeContainerCode);
 	        $modal.find("#gg").val(data.data.goodSpecification);
 	        $modal.find("#dz").val(data.data.goodWeight);
 	        $modal.find("#dw").val(data.data.goodUnit);
 	        $modal.find("#tpzdsl").val(data.data.containerInfoNum);
 	        $modal.find("#bh").val(data.data.goodNameId);
 	        $modal.find("#lx").val(data.data.goodTypeId);
 	        $modal.find("#bzxs").val(data.data.packageStyle);
 	        $modal.find("#bzsl").val(data.data.packageNum);
 	        $modal.find("#aqkc").val(data.data.safeStock);
 	        $modal.find("#wxkc").val(data.data.dangerStock);
 	       
 	        saveFormValidate();
 		    //显示模态框
 		    showModal($modal);
 		},
 		error: function() {
 			alertWarning();
 		}
     })
}

var initICheck = function() {
	$('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
	
	$(".input-check:even").iCheck('check');
	
	$('.input-check:lt(2)').on("ifChecked", function (event) {
        var $this = $(this);
        var $nextDiv = $this.parent().parent().parent().parent().parent().next("div");
        if ($this.val() == 1) {
            $nextDiv.css("display", "block");
        } else {
            $nextDiv.css("display", "none");
            $nextDiv.find("input").val("");
        }
    });
	
}

var saveFormValidate = function() {
	$("#saveModal form").validate({
		submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form   
			$.ajax({
				url: "../manage/good!goodsNameSave.html",
				type: "post",
				cache: false,
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
					$("#saveModal").modal("hide");
					//刷新表格
					$table.bootstrapTable('refresh', {pageNumber: 1});
					alertSuccess("保存成功");
				},
				error: function() {
					alertWarning();
				}
			});
	    },
		rules: {
			"goodsName.goodShortName": {
				required: true,
				maxlength: 20,
				remote: {
					url: "../manage/good!checkShortName.html",
					data: {
						"goodsName.goodShortName": function() {
							return $("#cpbm").val();
						},
						"goodsName.goodNameId": $("#bh").val(),
						"customer.userId": $("#khmc").val()
					}
				}
			},
			"goodsName.goodName": {
				required: true,
				maxlength: 60
			},
			"goodsName.goodMergeContainerCode": {
				required: true,
				maxlength: 200
			},
			"goodsName.goodSpecification": {
				required: true,
				maxlength: 20
			},
			"goodsName.goodWeight": {
				required: true,
				number: true
			},
			"goodsName.goodUnit": {
				required: true,
				maxlength: 20
			},
			"goodsName.packageStyle": {
				required: true,
				maxlength: 50
			},
			"goodsName.packageNum": {
				required: true,
				digits: true
			},
			"goodsName.containerInfoNum": {
				required: true,
				digits: true
			},
			"goodsName.safeStock": {
				required: true,
				digits: true
			},
			"goodsName.dangerStock": {
				required: true,
				digits: true
			}
		}
	});
}

var importFormValidate = function() {
	var validate = $("#importModal form").validate({
		ignore: ".input-large",
		submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form   
			$(form).ajaxSubmit({
				url: "../manage/good!saveImport.html",
				type: "post",
				data: {
					"inputInfo.goodTypeId": goodTypeId
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
					$("#importModal").modal("hide");
					//刷新表格
					$table.bootstrapTable('refresh', {pageNumber: 1});
					alertSuccess("导入成功");
				},
				error: function(data) {
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