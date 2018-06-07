//index全局变量
var rowIndex;
// row全局变量
var row;
// 全局table对象
var $table;
var param = new Object();
function loadData(obj){
	obj.bootstrapTable({
		url:"../warehouse/route!data.html",
	    uniqueId: "id",
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
        	/*param["search.warehouseId"] = globalId;*/
        	return param;
        },
		columns : [
		{
			field : 'state',
			checkbox : true
		}, {
			field : 'id',
			visible : false,
			filterControl : "input", // 搜索框
			columnType : "Long"
		}, 
		{
			field : 'routeNum',
			title : '线路编号',
			sortable:true,
			filterControl : "input", // 搜索框
			columnType : "String"
		}, {
			field : 'routeName',
			title : '线路名称',
			sortable:true,
			filterControl : "input",
			columnType : "String"
			
		}, {
			field : 'assignType',
			title : '指配类型',
			sortable:true,
			formatter : function(value, row, index) {
				var str = "";
				if (row.assignType == 2) {
					str = "<span class='badge badge-warning'>物流公司</span>";
				} else {
					str = "<span class='badge badge-success'>司机</span>";
				}
				return str;
			},
			filterControl : "select",
			filterData : assignTypeJson,
			columnType : "Long"
		}, {
			field : 'routeType',
			title : '线路类型',
			sortable:true,
			formatter : function(value, row, index) {
				var str = "";
				if (row.routeType == 2) {
					str = "<span class='badge badge-warning'>退货</span>";
				} else {
					str = "<span class='badge badge-success'>送货</span>";
				}
				return str;
			},
			filterControl : "select",
			filterData : routeTypeJson,
			columnType : "Long"
		}, {
			field : 'carrier',
			title : '承运名称',
			sortable:true,
			filterControl : "input",
			columnType : "String"
			
		},{
			field : 'institution',
			title : '组织机构',
			sortable:true,
			filterControl : "input",
			columnType : "String"
		},{
			field : 'logisticsCompany',
			title : '物流公司',
			sortable:true,
			filterControl : "input",
			columnType : "String"
		}]
	});
}
$().ready(function() {

	$table = $('#table');
	loadData($table);
	// 添加
	$("#addBtn").on("click", function() {
		var $modal = $("#addModal");
		// 填充模态框数据
		$modal.find("#routeNum").val("");
		$modal.find("#routeName").val("");
		$modal.find("#carrier").val("");
		$modal.find("#institution").val("");
		$modal.find("#logisticsCompany").val("");
		addFormValidate();
		// 显示模态框
		$modal.modal({
			keyboard : false,
			backdrop : 'static',
			show : true
		});
	});
	// 编辑
	$("#updateBtn").on("click", function() {
		// 获取表格已选择项数组
		var checkArr = $table.bootstrapTable('getSelections');
		if (checkArr.length != 1) {
			swal({
				title : "",
				text : "请选择一条记录！",
				type : "warning"
			});
			return;
		}
		// 选中row
		row = checkArr[0];
		// 获取选中的index
		rowIndex = getCheckIndexArr($table)[0];
		var $modal = $("#editModal");
		$modal.find("#routeNum").val(row.routeNum);
		$modal.find("#routeName").val(row.routeName);
		$modal.find("#routeType").selectpicker('val', row.routeType);
		$modal.find("#assignType").selectpicker('val', row.assignType);
		$modal.find("#carrier").val(row.carrier);
		$modal.find("#institution").val(row.institution);
		$modal.find("#logisticsCompany").val(row.logisticsCompany);
		$modal.find("#id").val(row.id);
		addEditFormValidate();
		$modal.modal({
			keyboard : false,
			backdrop : 'static',
			show : true
		});
	});

	// 删除
	$("#deleteBtn").on("click", function() {
		// 获取表格已选择项数组
		var checkArr = $table.bootstrapTable('getSelections');
		var ids="";
		if (checkArr.length == 0) {
			swal({
				title : "",
				text : "请至少选择一条记录！",
				type : "warning"
			});
			return;
		}else{
			deleteOperation($table, checkArr);
			$.each(checkArr,function(index,ele){
				ids+=ele.id+",";
			});
			$.ajax({
				url:"../warehouse/route!deleteRoute.html",
			    type : "POST",
			    beforeSend:function(request){
	                request.setRequestHeader("ids",ids);
	            },
			    success:function(){
			    	$table.bootstrapTable("refresh");
			    	swal({
						title : "",
						text : "删除成功！",
						type : "success"
					});
			    }
			});
			
		}
	});
	//导入
	$("#importBtn").bind("click",function(){
		$.ajax({
			url:"../warehouse/route!showImport.html",
			type:"post",
			dataType:"html",
			cache:false,
			beforeSend:function(){
				showLoading();
			},
			complete:function(){
				removeLoading();
			},
			success:function(data){
				var $modal = $("#importModal");
				$modal.find(".modal-body").html(data);
				importFormValidate();
				$modal.find('.modal-body :file').prettyFile();
				$modal.modal({
		            keyboard : false,
		            backdrop : 'static',
		            show : true
		        });
			},
			error:function(msg){
				swal({
                    title: "",
                    text: "操作失败",
                    type: "warning"
                });
			}
		});
	});
	
	//导出
	$("#reprotRoute").on("click",function(){
		alertConfirm(function(){
        	var params = getRouteExportParams("search");
    		location.href = "../report/report!routeReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	//导入保存按钮
	$("#importSaveBtn").on("click", function(){
		$("#importModal form").submit();
	});
});

/**
 * 获取导出文件所需的参数
 */
var getRouteExportParams = function(prefix) {
	var params = new Object();
	for (var key in param) {
		if (key.indexOf(".") > 1) {
			params['routeSearch' + key.substring(key.indexOf("."))] = $.trim(param[key]);
		}
	}
	params["orderField"] = param["orderField"];
	params["orderDirection"] = param["orderDirection"];
	return params;
}


//添加表单校验
var addFormValidate = function() {
	$("#addModal form").validate({
		submitHandler: function(form) {
			$.ajax({  
				url: "../warehouse/route!save.html",
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
					$("#addModal").modal("hide");
					//刷新表格
					$table.bootstrapTable("refresh");
					alertSuccess("添加成功");
				},
				error: function() {
					alertWarning();
				}
			});
		},
		rules: {
			"route.routeNum":{
				required:true,
				maxlength: 20
			},
			"route.routeName":{
				required:true,
				maxlength: 30
			},
			"route.assignType":{
				required:true
			},
			"route.routeType":{
				required:true
			}
		},
		messages: {
			"route.routeNum":{
				required:"请输入线路编号",
				maxlength:"线路编号最大不超过{0}位"
			},
			"route.routeName":{
				required:"请输入线路名称",
				maxlength:"线路名称最大不超过{0}位"
			},
			"route.assignType":{
				required:"请选择指配类型",
			},
			"route.routeType":{
				required:"请选择线路类型",
			}
		},
		onkeyup:false
	});
} 


var addEditFormValidate = function() {
	$("#editModal form").validate({
		submitHandler: function(form) {
			$.ajax({  
				url: "../warehouse/route!save.html",
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
					$("#editModal").modal("hide");
					//刷新表格
					$table.bootstrapTable("refresh");
					alertSuccess("更新成功");
				},
				error: function() {
					alertWarning();
				}
			});
		},
		rules: {
			"route.routeNum":{
				required:true,
				maxlength: 20
			},
			"route.routeName":{
				required:true,
				maxlength: 30
			},
			"route.assignType":{
				required:true
			},
			"route.routeType":{
				required:true
			}
		},
		messages: {
			"route.routeNum":{
				required:"请输入线路编号",
				maxlength:"线路编号最大不超过{0}位"
			},
			"route.routeName":{
				required:"请输入线路名称",
				maxlength:"线路名称最大不超过{0}位"
			},
			"route.assignType":{
				required:"请选择指配类型",
			},
			"route.routeType":{
				required:"请选择线路类型",
			}
		},
		onkeyup:false
	});
} 

var importFormValidate=function(){
	$("#importModal form").validate({
		submitHandler:function(form){
			$(form).ajaxSubmit({
				url:"../warehouse/route!saveImport.html",
				type:"post",
				dataType:"json",
				beforeSend:function(){
					showLoading();
				},
				complete:function(){
					removeLoading();
				},
				success:function(data){
					if(data.errcode!=0){
						swal({
							title : "",
							text :data.errmsg,
							type : "warning"
						});
						return;
					}
					$("#importModal").modal("hide");
					//刷新表格
					$table.bootstrapTable("refresh");
					swal({
		                title: "",
		                text: "导入成功",
		                type: "success"
		            });
				},
				error:function(){
					swal({
		                title: "",
		                text: "导入失败",
		                type: "warning"
		            });
				}
			});
		},
		rules:{
			file:"required"
		}
	});
};
