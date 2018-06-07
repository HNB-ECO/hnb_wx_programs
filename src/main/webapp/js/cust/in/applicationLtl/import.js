/**
 * 订单明细
 */
$().ready(function() {
	// 表单样式
	$( '#importLtlInputFile' ).prettyFile();
	//表单验证
	$("#inApplicationLtlSmModal form").validate({
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				dataType: "json",
				beforeSend: function() {
					$("#inApplicationLtlSmModal").modal("hide");
					showLoading();
				}, 
				complete: function() {
					removeLoading();
				},
				success: function(data) {
					if (data.errcode == 0) {
						$table.bootstrapTable("refresh");
						swal({
			                title: "",
			                text: "导入成功",
			                type: "success"
			            });
					} else {
						swal({
			                title: "",
			                text: data.errmsg,
			                type: "warning"
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
	$("#applicationLtlImportSaveBtn").on("click", function() {
		$("#inApplicationLtlSmModal form").submit();
	})
});

