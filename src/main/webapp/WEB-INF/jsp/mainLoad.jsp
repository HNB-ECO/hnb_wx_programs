<%@ page language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="renderer" content="webkit">
		<title>数据统计</title>
		<link rel="shortcut icon" href="${ctx}/img/sm-logo.png">
		<link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
		<link href="${ctx}/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
		<link href="${ctx}/css/animate.css" rel="stylesheet">
		<link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
		<link href="${ctx}/css/cust.css?v=4.1.0" rel="stylesheet">
		<link href="${ctx}/css/freewall/style.css" rel="stylesheet" type="text/css" />

		<style type="text/css">
			.free-wall {
				margin: 15px;
			}
			.cell {
				cursor: move;
			}
			.cell .cover {
				padding: 15px;
			}
			.handle {
				border: 1px dotted orange;
				padding: 4px
			}
		</style>
	</head>

	<body class="fixed-sidebar full-height-layout gray-bg sidebar-content">
		<div class="wrapper-content">
			<div class="row">
				<div class="col-sm-12">
					<div id="freewall" class="free-wall">

					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-2">
					<div class="form-group" style="color: black">
						<label class="col-sm-12 control-label">选择要查看的商家</label>
						<div class="col-sm-12">
							<div class="col-sm-12 m-l-n">
								<select class="form-control" multiple="" id ="platformPieSel" onchange="getGoodsDataByPlatform();">
									<c:forEach items ="${platforms}" var = "platform" >
										<option value="${platform.id}">${platform.platformName}</option>
									</c:forEach>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-10">
					<!-- 商品销量饼状图 -->
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
							</div>
						</div>
						<div class="ibox-content">
							<div class="echarts" id="goodPieChart"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<!-- 订单量统计-->
				<div class="col-sm-6">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
							</div>
						</div>
						<div class="ibox-content">
							<div class="echarts" id="orderLineChart"></div>
						</div>
					</div>
				</div>

				<!-- 客户量统计-->
				<div class="col-sm-6">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
							</div>
						</div>
						<div class="ibox-content">
							<div class="echarts" id="customerLineChart"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 全局js -->
		<script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
		<script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
		<script src="${ctx}/js/plugins/metisMenu/jquery.metisMenu.js"></script>
		<script src="${ctx}/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
		<script src="${ctx}/js/plugins/layer/layer.min.js"></script>
		<!-- 自定义js -->
		<script src="${ctx}/js/hplus.js?v=4.1.0"></script>
		<script type="text/javascript" src="${ctx}/js/contabs.js"></script>
		<!-- 第三方插件 -->
		<script src="${ctx}/js/plugins/pace/pace.min.js"></script>
		<script src="${ctx}/js/freewall/freewall.js"></script>

		<!--首页FreeWall-->
		<script type="text/javascript">
			//页面加载完成后执行
			$().ready(function(){
				//ajax请求首页free wall
				$.ajax({
					url : "${ctx}/admin/index/getFreeWall",
					type : "POST",
					dataType : "json",
					data : {},
					success : function(data) {
						var dataArray = data.data;

						//请求成功添加数据
						var temp = "<div class='cell' style='width:{width}px; height: {height}px; background-color: {color}'><div class='cover'>{text}</div></div>";

						var colour = [
							"rgb(244, 164, 164)",
							"rgb(244, 140, 117)",
							"rgb(97, 128, 196)",
							"rgb(233, 179, 94)",
							"rgb(245, 228, 110)",
							"rgb(150, 190, 221)",
							"rgb(39, 174, 96)"
						];

						var w = 1, h = 1,  color = '', limitItem = dataArray.length;
						for (var i = 0; i < dataArray.length; ++i) {
							h = 1 + 1 * Math.random() << 0;
							w = 1 + 2 * Math.random() << 0;
							color = colour[colour.length * Math.random() << 0];
							html = temp.replace(/\{height\}/g, h*150).replace(/\{width\}/g, w*150).replace("{color}", color).replace("{text}",dataArray[i].name).replace("{index}",dataArray[i].id);
							$("#freewall").append(html);
						}

						var wall = new Freewall("#freewall");
						wall.reset({
							draggable: true,
							selector: '.cell',
							animate: true,
							cellW: 150,
							cellH: 150,
							onResize: function() {
								wall.refresh();
							},
							onBlockMove: function() {
								console.log(this);
							}
						});
						wall.fitWidth();
						// for scroll bar appear;
						$(window).trigger("resize");
					}
				});
			});

			function getGoodsDataByPlatform(){
				var platformId = $("#platformPieSel option:selected").val();
				$.ajax({
					url : "/admin/index/getGoodPieChart",
					type : "POST",
					dataType : "json",
					data : {"platformId":platformId},
					success : function(data) {
						var goodPieData = data.data;
						//商品销量饼状图
						var goodPieChart = echarts.init(document.getElementById("goodPieChart"));
						var goodPieoption = {
							title : {
								text: goodPieData.name,
								subtext: goodPieData.subtext,
								x:'center'
							},
							tooltip : {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},
							legend: {
								orient : 'vertical',
								x : 'left',
								data: goodPieData.legend
							},
							calculable : true,
							series : goodPieData.data
						};
						goodPieChart.setOption(goodPieoption);
						$(window).resize(goodPieChart.resize);
					}
				});
			}
		</script>

		<!-- echart-->
		<script src="${ctx}/js/plugins/echarts/echarts-all.js"></script>
		<script src="${ctx}/js/content.js?v=1.0.0"></script>
		<script src="${ctx}/js/cust/main/main.js"></script>
		<script>
			var type = '<%=request.getSession().getAttribute("type")%>';
			console.log("type:::" + type);
			if(type == "1" ){
				localStorage.platName="super";
			}else{
				localStorage.platName="normal";
			}
		</script>

	</body>
</html>