<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico">
   	<%@ include file="/common/commonJsCss.jsp"%>
    <script src="${ctx}/js/plugins/echarts/echarts-all.js"></script>
   	<script src="${ctx}/js/cust/main/main.js"></script>
   	<script type="text/javascript">
		var seriesData = ${mainSearch.seriesData};
		var markPointSeriesData = ${mainSearch.seriesData};
		var markPointGeoCoord = ${mainSearch.markPointGeoCoord};
	</script>
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
     <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>鲜波隆供应链（中国）库联网地图</h5>
                        <div class="ibox-tools">
                            <a class="collapse-link">
                                <i class="fa fa-chevron-up"></i>
                            </a>
                            <a class="close-link">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div style="height:700px" id="echarts-map-chart"></div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
    
    <!-- 大模态弹出框 -->
	<div class="modal inmodal fade" id="mainModal" tabindex="-1" role="dialog"  aria-hidden="true">
	    <div class="modal-dialog modal-lg modal-lg-lg" style="height: 80%;">
	        <div class="modal-content">
	            <div class="modal-body">
	               
	            </div>
	        </div>
	    </div>
	</div>
</body>

</html>
