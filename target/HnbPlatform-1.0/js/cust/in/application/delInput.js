/**
 * 订单明细
 */
$().ready(function() {
	//表单验证
	$("#inApplicationSmModal form").validate({
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				dataType: "json",
				beforeSend: function() {
					showLoading();
				}, 
				complete: function() {
					removeLoading();
				},
				success: function(data) {
					if (data.ok) {
						$("#applicationDelCloseBtn").click();
						inApplicationTable.bootstrapTable("refresh");
						swal({
							title : "",
							text : "删除成功",
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
		                text: "删除失败，请重新操作",
		                type: "warning"
		            });
				}
			});
		}
	});
	//导入模态框中的保存按钮
	$("#applicationDelSaveBtn").on("click", function() {
		$("#inApplicationSmModal form").submit();
	})
});

