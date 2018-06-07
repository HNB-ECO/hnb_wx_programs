/**
 * Created by Administrator on 2018/5/29.
 */
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

//下拉取值
$.ajax({
// get请求地址
    url: "/admin/platform/getPlatformSelect",
    //data:{ platformId: "1"}, //要发送的数据（参数）格式为{'val1':"1","val2":"2"},
    dataType: "json",
    success: function (data) {
        console.log(data)
        var optArr = [];
        for (var i = 0; i < data.data.length; i++) {
            $('#wc').append("<option value=" + data.data[i].id + ">" + data.data[i].platformName + "</option>");
        }
        // 缺一不可
        $('#choose').selectpicker('refresh');
        $('#choose').selectpicker('render');
    }
});

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

    //var uploader = Qiniu.uploader({
    //    runtimes: 'html5,flash,html4',
    //    browse_button: 'pickfiles',
    //    container: 'container',
    //    drop_element: 'container',
    //    max_file_size: '100mb',
    //    flash_swf_url: 'js/plupload/Moxie.swf',
    //    dragdrop: true,
    //    chunk_size: '4mb',
    //    uptoken:'vWxd-w1ipbuT3vMkHA8mRblGnFpJ9AlWYmCyTPRx:9wIXxxWHVWq2PZ_U0Tm2qm4TV0E=:eyJzY29wZSI6ImhuYmJsb2NrIiwiZGVhZGxpbmUiOjMzNTQ1MTQ0MjZ9',
    //    // uptoken_url: $('#uptoken_url').val(),  //当然建议这种通过url的方式获取token
    //    domain: 'http://p97k4szaj.bkt.clouddn.com',
    //    auto_start: false,
    //    init: {
    //        'FilesAdded': function(up, files) {
    //            $('table').show();
    //            $('#success').hide();
    //            plupload.each(files, function(file) {
    //                var progress = new FileProgress(file, 'fsUploadProgress');
    //                progress.setStatus("等待...");
    //            });
    //        },
    //        'BeforeUpload': function(up, file) {
    //            var progress = new FileProgress(file, 'fsUploadProgress');
    //            var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
    //            if (up.runtime === 'html5' && chunk_size) {
    //                progress.setChunkProgess(chunk_size);
    //            }
    //        },
    //        'UploadProgress': function(up, file) {
    //            var progress = new FileProgress(file, 'fsUploadProgress');
    //            var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
    //
    //            progress.setProgress(file.percent + "%", file.speed, chunk_size);
    //        },
    //        'UploadComplete': function() {
    //            $('#success').show();
    //        },
    //        'FileUploaded': function(up, file, info) {
    //            var progress = new FileProgress(file, 'fsUploadProgress');
    //            progress.setComplete(up, info);
    //            console.log(info)
    //        },
    //        'Error': function(up, err, errTip) {
    //            $('table').show();
    //            var progress = new FileProgress(err.file, 'fsUploadProgress');
    //            progress.setError();
    //            progress.setStatus(errTip);
    //        }
    //    }
    //});


    $table = $('#table');
    $table.bootstrapTable({
        url: "/admin/banner/pageAll",//加载数据的url
        // uniqueId: "goodNameId",
        pagination:true,//是否分页
        pageSize: 10,  //每页显示的记录数
        queryParams: function (params) {
            //页号
            //param["pageNum"] = params.pageNumber;
            ////////每页条数
            //param["pageSize"] = params.pageSize;
            //////排序方式
            //param["orderBy"] = params.sortOrder;
            //额外的参数
            param["isDelete"] = '0';
            params["platformId"] = '1'
            return param;
        },
        onLoadError: function(){  //加载失败时执行
            alert("加载失败");
        },
        columns: [
            {
                field : "state",
                checkbox : true
            },
            {
                field : "bannerUrl",
                title : "活动图片",
                formatter: function(value,row,index){
                    var url = value
                    return '<img  src="'+url+'" class="img-rounded" style="height: 100px" >';
                }
            },
            {
                field : "bannerName",
                title : "活动名称",
            },
            {
                field : "note",
                title : "备注",
            },
            {
                field : "isDelete",
                title : "状态",
                sortable: true,
                formatter : function (value, row, index) {
                    var str = '';
                    if( value == 0){
                        str = "在售"
                    }else{
                        str = "下架"
                    }
                    return str;
                },
            },
            {
                field : "createTime",
                title : "上架时间",
                sortable: true,
                //formatter : function (value, row, index) {
                //    var str = timestampToTime(value);
                //    return str;
                //},
            },
            {
                field : "updateTime",
                title : "更新时间",
                sortable: true,
                //formatter : function (value, row, index) {
                //    var str = timestampToTime(value);
                //    return str;
                //},
            },
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
        //获取表格已选择项数组
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
                url: "/admin/banner/delete",
                type: "post",
                data: {
                    bannerId: ids
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
});


var openEdit = function(id){
    $.ajax({
        type: "get",
        url: "/admin/banner/getBannerInfo",
        data: {
            bannerId: id
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
            $modal.find("#bannerName").val(data.data.bannerName);
            $modal.find("#platformId").selectpicker('val', data.data.platformId);
            $modal.find("#bannerUrl").val(data.data.bannerUrl);
            $modal.find("#note").val(data.data.note);
            $modal.find("#bannerImg").attr("src",data.data.bannerUrl);
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

var saveFormValidate = function() {
    $("#saveModal form").validate({
        submitHandler: function(form) {
            $.ajax({
                url: "/admin/banner/add",
                type: "post",
                cache: false,
                data: $(form).serialize(),
                //dataType: "json",
                beforeSend: function() {
                    showLoading();
                },
                complete: function() {
                    removeLoading();
                },
                success: function(data) {
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
            "bannerName": {
                required: true,
                maxlength: 20
            },
            "platformId": {
                required: true,
            },
            "bannerUrl": {
                required: true,
                maxlength: 200
            }
        }
    });
}



