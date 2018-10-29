<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>门店分拣</title>
	<script src="${ctx}/js/cust/out/linePicking/detail.js"></script>
</head>

<body class="gray-bg">
	 <input type="hidden" id="selOrderIds" value="${storePickingSearch.orderIds }">
	 <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	      <h4 class="modal-title">线路分拣</h4>
	  </div>
	  <div class="modal-body">
           <div class="row row-lg">
               <div class="col-sm-12">
                  <div class="row " style="padding-bottom: 8px;">
                	    <div class="col-md-10">
	                         <div class="col-md-6">
		                       		  <select id="linePickingRouteName"  multiple  class="selectpicker show-tick form-control"  data-live-search="true">
					                      <option></option>
					                         <c:forEach var="user" items="${allRouteList}">
					                       		<option value="${user.id}">${user.routeName}</option>
					                       </c:forEach>
							         </select>
	                         </div>
	                          <div class="col-md-6">
	                         	 <select id="linePickingOrderStatus" multiple name="storePickingSearch.goodsName.warehouseType"  class="selectpicker show-tick form-control"  data-live-search="true">
				                       	<option></option>
				                       	<option value="1">常温</option>
				                       	<option value="2">恒温</option>
				                       	<option value="3">冷冻</option>
				                        <option value="4">冷藏</option>
							      </select>
	                         </div>
                	    </div>
                	    <div class="col-md-2">
                	    	<button id="linePickingLoadBut" class="btn btn-sm btn-primary " type="button"><i class="fa fa-search"></i>&nbsp;查询</button>
                	    	<button id="printLinePicking" class="btn btn-default btn-sm " type="button"><i class="glyphicon glyphicon-print"></i>&nbsp;打印</button>
                	    </div>
                     </div>
               </div>
               
                 <div class="col-sm-12" style="padding-top: 8px;">
	                 <div id="linePickingLoad">
		                 
	                 </div>
                </div>
           </div>
	  </div>
 
     <div class="modal-footer">
           <button type="button" class="btn btn-white btn-sm" data-dismiss="modal">关闭</button>
      </div>
</body>

</html>