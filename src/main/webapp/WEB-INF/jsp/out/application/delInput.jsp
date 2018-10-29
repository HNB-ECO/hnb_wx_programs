<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="${ctx}/js/cust/out/application/delInput.js"></script>
</head>
<body class="gray-bg">
	 <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	      <h4 class="modal-title">订单作废</h4>
	  </div>
	  <div class="modal-body">
	       <form class="form-horizontal" method="post" action="${ctx}/out/application!delOrder.html">
                 <input type="hidden" name="orderSearch.ids"  value="${orderSearch.ids}">
                 <div class="form-group">
					<label class="col-sm-3 control-label">备注：</label>
					<div class="col-sm-9 ">
						<textarea  name="orderSearch.note" class="form-control" required aria-required="true"></textarea>
					</div>
				</div>
			</form>
	  </div>
     <div class="modal-footer">
		<button type="button" id="applicationDelCloseBtn" class="btn btn-sm btn-white" data-dismiss="modal">关闭</button>
		<button type="button" id="applicationDelSaveBtn" class="btn btn-sm btn-primary" >保存</button>
      </div>
</body>
</html>