<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body class="gray-bg">
	 <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	      <h4 class="modal-title">添加</h4>
	  </div>
	  <div class="modal-body">
	     <form role="form" class="form-horizontal">
           <div id="toolBar" style="padding-bottom: 1px;">
				<button id="inApplicationAddLine" type="button" class="btn btn-sm btn-info btn-sm"><span class="glyphicon glyphicon-plus"></span>&nbsp;添加</button>
				<button id="inApplicationDelLine" type="button" class="btn btn-sm btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span>&nbsp;删除</button>
	       </div>
           <table id="inApplicationInputTable" class="text-nowrap" data-height="240" data-mobile-responsive="true"></table>  
          
          <div class="form-group" style="padding-top:20px;">
               <label class="sr-only">客户姓名</label>

             	<div class="col-sm-10">
	                 <div class="row">
	                     <div class="col-md-4">
	                         <input type="text" placeholder="请输入客户姓名" class="form-control">
	                     </div>
	                     <div class="col-md-6">
	                           <label class="control-label">CTM同步</label>
					              <div class="radio i-checks showInLine">
					              	 <input type="radio" value="option1" name="ps2" checked=""> <i></i> 是 &nbsp;&nbsp;
									 <input type="radio" checked="" value="option2" name="ps2"> <i></i> 否
					              </div>
	                     </div>
	                  
	                 </div>
	             </div>
	         </div>
           </form>
	  </div>
     <div class="modal-footer">
		<button type="button" class="btn btn-sm btn-white" data-dismiss="modal">关闭</button>
		<button type="button" class="btn btn-sm btn-primary" data-dismiss="modal">保存</button>
      </div>

</body>
</html>