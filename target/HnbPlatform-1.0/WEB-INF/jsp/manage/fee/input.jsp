<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>收费管理</title>
</head>
<body>

<div class="row">
    <div class="col-md-12">
        <form class="form-horizontal">
	        <div class="form-group">
	                <label class="col-sm-3 control-label">收费类型：</label>
	                <div class="col-sm-8">
	                	<c:choose>
	                		<c:when test="${fee.feeType == null}">
	                			<select name="fee.feeType" class="selectpicker show-tick form-control" id="feeTypeSelect">
						        	<c:forEach items="${feeTypeList}" var="feeType">
						        		<option value="${feeType.id}">${feeType.name}</option>
						        	</c:forEach>
						        </select>
	                		</c:when>
	                		<c:otherwise>
	                			<input type="text" name="" value="${fee.feeTypeName}" readonly class="form-control">
	                			<input type="hidden" name="fee.feeType" value="${fee.feeType}" class="form-control">
	                		</c:otherwise>
	                	</c:choose>
				    </div>
	            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">收费名称：</label>
                <div class="col-sm-8">
                    <input type="text" name="fee.feeName" value="${fee.feeName}" class="form-control">
                </div>
            </div>
            
            <div class="form-group">
                <label class="col-sm-3 control-label">应收金额：</label>
                <div class="col-sm-8">
                    <input type="text" name="fee.feeNum" value="${fee.feeNum}" class="form-control" placeholder="">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">计费单位：</label>
                <div class="col-sm-8">
                    <div class="radio i-checks radio-inline">
                        <label><input type="radio" value="1" name="fee.feeUnit"> <i></i> 按重收费</label>
                    </div>
                    <c:choose>
                    	<c:when test="${fee.feeType != null && fee.feeType == 2}">
                    		<div class="radio i-checks radio-inline hidden" id="feeUnitStorage">
                    	</c:when>
                    	<c:otherwise>
                    		<div class="radio i-checks radio-inline" id="feeUnitStorage">
                    	</c:otherwise>
                    </c:choose>
	                        <label><input type="radio" value="2" name="fee.feeUnit"> <i></i> 按板收费</label>
	                    </div>
	                 <div class="radio i-checks radio-inline">
                        <label><input type="radio" value="5" name="fee.feeUnit"> <i></i> 按体积收费</label>
                    </div>
                    <div class="radio i-checks radio-inline">
                        <label><input type="radio" value="6" name="fee.feeUnit"> <i></i> 按门店收费</label>
                    </div>
                    <div class="radio i-checks radio-inline">
                        <label><input type="radio" value="3" name="fee.feeUnit"> <i></i> 按件收费</label>
                    </div>
                    <div class="radio i-checks radio-inline">
                        <label><input type="radio" value="4" name="fee.feeUnit"> <i></i> 按单收费</label>
                    </div>
                    <input id="feeUnit" type="hidden" value="${fee.feeUnit}">
                </div>
            </div>
            
          	<div class="form-group ">
                <label class="col-sm-3 control-label">板数：</label>
                <div class="col-sm-8">
                    <input type="text" name="fee.boardNum" value="${fee.boardNum}" class="form-control" placeholder="">
                	<span class="help-block m-b-none">1：代表整板；0.5：代表半板</span>
                </div>
            </div>
            
            <div class="form-group">
			   <label class="col-sm-3 control-label">适用仓库：</label>
			   <div class="col-sm-8">
			       	<select name="fee.warehouseIds" class="selectpicker show-tick form-control" multiple data-live-search="true">
			       		<c:forEach items="${warehouseList}" var="warehouse">
			        		<option value="${warehouse.warehouseId}">${warehouse.warehouserName}</option>
			        	</c:forEach>
			       	</select>
			       	<input id="warehouseIds" type="hidden" value="${fee.warehouseIds}">
			    </div>
			</div>
			<input type="hidden" name="fee.feeId" value="${fee.feeId}">
        </form>
    </div>
</div>
</body>
</html>