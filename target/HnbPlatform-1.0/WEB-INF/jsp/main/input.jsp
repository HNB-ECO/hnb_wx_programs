<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="${ctx}/js/cust/main/input.js"></script>
	<style>
		ul li:nth-child(odd) {
			border-left: 3px solid #f8ac59;
		}
		ul li:nth-child(even) {
			border-left: 3px solid #ed5565;
		}
		.liActive {
			background: #beebff!important;
			border-radius: 2px!important;
			box-shadow: inset 0 0 0px #999!important;
		}
</style>
</head>
<body class="gray-bg">
	 <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	      <h4 class="modal-title">${mainSearch.branchName }</h4>
	  </div>
	  <div class="modal-body">
           <div class="row row-lg">
				<div class="col-sm-3">
					<div class="ibox">
						<div class="ibox-content" style="height: 502px;">
							<h3>
								仓库名称
							</h3>
							<div class="">
								 <select id="warehouse3DId" name="warehouseId"  class="selectpicker show-tick form-control" onchange="changeWarehouse3D()"   data-live-search="true">
			                       <c:forEach var="warehouse" items="${mainSearch.warehouseList}">
			                     	  	<option value="${warehouse.warehouseId}" <c:if test="${warehouse.warehouseId eq warehouseId}">selected="selected"</c:if> >${warehouse.warehouserName}</option>
			                       </c:forEach>
						         </select>
							</div>
							<ul id="warehouse3DIdUl"  class="sortable-list connectList agile-list ui-sortable" style="height: 400px;overflow: auto;">
							  <c:forEach var="warehouse" items="${mainSearch.warehouseList}">
								  <li onclick="clickWarehouse(${warehouse.warehouseId},this)">
										${warehouse.warehouserName}
								 </li>
		                       </c:forEach>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="ibox">
						<div class="ibox-content" style="height: 502px;">
							<h3>
								客户
							</h3>
							<div class="">
								<input id="user3dId" type="text" placeholder="搜索" class="input input-sm form-control">
							</div>
							<ul id="user3dIdUl" class="sortable-list connectList agile-list ui-sortable hide slideInDown" style="height: 400px;overflow: auto;">
								
								
							</ul>
						</div>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="ibox">
						<div class="ibox-content" style="height: 502px;">
							<h3>
								品项名称
							</h3>
							<div class="">
								<input id="good3dId" type="text" placeholder="搜索" class="input input-sm form-control">
							</div>
							<ul id="good3dIdUl" class="sortable-list connectList agile-list ui-sortable hide" style="height: 400px;overflow: auto;">
								
							</ul>
						</div>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="ibox">
						<div class="ibox-content" style="height: 502px;">
							<h3>
								仓位
							</h3>
							<div >
								<input id="warehouseNote3dId" type="text" placeholder="搜索" class="input input-sm form-control">
							</div>
							<ul id="warehouseNote3dIdUl" class="sortable-list connectList agile-list ui-sortable hide" style="height: 400px;overflow: auto;">
								
							</ul>
						</div>
					</div>
				</div>
           </div>
	  </div>
     <div class="modal-footer">
           <button type="button" class="btn btn-sm btn-white" data-dismiss="modal">关闭</button>
      </div>
</body>
</html>