<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">



    <link rel="shortcut icon" href="favicon.ico"> 
    <link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">

    <link href="${ctx}/css/animate.css" rel="stylesheet">
    <link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">

</head>

<body class="gray-bg">


    <div class="middle-box text-center animated fadeInDown">
        <h1>500</h1>
        <h3 class="font-bold">服务器内部错误</h3>

        <div class="error-desc">
            服务器好像出错了...
            <br/>您可以返回主页看看
        </div>
    </div>

    <!-- 全局js -->
    <script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
    <script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>

</body>

</html>
