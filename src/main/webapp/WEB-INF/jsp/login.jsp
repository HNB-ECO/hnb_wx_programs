<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/common/taglibs.jsp" %>
<!DOCTYPE html>
<html>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>HNB</title>

    <link rel="shortcut icon" href="${ctx}/img/sm-logo.png">
    <link href="${ctx}/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="${ctx}/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="${ctx}/css/animate.css" rel="stylesheet">
    <link href="${ctx}/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="${ctx}/css/style.css" rel="stylesheet">
    <link href="${ctx}/css/login.css" rel="stylesheet">
    <script src="${ctx}/js/jquery.min.js?v=2.1.4"></script>
    <script src="${ctx}/js/bootstrap.min.js?v=3.3.6"></script>
    <script>
        if (window.top !== window.self) {
            window.top.location = window.location;
        }

        function login() {
            $.post("${pageContext.request.contextPath}/admin/index/login", $("#loginform").serialize(),function(data){
                if(data.code == 200){
                    window.location.href = '/admin/index/getMain';
                }else{
                    $("#alert").html(data.message);
                }
            });
        }
    </script>
</head>


<body class="signin">
    <div class="middle-box text-center loginscreen animated fadeInDown" style="float: right;margin-right: 10%;margin-top: 260px">
        <div>
            <%--<div class="logo-name" style="font-size: 109px;">--%>
               <%--<img alt="" src="${ctx}/img/logo.png" style="height: 100px;">--%>
            <%--</div>--%>
            <h5 id="alert" style="padding-left:35px;display: inline;color: red;"></h5>
            <form id="loginform" class="m-t" role="form" style="background: rgba(255, 255, 255, 0.7);border: 1px solid rgba(255,255,255,.3);box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);border-radius: 3px;padding: 30px;">
                <div class="form-group">
                    <input id="userName" type="text" name="userName" class="form-control uname" value="" placeholder="用户名" style="color: black;" required="">
                </div>
                <div class="form-group">
                    <input id="password" type="password" name="password" style="color: black;" value="" class="form-control pword m-b" placeholder="密码" required="">
                </div>
                <a onclick="login();" class="btn btn-primary  block full-width m-b">登 录</a>
            </form>
        </div>
    </div>
</body>

</html>
