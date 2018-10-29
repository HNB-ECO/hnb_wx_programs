/**
 * 主页面
 */
var mainWarehouseId 
var mainUserId;
var mainGoodId;
$().ready(function() {
	$('#warehouse3DId' ).selectpicker();
	initUserSuggest();
	initGoodSuggest();
	initWarehouseNoteSuggest();
});

function clickWarehouse(warehouseId,el){
	mainWarehouseId = warehouseId;
	$("#warehouse3DIdUl li").removeClass("liActive")
	$(el).addClass("liActive");
	$.ajax({
		url : "./main!loadUser.html",
		type : "POST",
		dataType : "json",
		data : {
			"mainSearch.warehouseId" : mainWarehouseId
		},
		beforeSend : function(request) {
			showLoading();
		},
		complete : function() {
			removeLoading();
		},
		success : function(data) {
			$("#user3dIdUl").removeClass("hide");
			$("#good3dIdUl").html("");
			$("#warehouseNote3dIdUl").html("");
			$("#user3dIdUl").html("");
			var liArr = [];
			$.each(data, function(index,ele){
				liArr.push('<li onclick="');
				liArr.push('clickCustomer(');
				liArr.push(ele.id);
				liArr.push(',this');
				liArr.push(')');
				liArr.push('">');
				liArr.push(ele.name);
				liArr.push('</li>');
			});
			var liStr = liArr.join('');
			$("#user3dIdUl").html(liStr);
		}
	});
}

function clickCustomer(userId,el) {
	mainUserId = userId;
	$("#user3dIdUl li").removeClass("liActive")
	$(el).addClass("liActive");
	$.ajax({
		url : "./main!loadGoods.html",
		type : "POST",
		dataType : "json",
		data : {
			"mainSearch.warehouseId" : mainWarehouseId,
			"mainSearch.userId" : mainUserId
		},
		beforeSend : function(request) {
			showLoading();
		},
		complete : function() {
			removeLoading();
		},
		success : function(data) {
			$("#good3dIdUl").html("");
			$("#warehouseNote3dIdUl").html("");
			$("#good3dIdUl").removeClass("hide");
			var liArr = [];
			$.each(data, function(index,ele){
				liArr.push('<li onclick="');
				liArr.push('clickGood(');
				liArr.push(ele.id);
				liArr.push(',this');
				liArr.push(')');
				liArr.push('">');
				liArr.push(ele.name);
				liArr.push('</li>');
			});
			var liStr = liArr.join('');
			$("#good3dIdUl").html(liStr);
		}
	});
}


function clickGood(goodId,el) {
	mainGoodId = goodId;
	$("#good3dIdUl li").removeClass("liActive")
	$(el).addClass("liActive");
	$.ajax({
		url : "./main!loadWarehouseNote.html",
		type : "POST",
		dataType : "json",
		data : {
			"mainSearch.warehouseId" : mainWarehouseId,
			"mainSearch.userId" : mainUserId,
			"mainSearch.goodNameId" : mainGoodId
		},
		beforeSend : function(request) {
			showLoading();
		},
		complete : function() {
			removeLoading();
		},
		success : function(data) {
			$("#warehouseNote3dIdUl").html("");
			$("#warehouseNote3dIdUl").removeClass("hide");
			var liArr = [];
			$.each(data, function(index,ele){
				liArr.push('<li>');
				liArr.push(ele.name);
				liArr.push('</li>');
			});
			var liStr = liArr.join('');
			$("#warehouseNote3dIdUl").html(liStr);
		}
	});
}

function initUserSuggest(){
	var warehouseId = $("#warehouse3DId").val()
	var $input = $("#user3dId");
	$input.bsSuggest({
		getDataMethod: "url",
		url: "../move/inventory-detail!userSuggest.html?warehouseId=" + mainWarehouseId + "&warehouseNote=" + $("#warehouseNote3dId").val()  + "&goodName=" + $("#good3dId").val() + "&userName=",
		allowNoKeyword : true, // 是否允许无关键字时请求数据
		showBtn : false,
		listAlign : "right",
		leftWidth : 0,
		idField: "userName",
        keyField: "userName",
        effectiveFields: ["userCode","userName"],
		effectiveFieldsAlias : {
			userCode : "用户编码",
			userName : "用户名"
		},
		// 调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
		fnAdjustAjaxParam : function(keyword, opts) {
			opts.url = "../move/inventory-detail!userSuggest.html?warehouseId=" + $("#warehouse3DId").val() + "&warehouseNote=" + $("#warehouseNote3dId").val()  + "&goodName=" + $("#good3dId").val() + "&userName=";
			return {
				timeout : 30000,// 超时时间30秒
			};
		},
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
            return {value: json};
        }
	}).on('onSetSelectValue', function (e, keyword) {
	});
}

function initGoodSuggest(){
	var warehouseId = $("#warehouse3DId").val()
	var $input = $("#good3dId");
	$input.bsSuggest({
		getDataMethod: "url",
		url: "../move/inventory-detail!goodSuggest.html?warehouseId=" + warehouseId + "&warehouseNote=" + $("#warehouseNote3dId").val()  + "&userName=" + $("#user3dId").val() + "&goodName=",
		allowNoKeyword : true, // 是否允许无关键字时请求数据
		showBtn : false,
		listAlign : "right",
		leftWidth : 0,
		idField: "goodName",
        keyField: "goodName",
        effectiveFields: ["goodShortName","goodName"],
		effectiveFieldsAlias : {
			goodShortName : "品项编码",
			goodName : "品项名称"
		},
		// 调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
		fnAdjustAjaxParam : function(keyword, opts) {
			opts.url = "../move/inventory-detail!goodSuggest.html?warehouseId=" + $("#warehouse3DId").val() + "&warehouseNote=" + $("#warehouseNote3dId").val()  + "&userName=" + $("#user3dId").val() + "&goodName=";
			return {
				timeout : 30000,// 超时时间30秒
			};
		},
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
            return {value: json};
        }
	}).on('onSetSelectValue', function (e, keyword) {
	});
	// 调整搜索框的样式
}

function initWarehouseNoteSuggest(){
	var warehouseId = $("#warehouse3DId").val()
	var $input = $("#warehouseNote3dId");
	$input.bsSuggest({
		getDataMethod: "url",
		url: "../move/inventory-detail!warehosueNoteSuggest.html?warehouseId=" + warehouseId + "&userName=" + $("#user3dId").val()  + "&goodName=" + $("#good3dId").val() + "&warehouseNote=",
		allowNoKeyword : true, // 是否允许无关键字时请求数据
		showBtn : false,
		listAlign : "right",
		leftWidth : 0,
		idField: "note",
        keyField: "note",
        effectiveFields: ["note"],
		effectiveFieldsAlias : {
			note : "仓位编码"
		},
		// 调整 ajax 请求参数方法，用于更多的请求配置需求。如对请求关键字作进一步处理、修改超时时间等
		fnAdjustAjaxParam : function(keyword, opts) {
			opts.url = "../move/inventory-detail!warehosueNoteSuggest.html?warehouseId=" + $("#warehouse3DId").val() + "&userName=" + $("#user3dId").val()  + "&goodName=" + $("#good3dId").val() + "&warehouseNote=";
			return {
				timeout : 30000,// 超时时间30秒
			};
		},
        processData: function (json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
            return {value: json};
        }
	}).on('onSetSelectValue', function (e, keyword) {

	});
}
