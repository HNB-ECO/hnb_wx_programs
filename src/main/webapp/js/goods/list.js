/**
 * Created by Administrator on 2018/5/23.
 */
/**
 * Created by Administrator on 2018/5/22.
 */

//row全局变量
var row;
//全局table对象
var $table;
//全局类型id
var goodTypeId = "";
//是否可以编辑添加
var canSave = false;
var param = new Object();
var platFormId = ""

//时间戳转时间
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}

//显示大图
function showimage(source) {
    console.log("image")
    $("#ShowImage_Form").find("#img_show").html("<image src='"+source+"' class='carousel-inner img-responsive img-rounded' />");
    $("#ShowImage_Form").modal();
}


$.ajax({
// get请求地址
    url: "/admin/platform/getPlatformList",
    dataType: "json",
    success: function (data) {
        console.log(data)
        var optArr = [];
        for (var i = 0; i < data.data.length; i++) {
            $('#selectID').append("<option value=" + data.data[i].id + ">" + data.data[i].platformName + "</option>");
        }
        // 缺一不可
        $('#selectID').selectpicker('refresh');
        $('#selectID').selectpicker('render');
        fgetGoodType()
    }
});


////选择平台
function getPlatForm(){
$.ajax({
// get请求地址
    url: "/admin/platform/getPlatformList",
    dataType: "json",
    success: function (data) {
        console.log(data)
        var optArr = [];
        for (var i = 0; i < data.data.length; i++) {
            $('#platformId').append("<option value=" + data.data[i].id + ">" + data.data[i].platformName + "</option>");
            $('#selectID').append("<option value=" + data.data[i].id + ">" + data.data[i].platformName + "</option>");
        }
        // 缺一不可
        $('#platformId').selectpicker('refresh');
        $('#platformId').selectpicker('render');
        $('#selectID').selectpicker('refresh');
        $('#selectID').selectpicker('render');
        getGoodType()
        fgetGoodType()
    }
});
}


////选择商品类型
function getGoodType(){
$.ajax({
// get请求地址
    url: "/admin/goodsType/getGoodsTypeSelect",
    data:{
        platformId: $("#platformId").val()
    },
    dataType: "json",
    success: function (data) {
        console.log(data)
        var optArr = [];
        for (var i = 0; i < data.data.length; i++) {
            $('#goodTypeId').append("<option value=" + data.data[i].id + ">" + data.data[i].goodTypeName + "</option>");
        }
        // 缺一不可
        $('#goodTypeId').selectpicker('refresh');
        $('#goodTypeId').selectpicker('render');
    }
});
}

function fgetGoodType(){
    $.ajax({
// get请求地址
        url: "/admin/goodsType/getGoodsTypeSelect",
        data:{
            platformId: $("#selectID").val()
        },
        dataType: "json",
        success: function (data) {
            console.log(data)
            var optArr = [];
            for (var i = 0; i < data.data.length; i++) {
                $('#selectGoodType').append("<option value=" + data.data[i].id + ">" + data.data[i].goodTypeName + "</option>");
            }
            // 缺一不可
            $('#selectGoodType').selectpicker('refresh');
            $('#selectGoodType').selectpicker('render');
        }
    });
}

$("#btnSearch").on('click',function(){
    $table.bootstrapTable('refresh', {pageNumber: 1});
})

$().ready(function(){

    window.operateEvents = {
        'click .RoleOfedit': function (e, value, row, index) {
            console.log("send")
            window.location.href="/admin/goodsDetail/intoGoodsDetailManage?id=" + value;

        }
    };



    $table = $('#table');
    console.log("ready")
    $table.bootstrapTable({
        url: "/admin/goods/getGoodsList",//加载数据的url
        // uniqueId: "goodNameId",
        pagination:true,//是否分页
        pageSize: 10,  //每页显示的记录数
        queryParams: function (params) {
            //页号
            param["pageNum"] = params.pageNumber;
            //////每页条数
            param["pageSize"] = params.pageSize;
            //////排序方式
            //param["orderBy"] = params.sortOrder;
            //额外的参数
            param["goodTypeId"] = $("#selectID").val()
            //param["goodName"] = "刘翔T恤";
            param["platformId"]= $("#selectGoodType").val()
            return param;
        },
        //onLoadSuccess: function(data){  //加载成功时执行
        //    alert("加载成功"+data);
        //},
        onLoadError: function(){  //加载失败时执行
            alert("加载失败");
        },
        columns: [
            {
                field : "state",
                checkbox : true
            },
            {
                field : "platformId",
                title : "platformId",
                visible : false,
                formatter: function(value,row,index){
                    platFormId = value
                }
            },
            {
                field : "name",
                title : "商品名称",
            },
            {
                field : "shortName",
                title : "商品类别",

            },{

                field:"isDelete",
                title:"状态",
                formatter: function(value,row,index){
                    var str = ""
                    if(value == 1){
                        str = "下架"
                    }else{
                        str = "在售"
                    }
                    return  str;
                }
            },
            {
                field : "imageUrl",
                title : "商品图片",
                formatter: function(value,row,index){
                    var url = value
                    return '<img  src="'+url+'" class="img-rounded" style="height: 300px" >';
                }
            },
            {
                field : "infoUrl",
                title : "商品详情",
                formatter: function(value,row,index){
                    var url = value
                    return '<img  src="'+url+'" class="img-rounded" style="height: 300px" >';
                }
            },
            {
                field : "price",
                title : "商品价格",
            },
            {
                field : "coinPrice",
                title : "商品积分价",

            },
            {
                field : "unit",
                title : "商品单位",

            },
            {
                field : " sales	",
                title : "已售",

            },
            {
                field : "createTime",
                title : "创建时间",
                //formatter : function (value, row, index) {
                //    var str = timestampToTime(value);
                //    return str;
                //},
            },
            {
                field : "updateTime",
                title : "更新状态时间",
                //formatter : function (value, row, index) {
                //    var str = timestampToTime(value);
                //    return str;
                //},
            },
            {
                field: 'id',
                title: '操作',
                width: '100px',
                align:'center',
                events: operateEvents,
                formatter:  function operateFormatter(value, row, index) {
                    return [
                        '<input type="submit" value="查看详情" class="RoleOfedit btn btn-primary  btn-sm"   data-toggle="modal"  style="display:inline-block" >',
                    ].join('');
                }
            }
        ],
        responseHandler: function(res) {
            console.log(res)
            return {
                "total": res.data.total,//总页数
                "rows": res.data.list  //数据
            };
        },

    });

    //保存模态框初始内容
    var saveModalBodyHtml = $("#saveModal .modal-body").html();
    //导入模态框初始内容
    var importModalBodyHtml = $("#importModal .modal-body").html();

    //保存模态框关闭事件
    $('#saveModal').on('hidden.bs.modal', function (e) {
        //初始化模态框
        $(this).find(".modal-body").html(saveModalBodyHtml);
      //  $(this).find(".modal-body select").selectpicker();
        initICheck();
    });

    //导入模态框关闭事件
    $('#importModal').on('hidden.bs.modal', function (e) {
        //初始化模态框
        $(this).find(".modal-body").html(importModalBodyHtml);
    });

    //添加
    $("#addBtn").on("click", function() {
        getPlatForm()
        if (canSave) {
            alertWarning("请先选择商品类别！");
            return;
        }
        var $modal = $("#saveModal");
        $modal.find(".modal-title").text("添加");
        $modal.find("#lx").val(goodTypeId);
        saveFormValidate();
        //显示模态框
        showModal($modal);
    });

    //初始化单选框
    initICheck();

    //添加保存按钮
    $("#saveBtn").on("click", function() {
        $("#saveModal form").submit();
    });

    //编辑
    $("#updateBtn").on("click", function () {
        getPlatForm()
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length != 1) {
            alertUpdateNone();
            return;
        }
        //选中row
        row = checkArr[0];
        openEdit(row.id);
    });

    //删除
    $("#deleteBtn").on("click", function () {
        //获取表格已选择项数组
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length == 0) {
            alertDeleteNone();
            return;
        }
        var ids = getIds(checkArr, "id");
        //确认或取消选择框
        alertConfirm(function(){
            $.ajax({
                url: "/admin/goods/deleteGoods",
                type: "post",
                data: {
                    goodsId: ids
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
                    $table.bootstrapTable('refresh', {pageNumber: 1});
                    alertSuccess("删除成功");
                },
                error: function() {
                    alertWarning();
                }
            })
        }, "您确定要删除已选择的记录吗？");
    });

    //导出
    $("#reprotGood").on("click",function(){
        alertConfirm(function(){
            var params = getGoodExportParams("search");
            location.href = "../report/report!goodReport.html?" + $.param(params);
            alertSuccess("导出成功");
        }, "您确定要导出这些记录吗？");
    });

    //导入按钮点击事件
    $("#importBtn").on("click", function() {
        if (!canSave) {
            alertWarning("请先选择商品类别！");
            return;
        }
        var $modal = $("#importModal");
        $modal.find('.modal-body :file').prettyFile();
        importFormValidate();
        //显示模态框
        showModal($modal);
    });

    $("#importSaveBtn").on("click", function() {
        $("#importModal form").submit();
    })

    //树形视图
    $("#jsTree").jstree({
        'core' : {
            'data' : {
                "url" : "../manage/good!getJsTreeFormatData.html",
                'dataType': 'json'
            }
        },
        'plugins': ['types', 'dnd'],
        "types": {
            "default": {
                "icon": "fa fa-folder"
            }
        }
    }).on('changed.jstree',function(e,data){
        //当前选中节点的id
        goodTypeId = data.instance.get_node(data.selected[0]).id;
        if (goodTypeId == "j1_1" || goodTypeId == 0) {
            goodTypeId = "";
        }
        $table.bootstrapTable('refresh', {pageNumber: 1});
        if (data.node.children.length) {
            canSave = false;
        } else {
            canSave = true;
        }
    });
});

/**
 * 获取导出文件所需的参数
 */
var getGoodExportParams = function(prefix) {
    var params = new Object();
    for (var key in param) {
        if (key.indexOf(".") > 1) {
            params['goodSearch' + key.substring(key.indexOf("."))] = $.trim(param[key]);
        }
    }
    params["orderField"] = param["orderField"];
    params["orderDirection"] = param["orderDirection"];
    return params;
}

var openEdit = function(id){
    $.ajax({
        type: "GET",
        url: "/admin/goods/getGoodsInfo",
        data: {
            goodsId: id
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
            var $modal = $("#saveModal");
            $modal.find(".modal-title").text("编辑");
            $modal.find("#goodTypeId").selectpicker('val', data.data.goodTypeId);
            $modal.find("#accPay").selectpicker('val', data.data.accPay);
            $modal.find("#platformId").selectpicker('val', data.data.platformId);
            $modal.find("#name").val(data.data.name);
            $modal.find("#shortName").val(data.data.shortName);
            $modal.find("#picUrl").val(data.data.infoUrl);
            $modal.find("#bannerUrl").val(data.data.imageUrl);
            $modal.find("#goodImg").attr("src",data.data.imageUrl);
            $modal.find("#infoImg").attr("src",data.data.infoUrl);
            UpdateFormValidate();
            //显示模态框
            showModal($modal);
        },
        error: function() {
            alertWarning();
        }
    })
}

var initICheck = function() {
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    $(".input-check:even").iCheck('check');

    $('.input-check:lt(2)').on("ifChecked", function (event) {
        var $this = $(this);
        var $nextDiv = $this.parent().parent().parent().parent().parent().next("div");
        if ($this.val() == 1) {
            $nextDiv.css("display", "block");
        } else {
            $nextDiv.css("display", "none");
            $nextDiv.find("input").val("");
        }
    });

}

var saveFormValidate = function() {

    $("#saveModal form").validate({
        submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form
            $.ajax({
                url: "/admin/goods/createGoods",
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
                    console.log(data)
                    $("#saveModal").modal("hide");
                    //刷新表格
                    $table.bootstrapTable('refresh', {pageNumber: 1});
                    alertSuccess("保存成功");
                },
                error: function() {
                    alertWarning();
                }
            });
        },
    });
}



function UpdateFormValidate(){
    $("#saveModal form").validate({
        submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form
            $.ajax({
                url: "/admin/goods/updateGoods",
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
                    console.log(data)
                    $("#saveModal").modal("hide");
                    //刷新表格
                    $table.bootstrapTable('refresh', {pageNumber: 1});
                    alertSuccess("保存成功");
                },
                error: function() {
                    alertWarning();
                }
            });
        },
        rules: {
            "name": {
                required: true,
                maxlength: 60,
            },
            "shortName": {
                required: true,
                maxlength: 60
            },
            "platformId": {
                required: true,
            },
            "goodTypeId": {
                required: true,
            },
            "accPay": {
                required: true,
            },
            " imageUrl": {
                required: true,
            },
            " infoUrl": {
                required: true,
            },
        }
    });
}

var importFormValidate = function() {
    var validate = $("#importModal form").validate({
        ignore: ".input-large",
        submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form
            $(form).ajaxSubmit({
                url: "../manage/good!saveImport.html",
                type: "post",
                data: {
                    "inputInfo.goodTypeId": goodTypeId
                },
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
                    $("#importModal").modal("hide");
                    //刷新表格
                    $table.bootstrapTable('refresh', {pageNumber: 1});
                    alertSuccess("导入成功");
                },
                error: function(data) {
                    alertWarning();
                }
            });
        },
        rules: {
            file: "required"
        }
    });
    validatePrettyFile($("#importModal form .input-append"), validate);
}







