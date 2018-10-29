//index全局变量
var rowIndex;
// row全局变量
var row;
// 全局table对象
var $table;
var param = new Object();
function loadData(obj){
	obj.bootstrapTable({
		url:"../warehouse/store!data.html",
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
			field : 'customerUser.userName',
			title : '客户姓名',
			sortable:true,
			filterControl : "input", // 搜索框
			columnType : "String"
		},
		{
			field : 'customerUser.userId',
			title : '客户ID',
			visible : false,
			filterControl : "input", // 搜索框
			columnType : "String"
		}, {
			field : 'storeNum',
			title : '门店编码',
			sortable:true,
			filterControl : "input",
			columnType : "String"
		}, {
			field : 'storeName',
			title : '门店名称',
			sortable:true,
			filterControl : "input",
			columnType : "String"
		}, {
			field : 'address',
			title : '门店地址',
			sortable:true,
			filterControl : "input",
			columnType : "String"
		},
		{
			field : 'route.routeId',
			visible : false,
			title : '线路ID',
			filterControl : "input",
			columnType : "Long"
		},{
			field : 'route.routeName',
			title : '线路名称',
			sortable:true,
			filterControl : "input",
			columnType : "String"
		},{
			field : 'personInCharge',
			title : '负责人',
			sortable:true,
			filterControl : "input",
			columnType : "String"
		},{
			field : 'telephone',
			title : '联系方式',
			sortable:true,
			filterControl : "input",
			columnType : "String"
		},{
			field : 'deliveryDate',
			title : '配送时间',
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
		$modal.find("#storeNum").val("");
		$modal.find("#storeName").val("");
		$modal.find("#personInCharge").val("");
		$modal.find("#telephone").val("");
		$modal.find("#address").val("");
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
		$modal.find("#storeNum").val(row.storeNum);
		var userName1=row["customerUser.userName"];
		$modal.find("#customerName").val(userName1);
		$modal.find("#customerName").css("disabled","false");
		$modal.find("#storeName").val(row.storeName);
		$modal.find("#customerId").val(row["customerUser.userId"]);
		$modal.find("#routeName").selectpicker('val', row.routeId);
		$modal.find("#personInCharge").val(row.personInCharge);
		$modal.find("#telephone").val(row.telephone);
		$modal.find("#address").val(row.address);
		$modal.find("#id").val(row.id);
		$modal.find("#deliveryDate").val(row.deliveryDate);
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
				url:"../warehouse/store!deleteStore.html",
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
	
	//重置密码
	$("#resetPwdBtn").on("click", function(){
		//获取表格已选择项数组
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length != 1) {
        	alertUpdateNone();
            return;
        }
        //选中row
        row = checkArr[0];
        $.ajax({
        	type: "get",
        	url: "../warehouse/store!inputResetPassword.html",
        	data: {
        		"store.id": row.id
        	},
        	dataType:"html",
        	cache: false,
        	beforeSend:function(){
				showLoading();
			},
			complete:function(){
				removeLoading();
			},
			success: function(data){
				var $modal = $("#resetPwdModal");
				$modal.find(".modal-body").html(data);
				resetPwdValidate();
				showModal($modal);
			},
			error: function(){
				alertWarning();
			}
        });
	});
	
	$("#resetPwdSaveBtn").on("click", function(){
		$("#resetPwdModal form").submit();
	});
	
	//导入
	$("#importBtn").bind("click",function(){
		$.ajax({
			url:"../warehouse/store!showImport.html",
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
	$("#reprotStore").on("click",function(){
		alertConfirm(function(){
        	var params = getStoreExportParams("search");
    		location.href = "../report/report!storeReport.html?" + $.param(params);
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
var getStoreExportParams = function(prefix) {
	var params = new Object();
	for (var key in param) {
		if (key.indexOf(".") > 1) {
			params['storeSearch' + key.substring(key.indexOf("."))] = $.trim(param[key]);
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
				url: "../warehouse/store!save.html",
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
			"store.customerUser.userId":{
				required:true
			},
			"store.storeNum":{
				required:true,
				remote: {
				        url: "../warehouse/store!validateStoreNum.html"
				    }
			},
			"store.storeName":{
				required:true
			},
			"store.personInCharge":{
				required:true
			},
			"store.telephone":{
				required:true
			},
			"store.route.id":{
				required:true
			}
		},
		messages: {
			"store.customerUser.userId":{
				required:"请选择客户"
			},
			"store.storeNum":{
				required:"请输入门店编码名称",
				remote:"门店编码已存在"
			},
			"store.storeName":{
				required:"请输入门店名称",
			},
			"store.personInCharge":{
				required:"请输入负责人",
			},
			"store.telephone":{
				required:"请输入电话号码",
			},
			"store.route.id":{
				required:"请选择线路",
			}
		},
		onkeyup:false
	});
} 
//添加表单校验
var addEditFormValidate = function() {
	$("#editModal form").validate({
		submitHandler: function(form) {
			$.ajax({  
				url: "../warehouse/store!save.html",
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
			"store.customerUser.userId":{
				required:true
			},
			"store.storeNum":{
				required:true,
				remote: {
				        url: "../warehouse/store!validateUpdateStoreNum.html",
				        cache:false,
				        data: {  
		                    "store.id": function () { return $("#editModal #id").val();},
		                    "store.customerUser.userId":function () { return $("#editModal #customerId").val();}
		                }  
				    }
			},
			"store.storeName":{
				required:true
			},
			"store.personInCharge":{
				required:true
			},
			"store.telephone":{
				required:true
			},
			"store.route.id":{
				required:true
			}
		},
		messages: {
			"store.customerUser.userId":{
				required:"请选择客户"
			},
			"store.storeNum":{
				required:"请输入门店编码名称",
				remote:"门店编码已存在"
			},
			"store.storeName":{
				required:"请输入门店名称",
			},
			"store.personInCharge":{
				required:"请输入负责人",
			},
			"store.telephone":{
				required:"请输入电话号码",
			},
			"store.route.id":{
				required:"请选择线路",
			}
		},
		onkeyup:false
	});
} 
var importFormValidate=function(){
	$("#importModal form").validate({
		submitHandler:function(form){
			$(form).ajaxSubmit({
				url:"../warehouse/store!saveImport.html",
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

var resetPwdValidate = function() {
	$("#resetPwdForm").validate({
		submitHandler:function(form){
			$(form).ajaxSubmit({
				url: "../warehouse/store!saveResetPwd.html",
				type: "post",
				dataType:"json",
				beforeSend:function(){
					showLoading();
				},
				complete:function(){
					removeLoading();
				},
				success:function(data){
					debugger;
					if(data.errcode!=0){
						alertWarning(data.errmsg);
						return;
					}
					$("#resetPwdModal").modal("hide");
					alertSuccess("重置密码成功");
				},
				error:function(){
					debugger;
					alertWarning();
				}
			});
		},
		rules:{
			"store.userPass": {
				required: true,
				checkPwd: true
			},
			confirmPass: {
				required: true,
				equalTo: "#resetNewPwd"
			}
		}
	});
}

$.validator.addMethod("checkPwd",function(value,element,params){  
	 var checkPwd = /^\w{6,16}$/g;  
	     return this.optional(element)||(checkPwd.test(value));  
	 },"*只允许6-16位英文字母、数字或者下画线！");  


