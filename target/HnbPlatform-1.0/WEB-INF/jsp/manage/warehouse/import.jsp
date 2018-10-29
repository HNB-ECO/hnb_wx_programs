<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<div class="row">
    <div class="col-md-12">
        <form class="form-horizontal">
        	<div class="form-group">
				<label class="col-sm-3 control-label">仓库：</label>
				<div class="col-sm-8">
					<input type="text" name="warehouse.warehouserName" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">仓库规格：</label>
				<div class="col-sm-8">
					<input type="text" name="warehouse.parameter" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">仓库拥有者：</label>
				<div class="col-sm-8">
					<input type="text" name="warehouse.owners" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">地区：</label>
				<div class="col-sm-8">
					<input type="text" name="warehouse.area" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">地址：</label>
				<div class="col-sm-8">
					<input type="text" name="warehouse.address" class="form-control"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">仓库性质：</label>
				<div class="col-sm-8">
					<select class="form-control" name="warehouse.warehouseType">
						<c:forEach items="${warehouseTypeList}" var="warehouseType">
							<option value="${warehouseType.id}">${warehouseType.name}</option>
						</c:forEach>
				    </select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">零担仓库：</label>
				<div class="col-sm-8">
					<select class="form-control" name="warehouse.ltlType">
						<option value="0">是</option>
						<option value="1">否</option>
				    </select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">警戒库存：</label>
				<div class="col-sm-8">
				    <input type="text" name="warehouse.alertInventory" class="form-control"/>
				</div>
			</div>
           	<div class="form-group">
				<label class="col-sm-3 control-label">仓库文件：</label>
				<div class="col-sm-8">
					<input type="file" name="file" class="form-control" accept=".xls,.xlsx"/>
				</div>
			</div>
			<div class="form-group">
                <label class="col-sm-3 control-label">备注：</label>
                <div class="col-sm-8">
                    <textarea name="warehouse.note" class="form-control forbid-horizontal"></textarea>
                </div>
            </div>
			<div class="form-group">
				<label class="col-sm-3 control-label">&nbsp;</label>
				<div class="col-sm-9">
					<p class="form-control-static"><a href="${ctx}/template/数字仓库模板.xls">下载：数字仓库模板</a></p>
				</div>
			</div>
		</form>
    </div>
</div>