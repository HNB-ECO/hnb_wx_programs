<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<script src="${ctx}/js/cainiao/cainiaoPrinter.js"></script>
<script type="text/javascript">
	$().ready(function() {
		cainiaoGetPrinters('127.0.0.1:13528');
	});
	function inPrint() {
		cainiaoPrint('${printData}', '127.0.0.1:13528', 'linePicking')
		$("#reInputCloseButton").click();
	}
	function setPageSizeAndPrintName(sel) {
		var printer = {
	            name : $(sel).val()[0],
	            needUpLogo : true,
	            needDownLogo: false,
	            forceNoPageMargins:true
		    };
			cainiaoSetPrinterConfig('127.0.0.1:13528', printer)
	}
</script>

<body class="gray-bg">
	 <div class="modal-header">
	      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	      <h4 class="modal-title">打印门店分拣</h4>
	  </div>
	  <div class="modal-body">
	     <form role="form" class="form-horizontal">
          <div class="form-group" >
               <label class="col-sm-3 control-label">选择打印机</label>
             	<div class="col-sm-9">
             		 <select id="printBarcodeList" onchange="setPageSizeAndPrintName(this)" multiple style="width: 95%;">
       				 </select>
	             </div>
	         </div>
	         	         <div class="form-group has-success" >
               <label class="col-sm-3 control-label">打印总页数</label>
             	<div class="col-sm-9">
             		 <input type="text" disabled="" placeholder="" class="form-control" value="${totalPage }">
	             </div>
	         </div>
           </form>
	  </div>
     <div class="modal-footer">
		<button type="button" class="btn btn-white btn-sm" data-dismiss="modal" id="reInputCloseButton" class="close">关闭</button>
		<button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" onclick="inPrint()">打印</button>
      </div>

</body>
