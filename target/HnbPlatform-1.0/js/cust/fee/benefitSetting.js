//index全局变量
var rowIndex;
// row全局变量
var row;
// 全局table对象
var $table;
function loadData(obj){
	obj.bootstrapTable({
		url:"../warehouse/customer-fee!data.html",
	    uniqueId: "id",
	    queryParams: function (params) {
        	var param = new Object();
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
		}, {
			field : 'fee.feeId',
			visible : false,
			columnType : "Long"
		}, 
		 {
			field : 'customerUser.userId',
			visible : false,
			filterControl : "input", // 搜索框
			columnType : "Long"
		},
		{
			field : 'customerUser.userName',
			title : '客户名称',
			sortable:true,
			filterControl : "input", // 搜索框
			columnType : "String"
		}, {
			field : 'fee.feeType',
			title : '收费类别',
			sortable:true,
			formatter : function(value, row, index) {
				var str = "";
				if (row["fee.feeType"] == 1) {
					str = "<span class='badge badge-primary'>入库收费</span>";
				} else if (row["fee.feeType"] == 2){
					str = "<span class='badge badge-info'>出库收费</span>";
				}else if (row["fee.feeType"] == 3){
					str = "<span class='badge badge-success'>存储收费</span>";
				}else if (row["fee.feeType"] == 4){
					str = "<span class='badge badge-warning'>包库收费</span>";
				}else if(row["fee.feeType"]==5){
					str="<span class='badge badge-danger'>越库收费</span>"
				}
				return str;
			},
			filterControl : "select",
			filterData : feeTypeData,
			columnType : "Long"
		},
		{
			field : 'fee.feeTypeName',
			visible : false,
			sortable:true,
			filterControl : "input", // 搜索框
			columnType : "String"
		},
		{
			field:'fee.feeName',
			title:'收费名称',
			sortable:true,
			filterControl : "input",
			columnType : "String"
		},
		{
			field:'fee.feeNum',
			title:'应收金额',
			sortable:true,
			filterControl : "input",
			columnType : "Double"
		},
		{
			field:'fee.feeUnit',
			title:'计费单位',
			sortable:true,
			formatter : function(value, row, index) {
				var str = "";
				if (row["fee.feeUnit"] == 1) {
					str="<span class='badge badge-primary'>按重收费</span>";
				}else if(row["fee.feeUnit"]==2){
					str="<span class='badge badge-info'>按板收费</span>";
				}else if(row["fee.feeUnit"]==3){
					str="<span class='badge badge-success'>按件收费</span>";
				}else if(row["fee.feeUnit"]==4){
					str="<span class='badge badge-warning'>按单收费</span>";
				}else if(row["fee.feeUnit"]==5){
					str="<span class='badge badge-success'>按体积收费</span>";
				}else if(row["fee.feeUnit"]==6){
					str="<span class='badge'>按门店收费</span>";
				}
				return str;
			},
			filterControl : "select",
			filterData : feeUnitData,
			columnType : "Long"
		},
		{
			field : 'fee.feeUnitName',
			visible : false,
			sortable:true,
			filterControl : "input", // 搜索框
			columnType : "String"
		},
		{
			field : 'preferential',
			title : '实收价格',
			sortable:true,
			filterControl : "input",
			columnType : "Double"
		}]
	});
}
$().ready(function() {

	$table = $('#table');
	loadData($table);
	$table.on('all.bs.table', function(e, name, args) {
		console.log('Event:', name, ', data:', args);
	}).on('click-row.bs.table', function(e, row, $element) {
		console.log('Event: click-row.bs.table');
	}).on('dbl-click-row.bs.table', function(e, row, $element) {
		console.log('Event: dbl-click-row.bs.table');
	}).on('sort.bs.table', function(e, name, order) {
		console.log('Event: sort.bs.table');
	}).on('check.bs.table', function(e, row) {
		console.log('Event: check.bs.table');
	}).on('uncheck.bs.table', function(e, row) {
		console.log('Event: uncheck.bs.table');
	}).on('check-all.bs.table', function(e) {
		console.log('Event: check-all.bs.table');
	}).on('uncheck-all.bs.table', function(e) {
		console.log('Event: uncheck-all.bs.table');
	}).on('load-error.bs.table', function(e, status) {
		console.log('Event: load-error.bs.table');
	}).on('column-switch.bs.table', function(e, field, checked) {
		console.log('Event: column-switch.bs.table');
	}).on('page-change.bs.table', function(e, size, number) {
		console.log('Event: page-change.bs.table');
	}).on('search.bs.table', function(e, text) {
		console.log('Event: search.bs.table');
	});

	// 添加
	$("#addBtn").on("click", function() {
		var $modal = $("#addModal");
		// 填充模态框数据
		$modal.find("#balanceAppendNumber").val("");
		$modal.find("#preferential").val("");
		initFeeSuggest($modal);
		addFormValidate();
		// 显示模态框
		$modal.modal({
			keyboard : false,
			backdrop : 'static',
			show : true
		});
	});
	//添加保存按钮点击，提交表单
	$("#addSaveBtn").on("click", function() {
		$("#addModal form").submit();
	})
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
	
		var userId=row["customerUser.userId"];
		var customerFeeId = row["fee.feeId"];
		$modal.find("#khmc").selectpicker('val', userId);
		$modal.find("#preferential").val(row.preferential);
		$modal.find("#feeNum").val(row["fee.feeNum"]);
		$modal.find("#feeName").val(row["fee.feeName"]);
		$modal.find("#feeTypeName").val(row["fee.feeTypeName"]);
		$modal.find("#feeType").val(row["fee.feeType"]);
		$modal.find("#feeUnitName").val(row["fee.feeUnitName"]);
		$modal.find("#feeUnit").val(row["fee.feeUnit"]);
		$modal.find("#userName").val(row["customerUser.userName"]);
		$modal.find("#userId").val(row["customerUser.userId"]);
		$modal.find("#id").val(row.id);
		$modal.find("#feeId").val(customerFeeId);
		
		initFeeSuggest($modal);
		addEditFormValidate();
		$modal.modal({
			keyboard : false,
			backdrop : 'static',
			show : true
		});
	});

	//导入
	$("#importBtn").bind("click",function(){
		$.ajax({
			url:"../warehouse/customer-fee!showImport.html",
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
				importFormValidate();
				$modal.find('.modal-body :file').prettyFile();
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
				url:"../warehouse/customer-fee!deleteCustomerFee.html",
			    type : "POST",
			    beforeSend:function(request){
	                request.setRequestHeader("ids",ids);
	                showLoading();
	            }, 
				complete: function() {
					removeLoading();
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
	function Import(){
		window.importForm.action="${ctx}/warehouse/customer-fee!importExcel.html?FileName="+document.getElementById("file").value;
		window.importForm.submit();
	}
});
//添加表单校验
var addFormValidate = function() {
	$("#addModal form").validate({
		submitHandler: function(form) {
			$.ajax({ 
				url: "../warehouse/customer-fee!save.html",
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
			"mapCustomerFee.customerUser.userId":{
				required:true
			},
			"mapCustomerFee.fee.feeId":{
				required:true
			},
			"mapCustomerFee.preferential":{
				required:true,
				number:true,
				min: 0
			}
		},
		messages: {
			"mapCustomerFee.customerUser.userId":{
				required:"<i class='fa fa-times-circle'></i> 请选择客户",
			},
			"mapCustomerFee.fee.feeId":{
				required:"<i class='fa fa-times-circle'></i> 请输入收费名称",
			},
			"mapCustomerFee.preferential":{
				required:"<i class='fa fa-times-circle'></i> 请输入优惠金额",
				number: "<i class='fa fa-times-circle'></i> 必须输入数字",
				min: "<i class='fa fa-times-circle'></i> 请输入一个最小为{0}的值"
			}
		},
		onkeyup:false
	});
} 
var addEditFormValidate = function() {
	$("#editModal form").validate({
		submitHandler: function(form) {
			$.ajax({
				url: "../warehouse/customer-fee!save.html",
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
			"userName":{
				required:true
			},
			"mapCustomerFee.fee.feeId":{
				required:true
			},
			"mapCustomerFee.preferential":{
				required:true,
				number:true,
				min: 0
			}
		},
		messages: {
			"userName":{
				required:"<i class='fa fa-times-circle'></i> 请选择客户",
			},
			"mapCustomerFee.fee.feeId":{
				required:"<i class='fa fa-times-circle'></i> 请输入收费名称",
			},
			"mapCustomerFee.preferential":{
				required:"<i class='fa fa-times-circle'></i> 请输入优惠金额",
				number: "<i class='fa fa-times-circle'></i> 必须输入数字",
				min: "<i class='fa fa-times-circle'></i> 请输入一个最小为{0}的值"
			}
		},
		onkeyup:false
	});
} 

var importFormValidate=function(){
	$("#importModal form").validate({
		submitHandler:function(form){
			$(form).ajaxSubmit({
				url:"../warehouse/customer-fee!saveImport.html",
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

//初始化移前托盘搜索插件
var initFeeSuggest = function($obj) {
	var $input =$obj.find("#feeName");
	$input.bsSuggest({
		getDataMethod: "url",
		url: "../warehouse/customer-fee!feeSuggest.html?&inputValue=",
        allowNoKeyword: false, //是否允许无关键字时请求数据
        idField: "feeId",
        keyField: "feeId",
        showBtn: false,
        effectiveFields: ["feeId", "feeTypeName", "feeName"],
        effectiveFieldsAlias: {
        	feeId: "收费ID",
        	feeTypeName: "收费类型",
        	feeName: "收费名称"
        },
        //调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
        fnAdjustAjaxParam: function(keyword, opts) {
            return {timeout: 30000}
        },
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
        	changeSearchObj(json);
            return {value: json};
        }
	}).on('onSetSelectValue', function (e, keyword) {
    	var obj = searchObj[keyword.id];
        //填充模态框
    	$obj.find("#feeId").val(obj.feeId);
    	$obj.find("#feeName").val(obj.feeName);
    	$obj.find("#feeNum").val(obj.feeNum);
    	$obj.find("#feeType").val(obj.feeType);
    	$obj.find("#feeTypeName").val(obj.feeTypeName);
    	$obj.find("#feeUnit").val(obj.feeUnit);
    	$obj.find("#feeUnitName").val(obj.feeUnitName);
	});
	//调整搜索框的样式
	$input.attr("style", "");
	$input.parent().attr("style", "");
}
var changeSearchObj = function(arr) {
	searchObj = {};
	if (arr.length == 0) {
		return;
	}
	for (var index in arr) {
		var obj = arr[index];
		searchObj[obj.feeId] = obj;
	}
}