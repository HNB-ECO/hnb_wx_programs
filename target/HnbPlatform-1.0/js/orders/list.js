/**
 * Created by Administrator on 2018/5/22.
 */


//row全局变量
var row;
//全局table对象
var $table;
//全局类型id
var goodTypeId = "";
var workOrderId = ""


//是否可以编辑添加
var canSave = false;
var param = new Object();

//下拉取值
$.ajax({
// get请求地址
    url: "/admin/order/getExpressCompanySelect",
    //data:{ platformId: "1"}, //要发送的数据（参数）格式为{'val1':"1","val2":"2"},
    dataType: "json",
    success: function (data) {
        console.log(data)
        var optArr = [];
        for (var i = 0; i < data.data.length; i++) {
            $('#wc').append("<option value=" + data.data[i].code + ">" + data.data[i].name + "</option>");
        }
        // 缺一不可
        $('#choose').selectpicker('refresh');
        $('#choose').selectpicker('render');
    }
});




//根据状态值 判断查询订单状态
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var orderStatus = GetRequest().status

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

$().ready(function(){

//检索
$("#btnSearch").on('click',function(){
    console.log("1")
    if(orderStatus == 1){
        toBePay()
        $table.bootstrapTable('refresh', {pageNumber: 1});
    }
    else if(orderStatus == 2){
        toBeSend()
        $table.bootstrapTable('refresh', {pageNumber: 1});
    }
    else if(orderStatus == 3){
        toBegot()
        $table.bootstrapTable('refresh', {pageNumber: 1});
    }
    else if(orderStatus == 4){
        toBeComment()
        $table.bootstrapTable('refresh', {pageNumber: 1});
    }
    else{
        Others()
        $table.bootstrapTable('refresh', {pageNumber: 1});
    }


})

//初始表单值
if(orderStatus == 1)
    toBePay()
else if(orderStatus == 2)
    toBeSend()
else if(orderStatus == 3)
    toBegot()
else if(orderStatus == 4)
    toBeComment()
else
    Others()

function Others(){

    $table = $('#table');
    $table.bootstrapTable({
        url: "/admin/order/pageAll",//加载数据的url
        // uniqueId: "goodNameId",
        pagination:true,//是否分页
        pageSize: 10,//每页显示的记录数
        showColumns: false,                  //是否显示所有的列（选择显示的列）
        showRefresh: false,
        queryParams: function (params) {
            //页号
            param["pageNum"] = params.pageNumber;
            //////每页条数
            param["pageSize"] = params.pageSize;
            //////排序方式
            //param["orderBy"] = params.sortOrder;
            //额外的参数
            param["orderStatus"] = orderStatus;
            param["workOrderNo"] = $("#inputWorkNo").val();
            return param;
        },
        //onLoadSuccess: function(data){  //加载成功时执行
        //    alert("加载成功"+data);
        //},
        onLoadError: function(){  //加载失败时执行
            alert("加载失败");
        },
        columns: [
            //{
            //    field : "state",
            //    checkbox : true
            //},
            {
                field : "id",
                title : "id",
                visible : false,
                switchable : false,
                columnType : "Long"
            },
            {
                field : "workOrderNo",
                title : "订单号",
            },
            {
                field : "goods.name",
                title : "商品名称",
            },
            {
                field : "order.totalPrice",
                title : "订单价格",
            },
            {
                field : "order.totalCoin",
                title : "订单积分价",
            },
            {
                field : "endTime",
                title : "订单时间",
                formatter : function (value, row, index) {
                    var str = timestampToTime(value);
                    return str;
                },
            },{
                field : "order.leaveMessage",
                title : "买家留言",
            },
            {
                field : "order.contactor",
                title : "收货人",
            },
            {
                field : "order.address",
                title : "收货地址",
            },
            {
                field : "order.phone",
                title : "联系号码",
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

}


//待评价订单
function toBeComment(){

    $table = $('#table');
    $table.bootstrapTable({
        url: "/admin/order/pageAll",//加载数据的url
        // uniqueId: "goodNameId",
        pagination:true,//是否分页
        pageSize: 10,  //每页显示的记录数
        search:false,
        showColumns: false,                  //是否显示所有的列（选择显示的列）
        showRefresh: false,
        queryParams: function (params) {
            //页号
            param["pageNum"] = params.pageNumber;
            //////每页条数
            param["pageSize"] = params.pageSize;
            //////排序方式
            //param["orderBy"] = params.sortOrder;
            //额外的参数
            param["orderStatus"] = orderStatus;
            param["workOrderNo"] =  $("#inputWorkNo").val();
            return param;
        },
        //onLoadSuccess: function(data){  //加载成功时执行
        //    alert("加载成功"+data);
        //},
        onLoadError: function(){  //加载失败时执行
            alert("加载失败");
        },
        columns: [
            //{
            //    field : "state",
            //    checkbox : true
            //},
            {
                field : "id",
                title : "id",
                visible : false,
                switchable : false,
                columnType : "Long"
            },
            {
                field : "workOrderNo",
                title : "订单号",
            },
            {
                field : "goods.name",
                title : "商品名称",
            },
            {
                field : "order.totalPrice",
                title : "订单价格",
            },
            {
                field : "order.totalCoin",
                title : "订单积分价",
            },
            {
                field : "receiptTime",
                title : "订单时间",
                formatter : function (value, row, index) {
                    var str = timestampToTime(value);
                    return str;
                },
            },
            {
                field : "order.leaveMessage",
                title : "买家留言",
            },
            {
                field : "order.contactor",
                title : "收货人",
            },
            {
                field : "order.address",
                title : "收货地址",
                sortable: true,
            },
            {
                field : "order.phone",
                title : "联系号码",
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


}

//待收货订单
function toBegot(){

    $table = $('#table');
    $table.bootstrapTable({
        url: "/admin/order/pageAll",//加载数据的url
        // uniqueId: "goodNameId",
        pagination:true,//是否分页
        pageSize: 10,  //每页显示的记录数
        search:false,
        showColumns: false,                  //是否显示所有的列（选择显示的列）
        showRefresh: false,
        queryParams: function (params) {
            //页号
            param["pageNum"] = params.pageNumber;
            //////每页条数
            param["pageSize"] = params.pageSize;
            //////排序方式
            //param["orderBy"] = params.sortOrder;
            //额外的参数
            param["orderStatus"] = orderStatus;
            param["workOrderNo"] =  $("#inputWorkNo").val();
            return param;
        },
        //onLoadSuccess: function(data){  //加载成功时执行
        //    alert("加载成功"+data);
        //},
        onLoadError: function(){  //加载失败时执行
            alert("加载失败");
        },
        columns: [
            //{
            //    field : "state",
            //    checkbox : true
            //},
            {
                field : "id",
                title : "id",
                visible : false,
                switchable : false,
                columnType : "Long"
            },
            {
                field : "workOrderNo",
                title : "订单号",
            },
            {
                field : "goods.name",
                title : "商品名称",
            },
            {
                field : "order.totalPrice",
                title : "订单价格",
            },
            {
                field : "order.totalCoin",
                title : "订单积分价",
            },
            {
                field : "shipTime",
                title : "订单时间",
                formatter : function (value, row, index) {
                    var str = timestampToTime(value);
                    return str;
                },
            },
            {
                field : "order.leaveMessage",
                title : "买家留言",
            },
            {
                field : "order.contactor",
                title : "收货人",
            },
            {
                field : "order.address",
                title : "收货地址",
            },
            {
                field : "order.phone",
                title : "联系号码",
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

}

//待支付订单
function toBePay(){

    $table = $('#table');
    $table.bootstrapTable({
        url: "/admin/order/pageAll",//加载数据的url
        // uniqueId: "goodNameId",
        pagination:true,//是否分页
        pageSize: 10,  //每页显示的记录数
        search:false,
        showColumns: false,                  //是否显示所有的列（选择显示的列）
        showRefresh: false,
        queryParams: function (params) {
            //页号
            param["pageNum"] = params.pageNumber;
            //////每页条数
            param["pageSize"] = params.pageSize;
            //////排序方式
            //param["orderBy"] = params.sortOrder;
            //额外的参数
            param["orderStatus"] = orderStatus;
            param["workOrderNo"] =  $("#inputWorkNo").val();
            return param;
        },
        //onLoadSuccess: function(data){  //加载成功时执行
        //    alert("加载成功"+data);
        //},
        onLoadError: function(){  //加载失败时执行
            alert("加载失败");
        },
        columns: [
            //{
            //    field : "state",
            //    checkbox : true
            //},
            {
                field : "id",
                title : "id",
                visible : false,
                switchable : false,
                columnType : "Long"
            },
            {
                field : "workOrderNo",
                title : "订单号",
            },
            {
                field : "goods.name",
                title : "商品名称",
            },
            {
                field : "order.totalPrice",
                title : "订单价格",
            },
            {
                field : "order.totalCoin",
                title : "订单积分价",
            },
            {
                field : "createTime",
                title : "订单时间",
                formatter : function (value, row, index) {
                    var str = timestampToTime(value);
                    return str;
                },
            },
            {
                field : "order.leaveMessage",
                title : "买家留言",
            },
            {
                field : "order.contactor",
                title : "收货人",
            },
            {
                field : "order.address",
                title : "收货地址",
            },
            {
                field : "order.phone",
                title : "联系号码",
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
}


//待发货订单
function toBeSend(){
    //是否发货
    window.operateEvents = {
        'click .RoleOfedit': function (e, value, row, index) {
            $("#inputOrder").modal('show');
            console.log("send")
            workOrderId = value
            ////alertConfirm(function(){
            //    $.ajax({
            //        url: "/admin/order/shipOrderChangeStatus",
            //        type: "post",
            //        data: {
            //            workOrderId:value
            //        },
            //        cache: false,
            //        beforeSend: function() {
            //            showLoading();
            //        },
            //        complete: function() {
            //            removeLoading();
            //        },
            //        success: function(data) {
            //
            //            $table.bootstrapTable('refresh', {pageNumber: 1});
            //            alertSuccess("发货成功");
            //        },
            //        error: function() {
            //            alertWarning();
            //        }
            //    })
            //}, "您确定改商品已发货？");
        }
    };

    $table = $('#table');
    $table.bootstrapTable({
        url: "/admin/order/pageAll",//加载数据的url
        // uniqueId: "goodNameId",
        pagination:true,//是否分页
        pageSize: 10,  //每页显示的记录数
        search:false,
        showColumns: false,                  //是否显示所有的列（选择显示的列）
        showRefresh: false,
        queryParams: function (params) {
            //页号
            param["pageNum"] = params.pageNumber;
            //////每页条数
            param["pageSize"] = params.pageSize;
            //////排序方式
            //param["orderBy"] = params.sortOrder;
            //额外的参数
            param["orderStatus"] = orderStatus;
            param["workOrderNo"] =  $("#inputWorkNo").val();

            return param;
        },
        //onLoadSuccess: function(data){  //加载成功时执行
        //    alert("加载成功"+data);
        //},
        onLoadError: function(){  //加载失败时执行
            alert("加载失败");
        },
        columns: [
            //{
            //    field : "state",
            //    checkbox : true
            //},
            //{
            //    field : "id",
            //    title : "id",
            //    visible : false,
            //    switchable : false,
            //    columnType : "Long"
            //},
            {
                field : "workOrderNo",
                title : "订单号",
            },
            {
                field : "goods.name",
                title : "商品名称",
            },
            {
                field : "order.totalPrice",
                title : "订单价格",
            },
            {
                field : "order.totalCoin",
                title : "订单积分价",
            },
            {
                field : "payTime",
                title : "订单时间",
                formatter : function (value, row, index) {
                    var str = timestampToTime(value);
                    return str;
                },
            },
            {
                field : "order.leaveMessage",
                title : "买家留言",
            },
            {
                field : "order.contactor",
                title : "收货人",
            },
            {
                field : "order.address",
                title : "收货地址",
            },
            {
                field : "order.phone",
                title : "联系号码",
            }, {
                field: 'id',
                title: '操作',
                width: '100px',
                align:'center',
                events: operateEvents,
                formatter:  function operateFormatter(value, row, index) {
                    return [
                        '<input type="submit" value="已发货" class="RoleOfedit btn btn-primary  btn-sm"   data-toggle="modal"  style="display:inline-block" >',
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

}


    //保存模态框初始内容
    var saveModalBodyHtml = $("#saveModal .modal-body").html();
    //导入模态框初始内容
    var importModalBodyHtml = $("#importModal .modal-body").html();

    //保存模态框关闭事件
    $('#saveModal').on('hidden.bs.modal', function (e) {
        //初始化模态框
        $(this).find(".modal-body").html(saveModalBodyHtml);
        $(this).find(".modal-body select").selectpicker();
        initICheck();
    });

    //导入模态框关闭事件
    $('#importModal').on('hidden.bs.modal', function (e) {
        //初始化模态框
        $(this).find(".modal-body").html(importModalBodyHtml);
    });

    //添加
    $("#addBtn").on("click", function() {
        if (!canSave) {
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
        //获取表格已选择项数组
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length != 1) {
            alertUpdateNone();
            return;
        }
        //选中row
        row = checkArr[0];
        openEdit(row.goodNameId);
    });

    //删除
    $("#deleteBtn").on("click", function () {
        //获取表格已选择项数组
        var checkArr = $table.bootstrapTable('getSelections');
        if (checkArr.length == 0) {
            alertDeleteNone();
            return;
        }
        var ids = getIds(checkArr, "goodNameId");
        //确认或取消选择框
        alertConfirm(function(){
            $.ajax({
                url: "../manage/good!goodsNameDelete.html",
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
                        alertWarning();
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
        type: "post",
        url: "../manage/good!detail.html",
        data: {
            id: id
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
            var $modal = $("#saveModal");
            $modal.find(".modal-title").text("编辑");
            $modal.find("#khmc").selectpicker('val', data.data.userIdList);
            $modal.find("#cpbm").val(data.data.goodShortName);
            $modal.find("#cpmc").val(data.data.goodName);
            if (data.data.goodMergeContainerType == 1) {
                $modal.find("#yes").iCheck('check');
            } else {
                $modal.find("#no").iCheck('check');
            }
            if (data.data.transiType == 2) {
                $modal.find("#tran-yes").iCheck('check');
            } else {
                $modal.find("#tran-no").iCheck('check');
            }

            if (data.data.thawType == 1) {
                $modal.find("#thaw-type-yes").iCheck('check');
            } else {
                $modal.find("#thaw-type-no").iCheck('check');
            }

            if (data.data.transiTypeStatus == 1) {
                $modal.find("#transiTypeStatus-yes").iCheck('check');
            } else {
                $modal.find("#transiTypeStatus-no").iCheck('check');
            }
            $modal.find("#wc").selectpicker('val', data.data.warehouseType);
            $modal.find("#ptdh").val(data.data.goodMergeContainerCode);
            $modal.find("#gg").val(data.data.goodSpecification);
            $modal.find("#dz").val(data.data.goodWeight);
            $modal.find("#dw").val(data.data.goodUnit);
            $modal.find("#tpzdsl").val(data.data.containerInfoNum);
            $modal.find("#bh").val(data.data.goodNameId);
            $modal.find("#lx").val(data.data.goodTypeId);
            $modal.find("#bzxs").val(data.data.packageStyle);
            $modal.find("#bzsl").val(data.data.packageNum);
            $modal.find("#aqkc").val(data.data.safeStock);
            $modal.find("#wxkc").val(data.data.dangerStock);

            saveFormValidate();
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

$("#sendOrder").on("click", function() {
    console.log("1")
   if($("#wc").val() == "" || $("#expressNo").val() == ""){
       alertWarning("请完善快递信息！");
   }else{
       $.ajax({
           url: "/admin/order/shipOrderChangeStatus",
           type: "post",
           cache: false,
           data: {
               "workOrderId" :workOrderId,
               "express" :$("#wc").val(),
               "expressNo" :$("#expressNo").val(),
           },
           dataType: "json",
           beforeSend: function() {
               showLoading();
           },
           complete: function() {
               removeLoading();
           },
           success: function(data) {
               $("#inputOrder").modal("hide");
               //刷新表格
               $table.bootstrapTable('refresh', {pageNumber: 1});
               alertSuccess("发货成功");
           },
           error: function() {
               alertWarning();
           }
       });
   }
});





var saveFormValidate = function() {
    $("#saveModal form").validate({
        submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form
            $.ajax({
                url: "../manage/good!goodsNameSave.html",
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
                error: function() {
                    alertWarning();
                }
            });
        },
        rules: {
            "goodsName.goodShortName": {
                required: true,
                maxlength: 20,
                remote: {
                    url: "../manage/good!checkShortName.html",
                    data: {
                        "goodsName.goodShortName": function() {
                            return $("#cpbm").val();
                        },
                        "goodsName.goodNameId": $("#bh").val(),
                        "customer.userId": $("#khmc").val()
                    }
                }
            },
            "goodsName.goodName": {
                required: true,
                maxlength: 60
            },
            "goodsName.goodMergeContainerCode": {
                required: true,
                maxlength: 200
            },
            "goodsName.goodSpecification": {
                required: true,
                maxlength: 20
            },
            "goodsName.goodWeight": {
                required: true,
                number: true
            },
            "goodsName.goodUnit": {
                required: true,
                maxlength: 20
            },
            "goodsName.packageStyle": {
                required: true,
                maxlength: 50
            },
            "goodsName.packageNum": {
                required: true,
                digits: true
            },
            "goodsName.containerInfoNum": {
                required: true,
                digits: true
            },
            "goodsName.safeStock": {
                required: true,
                digits: true
            },
            "goodsName.dangerStock": {
                required: true,
                digits: true
            }
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