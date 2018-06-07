//全局table对象
var $table;

var globalWarehouseId;

$().ready(function () {

    $table = $("#table");

    initTable();

    //加载第一个仓库的数据
    changeTable($("#warehouse option:first").val());
    
    //选择框改变事件
    $("select").on("change", function() {
    	changeTable($(this).val());
    });
    
	// 添加入库单
	$("#printBarcodeBtn").on("click",function() {
		// 显示模态框
		showWarehouseSmModal('../manage/warehouse!printBarCode.html?id=' + globalWarehouseId);
	});
    
    //导入按钮点击事件
    $("#importBtn").on("click", function() {
    	$.ajax({
    		type: "get",
    		url: "../manage/warehouse!warehouseImport.html",
    		dataType: "html",
    		cache: false,
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
    			importValidate();
    			//显示模态框
    			showModal($modal);
    		},
    		error: function() {
    			alertWarning();
    		}
    	});
    });
    
    $("#importSaveBtn").on("click", function() {
    	$("#importModal form").submit();
    });
    
    //删除按钮点击事件
    $("#deleteBtn").on("click", function() {
    	alertConfirm(function() {
    		$.ajax({
    			url: "../manage/warehouse!warehouseDelete.html",
    			type: "get",
    			data: {
    				id: globalWarehouseId
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
        			alertWithFunc("删除成功！", "success", reloadFunc);
        		},
        		error: function() {
        			alertWarning("操作失败", "warning", reloadFunc);
        		}
    		});
    	}, "删除仓库会将该仓库下的仓位编码一起删除，确定要删除该仓位吗？");
    });
    
    //编辑按钮点击事件
    $("#updateBtn").on("click", function() {
    	$.ajax({
    		url: "../manage/warehouse!getWarehouseLockType.html",
    		get: "get",
    		data: {
    			id: globalWarehouseId
    		},
    		cache: false,
    		dataType: "text",
    		beforeSend: function() {
    			showLoading();
    		},
    		success: function(data) {
    			if (data == "" || data == 2) {
    				removeLoading();
    				alertWithFunc("数字仓库已删除，请确认！", "warning", reloadFunc);
    				return;
    			}
    			if (data == 1) {
    				removeLoading();
    				alertWarning("数字仓库已被锁定，请确认！");
    				return;
    			}
    			$.ajax({
    				url: "../manage/warehouse!warehouseEdit.html",
    	    		type: "get",
    	    		data: {
    	    			id: globalWarehouseId
    	    		},
    	    		dataType: "html",
    	    		cache: false,
    	    		complete: function() {
    	    			removeLoading();
    	    		},
    	    		success: function(data) {
    	    			var $modal = $("#updateModal");
    	    			$modal.find(".modal-body").html(data);
    	    			updateValidate();
    	    			//显示模态框
    	    			showModal($modal);
    	    		},
    	    		error: function() {
    	    			alertWarning("操作失败", "warning", reloadFunc);
    	    		}
    			});
    		},
    		error: function() {
    			removeLoading();
    			alertWarning("操作失败！");
    		}
    	});	
    });
    
    $("#updateSaveBtn").on("click", function() {
    	$("#updateModal form").submit();
    });
});

//编辑表单校验
var updateValidate = function() {
	$("#updateModal form").validate({
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				url: "../manage/warehouse!warehouseEditSave.html",
				type: "post",
				beforeSend: function() {
					showLoading();
				},
				complete: function() {
					removeLoading();
				},
				dataType: "json",
				success: function(data) {
					if (data.errcode != 0) {
						alertWarning(data.errmsg);
						return;
					}
					$("#updateModal").modal("hide");
					alertSuccess("保存成功！");
				},
				error: function() {
					alertWarning();
				}
			});
		},
		rules: {
			"warehouse.warehouserName": {
				required: true
			},
			"warehouse.parameter": {
				required: true,
				maxlength: 20
			},
			"warehouse.owners": {
				required: true,
				maxlength: 20
			},
			"warehouse.area": {
				required: true,
				maxlength: 50
			},
			"warehouse.address": {
				required: true,
				maxlength: 200
			},
			"warehouse.alertInventory": {
				required: true,
				digits: true,
				range: [1, 100]
			}
		}
	});
}

//导入表单校验
var importValidate = function() {
	var validate = $("#importModal form").validate({
		ignore: ".input-large",
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				url: "../manage/warehouse!warehouseSave.html",
				type: "post",
				beforeSend: function() {
					showLoading();
				},
				complete: function() {
					removeLoading();
				},
				dataType: "json",
				success: function(data) {
					if (data.errcode != 0) {
						alertWarning(data.errmsg);
						return;
					}
					alertWithFunc("保存成功！", "success", reloadFunc);
				},
				error: function() {
					alertWarning();
				}
			});
		},
		rules: {
			"warehouse.warehouserName": {
				required: true,
				maxlength: 20,
				remote: {
					url: "../manage/warehouse!validateWarehouseName.html"
				}
			},
			"warehouse.parameter": {
				required: true,
				maxlength: 20
			},
			"warehouse.owners": {
				required: true,
				maxlength: 20
			},
			"warehouse.area": {
				required: true,
				maxlength: 50
			},
			"warehouse.address": {
				required: true,
				maxlength: 200
			},
			"warehouse.alertInventory": {
				required: true,
				digits: true,
				range: [1, 100]
			},
			file: {
				required: true
			}
		}
	});
	validatePrettyFile($("#importModal form .input-append"), validate);
}

//改变表格内容
var changeTable = function(warehouseId) {
	if (!warehouseId) {
		return;
	}
	globalWarehouseId = warehouseId;
	$.ajax({
		url: "../manage/warehouse!getWarehouseLockType.html",
		get: "get",
		data: {
			id: globalWarehouseId
		},
		cache: false,
		dataType: "text",
		beforeSend: function() {
			showLoading();
		},
		success: function(data) {
			if (data == "" || data == 2) {
				removeLoading();
				alertWithFunc("数字仓库已删除，请确认！", "warning", reloadFunc);
				return;
			}
			$.ajax({
				type: "get",
				url: "../manage/warehouse!warehouseLayout.html",
				data: {
					id: globalWarehouseId
				},
				cache: false,
				dataType: "json",
				complete: function() {
					removeLoading();
				},
				success: function(data) {
					var html = "";
					var returnHtml = data.data.html;
					for (var index in returnHtml) {
						html += returnHtml[index];
					}
					$table.html(html);
				},
				error: function() {
					alertWithFunc("操作失败！", "warning", reloadFunc);
				}
			});
		},
		error: function() {
			removeLoading();
			alertWithFunc("操作失败！", "warning", reloadFunc);
		}
	});
}

//初始化表格
var initTable = function(){
    var html = "";
    for (var i = 0; i < 50; i++) {
        html += "<tr>";
        for (var j = 0; j < 50; j++) {
            html += "<td class='text-center color-black sign-td-width'>&nbsp;</td>";
        }
        html += "</tr>";
    }
    $table.html(html);
};

//小模态框
function showWarehouseSmModal(url){
	$("#warehouseNoteSmModal").removeData("bs.modal");
	$("#warehouseNoteSmModal").modal({
		keyboard: false,
		backdrop: 'static',
		show: true,
		remote: url
	});
}

var reloadFunc = function() {
	location.reload();
}