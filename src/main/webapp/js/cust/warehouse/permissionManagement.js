//index全局变量
var rowIndex;
// row全局变量
var row;
// 全局table对象
var $table;
function loadData(obj){
	obj.bootstrapTable({
		url:"../warehouse/user-warehouse!data.html",
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
		},
		 {
			field : 'userId',
			visible : false,
			filterControl : "input", // 搜索框
			columnType : "Long"
		},
		{
			field : 'userName',
			title : '管理员名称',
			sortable:true,
			filterControl : "input", // 搜索框
			columnType : "String"
		},
		{
			field : 'customerUserName',
			title : '客户名称',
			filterControl : "input", // 搜索框
			columnType : "String"
		},
		{
			field : 'warehouseName',
			title : '仓库名称',
			filterControl : "input", // 搜索框
			columnType : "String"
		},
		{
			field : 'customerUserUpdateDt',
			title : '修改日期',
			filterControl: "daterangepicker",
			columnType : "String"
		}]
	});
}
$().ready(function() {

	$table = $('#table');
	loadData($table);
	
	//编辑
    $("#updateBtn").on("click", function () {
        //获取表格已选择项数组
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length != 1) {
            swal({
                title: "",
                text: "请选择一条记录！",
                type: "warning"
            });
            return;
        }
 
        //选中row
        row = checkArr[0];
        if(row.userId==1){
       	 swal({
                title: "",
                text: "超级管理员权限不可修改",
                type: "warning"
            });
       	return;
       }
        //获取选中的index
        rowIndex = getCheckIndexArr($table)[0];
        var $modal = $("#editModal");
		$modal.find("#userId").val(row.userId);
		$modal.find("#userName").val(row.userName);
        $.ajax({
        	type:"POST",
        	url:"../warehouse/user-warehouse!details.html",
        	data:{
        		id:row.userId
        	},
        	cache:false,
        	dataType:"json",
        	beforeSend:function(){
				showLoading();
			},
			complete:function(){
				removeLoading();
			},
        	success:function(data){
        		if (data.errcode != 0) {
        			 swal({
        	                title: "",
        	                text: data.errmsg,
        	                type: "warning"
        	            });
        		}
      		    $modal.find("#ckmc").selectpicker('val', data.data.warehouseIdList);
      		    $modal.find("#khmc").selectpicker('val', data.data.customerUserIdList);
        	}
        });
    	addEditFormValidate();
        $modal.modal({
            keyboard : false,
            backdrop : 'static',
            show : true
        });
    });
});

var addEditFormValidate = function() {
	$("#editModal form").validate({
		submitHandler: function(form) {
			$.ajax({
				url: "../warehouse/user-warehouse!saveDialog.html",
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
		}
	});
} 

