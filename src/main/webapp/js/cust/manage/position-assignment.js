
//全局table对象
var $table;

var warehouseLockType;

$().ready(function () {

    $table = $("#table");

    //初始化表格
    initTable();

    //加载第一个仓库的数据
    changeTable($("select option:first").val());
    
    //选择框改变事件
    $("select").on("change", function() {
    	changeTable($(this).val());
    });
    
    //点击保存按钮提交表单
    $("#saveBtn").on("click", function() {
    	$("#detailModal form").submit();
    });
});

var showDialog = function(jsonData) {
	$.ajax({
		type: "get",
		url: "../manage/position-assignment!dialogInput.html",
		data: {
			jsonData: jsonData
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
			var $modal = $("#detailModal");
			$modal.find(".modal-body").html(data);
			if (warehouseLockType != "0") {
				$modal.find(".modal-body input").attr("readonly", true);
				$modal.find("#saveBtn").css("display", "none");
			} else {
				validateForm($modal.find("form"));
			}
			//显示模态框
			showModal($modal);
		},
		error: function() {
			alertWarning();
		}
	});
}

//构造表单参数
var getFormData = function($form) {
	var dataArray = $form.serializeArray();
	for (var index in dataArray) {
		var data = dataArray[index];
		var name = data.name.split("_");
		data["name"] = name[0] + "[" + name[1] + "]";
	}
	return $.param(dataArray);
}

//表单验证
var validateForm = function($form) {
	$form.validate({
		submitHandler : function(form) {
			var formData = getFormData($form);
			//验证是否重复
			$.ajax({
				url: "../manage/position-assignment!checkRepeat.html",
				type: "post",
				data: formData,
				dataType: "text",
				beforeSend: function() {
					showLoading();
				},
				success: function(data) {
					if (data != "OK") {
						removeLoading();
						alertWarning(data);
						return;
					}
					//提交表单
					$.ajax({
						url: "../manage/position-assignment!save.html",
						data: formData,
						type: "post",
						complete: function() {
							removeLoading();
						},
						dataType: "json",
						success: function(data) {
							if (data.errcode != 0) {
								alertWarning(data.errmsg);
								return;
							}
							$("#detailModal").modal("hide");
							alertSuccess("保存成功");
						},
						error: function() {
							alertWarning();
						}
					});
				},
				error: function() {
					removeLoading();
					alertWarning();
				}
			});
		}
	});
}

//改变表格内容
var changeTable = function(warehouseId) {
	if (!warehouseId) {
		return;
	}
	$.ajax({
		type: "get",
		url: "../manage/position-assignment!getWarehouseLockType.html",
		data: {
			id: warehouseId
		},
		cache: false,
		dataType: "text",
		beforeSend: function() {
			showLoading();
		},
		success: function(data) {
			if (data.indexOf(",")) {
				warehouseLockType = data.substring(data.indexOf(",") + 1);
			} else {
				warehouseLockType = "";
			}
			$.ajax({
				url: "../manage/position-assignment!warehouseLayout.html",
				type: "get",
				data: {
					id: warehouseId
				},
				cache: false,
				dataType: "json",
				complete: function() {
					removeLoading();
				},
				success: function(data) {
					if (data.errcode != 0) {
						alertWarning(data.errmsg);
						return;
					}
					var html = "";
					var returnHtml = data.data.html;
					for (var index in returnHtml) {
						html += returnHtml[index];
					}
					$table.html(html);
				},
				error: function() {
					alertWarning();
				}
			});
		},
		error: function() {
			removeLoading();
			alertWarning();
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
