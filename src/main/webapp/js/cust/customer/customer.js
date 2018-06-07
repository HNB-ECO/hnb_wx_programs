//index全局变量
var rowIndex;
// row全局变量
var row;
// 全局table对象
var $table;
var param = new Object();
function loadData(obj){
	obj.bootstrapTable({
	   url:"../customer/customer!data.html",
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
            field : "state",
            checkbox : true
        },
		{
			field : 'userId',
			visible : false,
			filterControl : "input", // 搜索框
			columnType : "Long"
		}, 
		 {
			field : 'userCode',
			title:'简称',
			sortable:true,
			filterControl : "input", // 搜索框
			columnType : "String"
		},
		{
			field : 'userName',
			title : '姓名',
			sortable:true,
			filterControl : "input", // 搜索框
			columnType : "String"
		}, {
			field:'userPass',
			visible:false,
			sortable:true,
			filterControl:"input",
			columnType:"String"
		},{
			field:'userIdkey',
			title:"身份证",
			sortable:true,
			filterControl:"input",
			columnType:"String"
		}, {
        	field:"userMail",
        	title:"邮箱",
        	sortable:true,
        	filterControl : "input",
        	columnType:"String"
        },{
        	field:"userMb",
        	title:"手机",
        	sortable:true,
        	filterControl : "input",
        	columnType:"String"
        },
        {
        	field:"userPhone",
        	title:"电话",
        	sortable:true,
        	filterControl : "input",
        	columnType:"String"
        },
        {
        	field:"userAddress",
        	title:"地址",
        	sortable:true,
        	filterControl : "input",
        	columnType:"String"
        }]
	});
}
$().ready(function() {
	$table = $('#table');
	loadData($table);
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
        	url: "../customer/customer!checkCustomerExist.html",
        	type: "get",
        	data: {
        		id: row.userId
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
    			showSaveInput(row.userId);
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
        var ids = getIds(checkArr, "userId");
        //确认或取消选择框
        alertConfirm(function(){
        	$.ajax({
            	url: "../customer/customer!delete.html",
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
	
	//导入按钮
	$("#importBtn").bind("click",function(){
		$.ajax({
			url:"./customer!showImport.html",
			type:"get",
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
				$modal.find('.modal-body :file').prettyFile();
				importFormValidate();
				$modal.modal({
		            keyboard : false,
		            backdrop : 'static',
		            show : true
		        });
			},
			error:function(){
				swal({
                    title: "",
                    text: "操作失败",
                    type: "warning"
                });
			}
		});
	});
	
	//导入保存按钮
	$("#importSaveBtn").on("click", function(){
		$("#importModal form").submit();
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
        	url: "../customer/customer!inputResetPassword.html",
        	data: {
        		"customerUser.userId": row.userId
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
	
	//导出
	$("#reprotCustomer").on("click",function(){
		alertConfirm(function(){
        	var params = getCustomerExportParams();
    		location.href = "../report/report!customerReport.html?" + $.param(params);
    		alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
	});
	
	$("#resetPwdSaveBtn").on("click", function(){
		$("#resetPwdForm").submit();
	});
});

//保存表单验证
var saveFormValidate = function() {
	$("#saveModal form").validate({
		submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form   
			$.ajax({
				url: "../customer/customer!save.html",
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
			"customerUser.userCode": {
				required: true,
				maxlength: 10
			},
			"customerUser.userName": {
				required: true,
				maxlength: 10
			},
			"customerUser.userPass": {
				required: true,
				checkPwd:true,  
			},
			"confirmpassword":{
				required: true,
				equalTo:"#userPass",  
			},
			"customerUser.userIdkey":{
				required: true
			},
			"customerUser.userMail":{
                required:true,  
                checkEmail:true,  
			},
			"customerUser.userMb":{
			    required:true,  
			},
			"customerUser.userPhone":{
				required:true, 
			},
			"customerUser.userAddress":{
				required:true, 
			}
		},
		messages:{
			"customerUser.userCode":{
				required:"请输入客户简称",
				maxlength:"客户简称不超过{0}位"
			},
			"customerUser.userName":{
				required:"请输入客户姓名",
				maxlength:"客户姓名不超过{0}位"
			},
			"customerUser.userPass":{
				required:"请输入密码",
			},
			"confirmpassword":{
				required:"请再次输入密码",
				equalTo:"两次密码输入不一致",  
			},
			"customerUser.userIdkey":{
				required:"请输入身份证号",
			},
			"customerUser.userMail":{
				required:"请输入邮箱",  
                email:"请输入正确的邮箱",  
			},
			"customerUser.userMb":{
				required:"请输入手机号",  
			},
			"customerUser.userPhone":{
				required:"请输入电话",  
			},
			"customerUser.userAddress":{
				required:"请输入地址", 
			}
		}
	});
}
$.validator.addMethod("checkPwd",function(value,element,params){  
	 var checkPwd = /^\w{6,16}$/g;  
	     return this.optional(element)||(checkPwd.test(value));  
	 },"*只允许6-16位英文字母、数字或者下画线！");  
$.validator.addMethod("checkEmail",function(value,element,params){  
    var checkEmail = /^[a-z0-9]+@([a-z0-9]+\.)+[a-z]{2,4}$/i;  
    return this.optional(element)||(checkEmail.test(value));  
},"*请输入正确的邮箱！");  
//导入文件表单验证
var importFormValidate=function(){
	$("#importModal form").validate({
		submitHandler:function(form){
			$(form).ajaxSubmit({
				url:"./customer!saveImport.html",
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
					$table.bootstrapTable('refresh', {pageNumber: 1});
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
}
//加载添加编辑模态框
var showSaveInput = function(id) {
	$.ajax({
		url: "../customer/customer!input.html",
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
			saveFormValidate();
			//显示模态框
	        showModal($modal);
		},
		error: function() {
			alertWarning();
		}
	});
}

var resetPwdValidate = function() {
	$("#resetPwdForm").validate({
		submitHandler:function(form){
			$(form).ajaxSubmit({
				url: "./customer!saveResetPwd.html",
				type: "post",
				dataType:"json",
				beforeSend:function(){
					showLoading();
				},
				complete:function(){
					removeLoading();
				},
				success:function(data){
					if(data.errcode!=0){
						alertWarning(data.errmsg);
						return;
					}
					$("#resetPwdModal").modal("hide");
					alertSuccess("重置密码成功");
				},
				error:function(){
					alertWarning();
				}
			});
		},
		rules:{
			"customerUser.userPass": {
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

/**
 * 获取导出文件所需的参数
 */
var getCustomerExportParams = function(prefix) {
	var params = new Object();
	for (var key in param) {
		if (key.indexOf(".") > 1) {
			params['customerUserListSearch' + key.substring(key.indexOf("."))] = $.trim(param[key]);
		}
	}
	params["orderField"] = param["orderField"];
	params["orderDirection"] = param["orderDirection"];
	return params;
}


