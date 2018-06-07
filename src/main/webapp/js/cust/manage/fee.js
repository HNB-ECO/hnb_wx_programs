//row全局变量
var row;
//全局table对象
var $table;

$().ready(function(){

    $table = $('#table');
    $table.bootstrapTable({
        url: "../manage/fee!data.html",//加载数据的url
        columns: [
            {
                field : "state",
                checkbox : true
            },
            {
                field : "feeId",
                title : "feeId",
                visible : false,
                switchable : false,
    			columnType : "Long"
            },
            {
                field : "feeName",
                title : "收费名称",
                sortable : true,
    			filterControl : "input",
    			columnType : "String"
            },
            {
                field : "feeType",
                title : "收费类型",
                sortable : true,
                formatter : feeTypeInitFunc,
    			filterControl : "select",
    			filterData : feeTypeJson,
    			columnType : "Long"
            },
            {
                field : "feeNum",
                title : "应收金额",
                sortable : true,
    			filterControl : "input",
    			columnType : "Double"
            },
            {
                field : "feeUnit",
                title : "计费单位",
                sortable : true,
                formatter : feeUnitInitFunc,
    			filterControl : "select",
    			filterData : feeUnitJson,
    			columnType : "Long"
            },
            {
                field : "boardNum",
                title : "板数",
                sortable : true,
    			filterControl : "input",
    			columnType : "Double"
            },
            {
                field : "warehouseName",
                title : "适用仓库",
    			columnType : "String"
            }
        ]

    });
    
	//添加
    $("#addBtn").on("click", function() {
        $("#saveModal .modal-title").text("添加");
        showSaveInput("");
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
        $("#saveModal .modal-title").text("编辑");
        $.ajax({
        	url: "../manage/fee!checkFeeExist.html",
        	type: "get",
        	data: {
        		id: row.feeId
        	},
        	dataType: "json",
        	cache: false,
        	beforeSend: function() {
    			showLoading();
    		}, 
    		success: function(data) {
    			if (data.errcode != 0) {
    				alertWarning(data.errmsg);
    				return;
    			}
    			showSaveInput(row.feeId);
    		},
    		error: function() {
    			removeLoading();
    			alertWarning();
    		}
        });
    });
    
    //保存按钮
    $("#saveBtn").on("click", function() {
        $("#saveModal form").submit();
    });
    
    //删除
    $("#deleteBtn").on("click", function () {
        //获取表格已选择项数组
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length == 0) {
        	alertDeleteNone();
            return;
        }
        var ids = getIds(checkArr, "feeId");
        //确认或取消选择框
        alertConfirm(function(){
        	$.ajax({
            	url: "../manage/fee!delete.html",
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
            			alertWarning(data.errmsg);
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
	
	//收费类型下拉选择框事件
	$("#saveModal").on("change", "#feeTypeSelect", function() {
		var $modal = $("#saveModal");
		var $unitStorage = $modal.find("#feeUnitStorage");
		$unitStorage.removeClass("hidden");
		$modal.find(":radio[name='fee.feeCycleType']").iCheck("uncheck");
		if (this.value == 2) {
			$unitStorage.addClass("hidden");
			if ($modal.find(":radio[name='fee.feeUnit']:checked").val() == 2) {
				$modal.find(":radio[name='fee.feeUnit']:first").iCheck("check");
			}
		}
	});
	
	//
	$("#saveModal").on("click", "input[type='radio']", function() {
		var $modal = $("#saveModal");
		var $unitStorage = $modal.find("#feeUnitStorage");
		$unitStorage.removeClass("hidden");
		$modal.find(":radio[name='fee.feeUnit']").iCheck("uncheck");
		if (this.value == 2) {
			$unitStorage.addClass("hidden");
			if ($modal.find(":radio[name='fee.feeUnit']:checked").val() == 2) {
				$modal.find(":radio[name='fee.feeUnit']:first").iCheck("check");
			}
		}
	});
	
	//导入按钮
	$("#importBtn").on("click", function(){
		$.ajax({
			url: "../manage/fee!showImport.html",
			type: "get",
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
				importFormValidate();
				showModal($modal);
			},
			error: function() {
				alertWarning();
    		}
		});
	});
	
	//导出
	$("#reprotFee").on("click",function(){
		alertConfirm(function(){
        	var params = getExportParams("orderSearch");
    		location.href = "../report/report!feeReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	//导入保存按钮
	$("#importSaveBtn").on("click", function(){
		$("#importModal form").submit();
	});

});

//保存表单验证
var saveFormValidate = function() {
	$("#saveModal form").validate({
		submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form   
			$.ajax({
				url: "../manage/fee!save.html",
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
				error: function(data) {
					alertWarning();
				}
			});
	    },
		rules: {
			"fee.feeName": {
				required: true,
				maxlength: 20
			},
			"fee.feeNum": {
				required: true,
				number: true
			},
			"fee.cycleNum": {
				required: true,
				digits: true,
			},
			"fee.boardNum": {
				number: true
			}
		}
	});
}

//导入文件表单验证
var importFormValidate = function() {
	var validate = $("#importModal form").validate({
		ignore: ".input-large",
		submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form   
			$(form).ajaxSubmit({
				url: "../manage/fee!saveImport.html",
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
};

//加载添加编辑模态框
var showSaveInput = function(id) {
	$.ajax({
		url: "../manage/fee!input.html",
		type: "get",
		data: {
			id: id
		},
		dataType: "html",
		cache: false,
		beforeSend: function() {
			showLoading();
		}, 
		complete: function() {
			removeLoading();
		},
		success: function(data) {
			var $modal = $("#saveModal");
			$modal.find(".modal-body").html(data);
			initSelect(id);
			initCheck(id);
			saveFormValidate();
			//显示模态框
	        showModal($modal);
		},
		error: function() {
			alertWarning();
		}
	});
}

//初始化下拉选择框
var initSelect = function(id) {
	var $modal = $("#saveModal");
	if (id == "") {
		$modal.find("select").selectpicker();
	} else {
		$modal.find("select").selectpicker("val", JSON.parse($("#warehouseIds").val()));
	}
}

//初始化单选框
var initCheck = function(id) {
	var $modal = $("#saveModal");
	var $unit = $modal.find(":radio[name='fee.feeUnit']");
	$unit.iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
	if (id == "") {
		$unit.first().iCheck("check");
	} else {
		var feeUnit = $modal.find("#feeUnit").val();
		$unit.each(function(i) {
			if (this.value == feeUnit) {
				$(this).iCheck("check");
			}
		});
	}
}
