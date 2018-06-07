$(function () {
	//ajax请求首页free wall
	$.ajax({
		url : "/admin/index/getChartData",
		type : "POST",
		dataType : "json",
		data : {},
		success : function(data) {
			var orderLineData = data.data.orderLineChart;
			//订单量线状图
			var orderLineChart = echarts.init(document.getElementById("orderLineChart"));
			var orderLinOption = {
				title : {
					text: orderLineData.title
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:orderLineData.legend
				},
				grid:{
					x:40,
					x2:40,
					y2:24
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						boundaryGap : false,
						data : orderLineData.xAxis
					}
				],
				yAxis : [
					{
						type : 'value',
						axisLabel : {
							formatter: '{value}'+orderLineData.valueSuffix
						}
					}
				],
				series : orderLineData.data
			};
			orderLineChart.setOption(orderLinOption);
			$(window).resize(orderLineChart.resize);


			var customerLineData = data.data.userLineChart;
			//用户量线状图
			var customerLineChart = echarts.init(document.getElementById("customerLineChart"));
			var customerLinOption = {
				title : {
					text: customerLineData.title
				},
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data: customerLineData.legend
				},
				grid:{
					x:40,
					x2:40,
					y2:24
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						boundaryGap : false,
						data : customerLineData.xAxis
					}
				],
				yAxis : [
					{
						type : 'value',
						axisLabel : {
							formatter: '{value}'+customerLineData.valueSuffix
						}
					}
				],
				series : customerLineData.data
			};
			customerLineChart.setOption(customerLinOption);
			$(window).resize(customerLineChart.resize);

			var goodPieData = data.data.goodPieChart;
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
});
