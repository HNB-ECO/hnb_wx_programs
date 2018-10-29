/**
 * 订单明细
 */
$().ready(function() {

	// 表单样式
	$( '#importInputFile' ).prettyFile();
	$( '#customerId' ).selectpicker();
	$( '#outOrderType' ).selectpicker();
	$( '#templateType' ).selectpicker();
	//表单验证
	$("#outApplicationSmModal form").validate({
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				dataType: "json",
				beforeSend: function() {
					$("#outApplicationSmModal").modal("hide");
					showLoading();
				}, 
				complete: function() {
					removeLoading();
				},
				success: function(data) {
					if (data.ok) {
						outApplicationTable.bootstrapTable("refresh");
						swal({
			                title: "",
			                text: "导入成功",
			                type: "success"
			            });
					} else {
						swal({
			                title: "",
			                text: data.message,
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
		$("#outApplicationSmModal form").submit();
	})
	
	//下载模版
	$("#downloadOutTemplate").on("click", function() {
		location.href = "../report/report!downloadOutTemplate.html?warehousePositionGoodsSearch.user.userId=" + $("#customerId").val();
	});
});

