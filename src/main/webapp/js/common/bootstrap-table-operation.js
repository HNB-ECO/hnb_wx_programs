/*
 *
 *  bootstrap-table 增删改通用操作
 *
 *
 */

/**
 * 添加操作，默认添加在第一行之前
 * @param $table 表格jquery对象
 * @param row    行的数据，Object对象
 */
var addOperation = function($table, row) {
    $table.bootstrapTable("insertRow", {index: 0, row: row});
    return true;
};

/**
 * 更新操作
 * @param $table 表格jquery对象
 * @param row    行的数据，Object对象
 * @param index  要更新的行的 index
 * @returns {boolean}
 */
var updateOperation = function ($table, row, index) {
    $table.bootstrapTable("updateRow", {index: index, row: row});
    return true;
}

/**
 * 删除操作
 * @param $table  表格jquery对象
 * @param checkArr 选中的row数组
 * @returns {boolean}
 */
var deleteOperation = function ($table, checkArr) {
    for (var i = 0, length = checkArr.length; i < length; i++) {
        $table.bootstrapTable("hideRow", {uniqueId: checkArr[i].id});
    }
    return true;
}

/**
 * 获取表格中选中的index数组
 * @param $table   表格jquery对象
 * @returns {Array}
 */
var getCheckIndexArr = function ($table) {
    var indexArr = new Array();
    var dataArr = $table.bootstrapTable("getData", true);
    if (dataArr.length == 0) {
        return indexArr;
    }
    for (var i = 0, length = dataArr.length; i < length; i++) {
        if (dataArr[i].state) {
            indexArr.push(i);
        }
    }
    return indexArr;
}

/**
 * 刷新表格数据
 * @param $table  表格jquery对象
 * @param url     新url
 */
var refreshTable = function ($table, newUrl) {
    $table.bootstrapTable("refresh", {url: newUrl});
}


/**
 * 仓位编码
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var outReservationTypeFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 0:
		str = "<span class='badge badge-primary'>自提</span>";
		break;
	case 1:
		str = "<span class='badge badge-warning'>配送</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

/**
 * 仓位编码
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var lockTypeInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 0:
		str = "<span class='badge badge-primary'>货架仓位</span>";
		break;
	case 1:
		str = "<span class='badge badge-warning'>包库仓位</span>";
		break;
	case 2:
		str = "<span class='badge badge-info'>虚拟仓位</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

/**
 * 货架方向
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var shelvesDirectionInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 1:
		str = "<span class='label label-primary'>横向</span>";
		break;
	case 2:
		str = "<span class='label label-warning'>竖向</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}


/**
 * 温层初始化
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var wcInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 1:
		str = "<span class='badge badge-primary'>常温</span>";
		break;
	case 2:
		str = "<span class='badge badge-warning'>恒温</span>";
		break;
	case 3:
		str = "<span class='badge badge-info'>冷冻</span>";
		break;
	case 4:
		str = "<span class='badge badge-danger'>冷藏</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

var disabledTypeFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 0:
		str = "<span class='badge badge-primary'>正常</span>";
		break;
	case 1:
		str = "<span class='badge badge-warning'>残次</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}


/**
 * 是否CTM同步
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var ctmInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 0:
		str = "-";
		break;
	case 1:
		str = "<span class='badge badge-warning'>同步</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

/**
 * CTM同步状态
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var ctmStatusInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 0:
		str = "<span class='badge badge-warning'>待同步</span>";
		break;
	case 1:
		str = "<span class='badge'>已同步</span>";
		break;
	case 2:
		str = "-";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

/**
 * 订单状态
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var inOrderStatusInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 0:
		str = "<span class='badge badge-primary'>已预约</span>";
		break;
	case 1:
		str = "<span class='badge badge-warning'>已导入</span>";
		break;
	case 2:
		str = "<span class='badge badge-info'>已验货</span>";
		break;
	case 3:
		str = "<span class='badge '>已上架</span>";
		break;
	case 5:
		str = "<span class='badge badge-danger'>已作废</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

/**
 * 订单状态
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var outOrderStatusInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 10:
		str = "<span class='badge badge-primary'>已预约</span>";
		break;
	case 11:
		str = "<span class='badge badge-info'>已导入</span>";
		break;
	case 12:
		str = "<span class='badge badge-warning'>已生成</span>";
		break;
	case 13:
		str = "<span class='badge badge-default'>已出库</span>";
		break;
	case 15:
		str = "<span class='badge badge-danger'>已作废</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

/**
 * 入库订单类型
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var inOrderTypeInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 1:
		str = "入库订单";
		break;
	case 4:
		str = "<span class='badge badge-danger'>出库减单</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

/**
 * 出库订单类型
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
var outOrderTypeInitFunc = function (value, row, index) {
	var str;
    switch (value) {
	case 2:
		str = "出库订单";
		break;
	case 3:
		str = "<span class='badge badge-info'>中转订单</span>";
		break;
	default:
		str = "";
		break;
	}
    return str;
}

/**
 * 收费类型
 */
var feeTypeInitFunc = function(value, row, index) {
	var str;
	switch (value) {
	case 1:
		str = "<span class='badge badge-primary'>入库收费</span>";
		break;
	case 2:
		str = "<span class='badge badge-warning'>出库收费</span>";
		break;
	case 3:
		str = "<span class='badge badge-info'>存储收费</span>";
		break;
	case 4:
		str = "<span class='badge badge-default'>包库收费</span>";
		break;
	case 5:
		str = "<span class='badge badge-danger'>越库收费</span>";
		break;
	default:
		str = "";
		break;
	}
	return str;
}

/**
 * 收费单位
 */
var feeUnitInitFunc = function(value, row, index) {
	var str;
	switch (value) {
	case 1:
		str = "<span class='badge badge-primary'>按重收费</span>";
		break;
	case 2:
		str = "<span class='badge badge-warning'>按板收费</span>";
		break;
	case 3:
		str = "<span class='badge badge-info'>按件收费</span>";
		break;
	case 4:
		str = "<span class='badge badge-danger'>按单收费</span>";
		break;
	case 5:
		str = "<span class='badge badge-success'>按体积收费</span>";
		break;
	case 6:
		str = "<span class='badge'>按门店收费</span>";
		break;
	default:
		str = "";
		break;
	}
	return str;
}

/**
 * 1是，其他否
 */
var trueOrFalseInitFunc = function(value, row, index) {
	var str;
    if (value == 1) {
        str = "<span class='badge badge-primary'>是</span>";
    } else {
        str = "<span class='badge badge-danger'>否</span>";
    }
    return str;
}

var operatorTypeInitFunc= function(value, row, index) {
	var str;
	switch (value) {
	case 1:
		str = "<span class='badge badge-primary'>入库</span>";
		break;
	case 2:
		str = "<span class='badge badge-warning'>出库</span>";
		break;
	case 0:
		str = "<span class='badge badge-info'>期初</span>";
		break;
	default:
		str = "";
		break;
	}
	return str;
}

/**
 * 查询参数
 */
var queryParams = function (params) {
	param = new Object();
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
			param[params.searchObject + key] =  $.trim(filter[key]);
		}
	}
	return param;
}

/**
 * 根据选中的数组获取ids字符串
 */
var getIds = function (checkArr, idField) {
	if (checkArr == undefined || checkArr.length == 0) {
		return "";
	}
	if (!idField) {
		idField = "id";
	}
	var ids = "";
	for (var index in checkArr) {
		ids += checkArr[index][idField] + ",";
	}
	ids = ids.substring(0, ids.length - 1);
	return ids;
}

/**
 * 获取导出文件所需的参数
 */
var getExportParams = function(prefix) {
	var params = new Object();
	for (var key in param) {
		if (key.indexOf(".") > 1) {
			params[prefix + key.substring(key.indexOf("."))] = $.trim(param[key]);
		}
	}
	params["orderField"] = param["orderField"];
	params["orderDirection"] = param["orderDirection"];
	return params;
}

/**
 * SuggestDropdTownoggle
 */
var dropdTownoggle = function(){
	var suggestDropdTownoggle = '<div class="input-group-btn">';
	suggestDropdTownoggle = suggestDropdTownoggle + '<button type="button" class="btn btn-white dropdown-toggle" data-toggle="dropdown">';
	suggestDropdTownoggle = suggestDropdTownoggle + '<span class="caret"></span>' + '</button>';
	suggestDropdTownoggle = suggestDropdTownoggle + '<ul class="dropdown-menu dropdown-menu-right" role="menu">' + '</ul>' + '</div>';
	return suggestDropdTownoggle;
}