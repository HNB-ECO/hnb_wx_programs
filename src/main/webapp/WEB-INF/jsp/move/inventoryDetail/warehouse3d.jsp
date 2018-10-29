<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <%@ include file="/common/commonJsCss.jsp"%>
    <link rel="stylesheet" href="${ctx}/js/3d/TemplateData/style.css">
    <script type="text/javascript" src="${ctx}/js/plugins/tween/tweenjs-0.6.1.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/3d/TemplateData/CSSPlugin.js"></script>
    <script src="${ctx}/js/3d/TemplateData/UnityProgress.js"></script>
    <script src="${ctx}/js/cust/move/warehouse3d.js"></script>
  </head>
  <body class="gray-bg template">
	<div class="wrapper wrapper-content animated fadeInRight" style="height: 100%;">
	    <div class="ibox float-e-margins" style="height: 100%;">
	        <div class="ibox-content" style="height: 100%;">
	            <div class="row row-lg" style="height: 100%;">
	             <div class="col-sm-3">
	             		<div class="ibox float-e-margins">
		                <div class="ibox-content mailbox-content">
		                    <form id="warehouse3d" class="form-horizontal" method="post" action="${ctx}/move/inventory-detail!warehouseInfoFor3D.html">
		                    <input id="hightlightOnIds" type="hidden" >
	                            <div class="form-group">
	                                <label class="sr-only">用户名：</label>
	                                <div class="col-sm-12">
	                                    <select id="warehouse3DId" name="warehouseId"  class="selectpicker show-tick form-control" onchange="changeWarehouse3D()"   data-live-search="true">
					                       <c:forEach var="warehouse" items="${warehouseList}">
					                     	  	<option value="${warehouse.warehouseId}" <c:if test="${warehouse.warehouseId eq warehouseId}">selected="selected"</c:if> >${warehouse.warehouserName}</option>
					                       </c:forEach>
								         </select>
	                                </div>
	                            </div>
	                            <div class="form-group">
	                                <label class="sr-only"></label>
	                                <div class="col-sm-12">
	                                    <input id="user3dId" type="text" placeholder="用户名" class="form-control">
		                                <div class="input-group-btn">
	                                        <button type="button" class="btn btn-sm btn-white dropdown-toggle" data-toggle="dropdown">
	                                            <span class="caret"></span>
	                                        </button>
	                                        <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
	                                    </div>
	                                </div>
	                            </div>
	                            <div class="form-group">
	                                <label class="sr-only"></label>
	                                <div class="col-sm-12">
	                                    <input id="good3dId" type="text" placeholder="品项名称" class="form-control">
	                                	<div class="input-group-btn">
	                                        <button type="button" class="btn btn-sm btn-white dropdown-toggle" data-toggle="dropdown">
	                                            <span class="caret"></span>
	                                        </button>
	                                        <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
	                                    </div>
	                                </div>
	                            </div>
	                            <div class="form-group">
	                                <label class="sr-only"></label>
	                                <div class="col-sm-12">
	                                    <input id="warehouseNote3dId" type="text" placeholder="仓位编号" class="form-control">
	                                	<div class="input-group-btn">
	                                        <button type="button" class="btn btn-sm btn-white dropdown-toggle" data-toggle="dropdown">
	                                            <span class="caret"></span>
	                                        </button>
	                                        <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
	                                    </div>
	                                </div>
	                            </div>
	                            <div id="update3d" class="btn btn-block btn-primary" >检索</div>
	                             <div  style="height: 20px;"></div>
	                            <div class="form-group">
	                                <div class="col-sm-12">
		                               <table class="table">
					                        <tbody>
					                            <tr>
					                                <td>
					                                    <button type="button" class="btn btn-sm btn-danger m-r-sm">${mapWarehousePositionGoods.sumUserNum }</button>
					                               		用户
					                                </td>
					                                <td>
					                                    <button type="button" class="btn btn-sm btn-primary m-r-sm">${mapWarehousePositionGoods.sumTypeGoodNum }</button>
					                                 	品项
					                                </td>
					                              
					                            </tr>
<!-- 					                            <tr> -->
<!-- 					                                <td> -->
<%-- 					                                    <button type="button" class="btn btn-sm btn-info m-r-sm">${mapWarehousePositionGoods.sumGoodNum }</button> --%>
<!-- 					                                	 总数量 -->
<!-- 					                                </td> -->
<!-- 					                                <td> -->
<%-- 					                                    <button type="button" class="btn btn-sm btn-success m-r-sm"><fmt:formatNumber value="${mapWarehousePositionGoods.sumGoodWeight/1000 }" type="currency" pattern="0.##"/> </button> --%>
<!-- 					                                                                                                 总重量(吨) -->
<!-- 					                                </td> -->
					                              
<!-- 					                            </tr> -->
					                            <tr>
					                                <td>
					                                    <button type="button" class="btn btn-sm btn-warning m-r-sm">${mapWarehousePositionGoods.sumFeeWarehousePositionNum }</button>
					                                                                                                  空闲
					                                </td>
					                                <td>
					                                    <button type="button" class="btn btn-sm btn-default m-r-sm">${mapWarehousePositionGoods.sumUseWarehousePositionNum }</button>
					                              		 使用
					                                </td>
					                            </tr>
					                        </tbody>
                    </table>
	                                </div>
	                            </div>
                             </form>
		                </div>
		            </div>
	             </div>
	             <div class="col-sm-9" style="height: 100%;">
	             	<div class="template-wrap clear" style="height: 80%;">
							  <!--Unity渲染模块 需保留-->
						<canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"  ></canvas>
				   </div>
				   <div id="loadingBox">
						<div id="bgBar"></div>
						<div id="progressBar"></div>
						<img id="spinner" src="${ctx}/js/3d/TemplateData/spinner.gif" style="display: none; margin: 0 auto" />
						<p id="loadingInfo">Loading...</p>
					</div>
				    <table id="table3d" class="text-nowrap" data-height="120"  data-mobile-responsive="true"></table>
	             </div>
	            </div>
	        </div>
	    </div>
	</div>
	
	<!--Unity初始化成功回调接口 需保留-->
	<script type="text/javascript">
		function loadResource()
		{
			//资源的url
			var resourceUrl = "${ctx}/template/3d/assetbundles/webgl/";
			//调用Unity接口
			SendMessage("Main", "GetResource", resourceUrl);
		}

		function loadJson()
		{
		    var jsonStr = '${warehouse3dData}';
			//要传的json数据
            //调用Unity接口
			SendMessage("Main", "GetJson", jsonStr);
		}

		//要高亮显示的货物ids，多个的话用"|"拼接
		function hightlightOn(ids)
		{
			hightlightOff();
			$("#hightlightOnIds").val(ids);
			//调用Unity接口
			SendMessage("Main", "HightlightOn", ids);
		}

		function loadFinish(){
			//加载完成回调函数
// 			alert("11")
		}
		
	    //双击选中的物体所在的仓位id
		function onSelectGoods(id)
		{
		}
		
		function hightlightOff()
		{
			//要高亮显示的货物id，多个的话用"|"拼接
			var ids = $("#hightlightOnIds").val();
			//调用Unity接口
			SendMessage("Main", "HightlightOff", ids);
		}
		
	<!--Unity加载参数 需保留-->
	  var Module = {
		TOTAL_MEMORY: 536870912,
		errorhandler: null,			// arguments: err, url, line. This function must return 'true' if the error is handled, otherwise 'false'
		compatibilitycheck: null,
		backgroundColor: "#222C36",
		splashStyle: "Light",
		dataUrl: "${ctx}/js/3d/Release/warehouse.data",
		codeUrl: "${ctx}/js/3d/Release/warehouse.js",
		asmUrl: "${ctx}/js/3d/Release/warehouse.asm.js",
		memUrl: "${ctx}/js/3d/Release/warehouse.mem",
	  };
	</script>
	<!--Unity加载入口 需保留-->
	<script src="${ctx}/js/3d/Release/UnityLoader.js"></script>
  </body>
</html>
