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

////下拉取值
//$.ajax({
//// get请求地址
//    url: "/admin/goodsType/getGoodsTypeSelect",
//    data:{ platformId: "1"}, //要发送的数据（参数）格式为{'val1':"1","val2":"2"},
//    dataType: "json",
//    success: function (data) {
//        console.log(data)
//        var optArr = [];
//        for (var i = 0; i < data.data.length; i++) {
//            $('#choose').append("<option value=" + data.data[i].id + ">" + data.data[i].goodTypeName + "</option>");
//        }
//        // 缺一不可
//        $('#choose').selectpicker('refresh');
//        $('#choose').selectpicker('render');
//    }
//});


$().ready(function(){
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
            param["goodTypeId"] = "1"
            //param["goodName"] = "刘翔T恤";
            param["platformId"]="1"
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
                field : "id",
                title : "id",
                visible : false,
                switchable : false,
                columnType : "Long"
            },
            {
                field : "name",
                title : "商品名称",
                filterControl : "input",
                columnType : "String"
            },
            {
                field : "shortName",
                title : "商品类别",
                filterControl : "input",
                columnType : "String",
            },
            {
                field : "infoUrl",
                title : "商品图片",
                filterControl : "input",
                columnType : "String",
                formatter: function(value,row,index){
                    var url = value
                    return '<img  src="'+url+'" class="img-rounded" style="height: 500px" >';
                }
            },

            {
                field : "price",
                title : "商品价格",
                sortable: true,
                filterControl : "input",
                columnType : "String"
            },
            {
                field : "coinPrice",
                title : "商品积分价",
                sortable: true,
                filterControl : "input",
                columnType : "String"
            },
            {
                field : "unit",
                title : "商品单位",
                sortable: true,
                filterControl : "input",
                columnType : "String"
            },
            {
                field : " sales	",
                title : "已售",
                sortable: true,
                filterControl : "input",
                columnType : "String"
            },
            {
                field : "createTime",
                title : "创建时间",
                sortable: true,
                filterControl : "input",
                columnType : "String",
                //formatter : function (value, row, index) {
                //    var str = timestampToTime(value);
                //    return str;
                //},
            },
            {
                field : "updateTime",
                title : "更新状态时间",
                sortable: true,
                filterControl : "input",
                columnType : "String",
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

var saveFormValidate = function() {
    $("#saveModal form").validate({
        submitHandler: function(form) {   //表单提交句柄,为一回调函数，带一个参数：form
            $.ajax({
                url: "/admin/goodsType/createGoodsType",
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


var uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',      // 上传模式，依次退化
    browse_button: 'selectImg',         // 上传选择的点选按钮ID，必需
    // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
    // 且如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
    // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
    uptoken : 'vWxd-w1ipbuT3vMkHA8mRblGnFpJ9AlWYmCyTPRx:9wIXxxWHVWq2PZ_U0Tm2qm4TV0E=:eyJzY29wZSI6ImhuYmJsb2NrIiwiZGVhZGxpbmUiOjMzNTQ1MTQ0MjZ9', // uptoken是上传凭证，由其他程序生成
    // uptoken_url: '/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
    // uptoken_func: function(file){    // 在需要获取uptoken时，该方法会被调用
    //    // do something
    //    return uptoken;
    // },
    get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
    // downtoken_url: '/downtoken',
    // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
    // unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
    // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
    domain: 'http://p97k4szaj.bkt.clouddn.com',     // bucket域名，下载资源时用到，必需
    container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
    max_file_size: '100mb',             // 最大文件体积限制
    flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
    max_retries: 5,                     // 上传失败最大重试次数
    dragdrop: true,                     // 开启可拖曳上传
    drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
    chunk_size: '4mb',                  // 分块上传时，每块的体积
    auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
    //x_vars : {
    //    查看自定义变量
    //    'time' : function(up,file) {
    //        var time = (new Date()).getTime();
    // do something with 'time'
    //        return time;
    //    },
    //    'size' : function(up,file) {
    //        var size = file.size;
    // do something with 'size'
    //        return size;
    //    }
    //},
    init: {
        'FilesAdded': function(up, files) {
            plupload.each(files, function(file) {
                // 文件添加进队列后，处理相关的事情
            });
        },
        'BeforeUpload': function(up, file) {
            // 每个文件上传前，处理相关的事情
        },
        'UploadProgress': function(up, file) {
            // 每个文件上传时，处理相关的事情
        },
        'FileUploaded': function(up, file, info) {
            // 每个文件上传成功后，处理相关的事情
            // 其中info是文件上传成功后，服务端返回的json，形式如：
            // {
            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
            //    "key": "gogopher.jpg"
            //  }
            // 查看简单反馈
            // var domain = up.getOption('domain');
            // var res = parseJSON(info);
            // var sourceLink = domain +"/"+ res.key; 获取上传成功后的文件的Url
        },
        'Error': function(up, err, errTip) {
            //上传出错时，处理相关的事情
        },
        'UploadComplete': function() {
            //队列文件处理完毕后，处理相关的事情
        },
        'Key': function(up, file) {
            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            // 该配置必须要在unique_names: false，save_key: false时才生效

            var key = "";
            // do something with key here
            return key
        }
    }
});




