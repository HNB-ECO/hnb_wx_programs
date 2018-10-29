<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<div class="row">
    <div class="col-md-12">
        <form class="form-horizontal">
        	<div class="form-group">
				<label class="col-sm-3 control-label">仓库：</label>
				<div class="col-sm-8">
					<input type="text" value="${warehouse.warehouserName}" name="warehouse.warehouserName" class="form-control" readonly/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">仓库规格：</label>
				<div class="col-sm-8">
					<input type="text" value="${warehouse.parameter}" name="warehouse.parameter" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">仓库拥有者：</label>
				<div class="col-sm-8">
					<input type="text" value="${warehouse.owners}" name="warehouse.owners" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">地区：</label>
				<div class="col-sm-8">
					<input type="text" value="${warehouse.area}" name="warehouse.area" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">地址：</label>
				<div class="col-sm-8">
					<input type="text" value="${warehouse.address}" name="warehouse.address" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">仓库性质：</label>
				<div class="col-sm-8">
					<input type="text" value="${warehouse.warehouseTypeText}" name="" class="form-control" readonly/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">零担仓库：</label>
				<div class="col-sm-8">
					<input type="text" value="${warehouse.ltlType == 0 ? '是' : '否'}" name="" class="form-control" readonly/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">警戒库存：</label>
				<div class="col-sm-8">
				    <input type="text" value="${warehouse.alertInventory}" name="warehouse.alertInventory" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
                <label class="col-sm-3 control-label">备注：</label>
                <div class="col-sm-8">
                    <textarea name="warehouse.note" class="form-control forbid-horizontal">${warehouse.note}</textarea>
                </div>
            </div>
            <input type="hidden" value="${warehouse.warehouseId}" name="warehouse.warehouseId"/>
		</form>
    </div>
</div>