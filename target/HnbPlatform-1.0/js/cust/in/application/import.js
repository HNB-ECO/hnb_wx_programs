/**
 * 订单明细
 */
$().ready(function() {
	// 表单样式
	$( '#importInputFile' ).prettyFile();
	//表单验证
	$("#inApplicationSmModal form").validate({
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				dataType: "json",
				beforeSend: function() {
					$("#inApplicationSmModal").modal("hide");
					showLoading();
				}, 
				complete: function() {
					removeLoading();
				},
				success: function(data) {
					if (data.ok) {
						inApplicationTable.bootstrapTable("refresh");
						swal({
							title : "",
							text : "导入成功",
							type : "success"
						});
					} else {
						swal({
							title : "",
							text : data.message,
							type : "warning"
						});
					}
				},
				error: function(data) {
					swal({
		                title: "",
		                text: "导入失败，请重新操作",
		                type: "warning"
		            });
				}
			});
		}
	});
	//导入模态框中的保存按钮
	$("#applicationImportSaveBtn").on("click", function() {
		debugger
		var file = $("#importInputFile").val();
		if ( file== null || "" == file ) {
			swal({
                title: "",
                text: "请选择订单文件！",
                type: "warning"
            });
			return;
		}
		$("#inApplicationSmModal form").submit();
	})
});

