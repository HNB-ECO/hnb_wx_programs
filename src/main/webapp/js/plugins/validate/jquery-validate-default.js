/**
 * 以下为修改jQuery Validation插件兼容Bootstrap的方法，没有直接写在插件中是为了便于插件升级
 */

$.validator.setDefaults({
    highlight: function (element) {
    	$(element).parent().next("label").removeClass("hidden");
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function (element) {
    	element.prev("label").addClass("hidden");
        element.closest('.form-group').removeClass('has-error').addClass('has-success');
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
    	//解决验证时错误提示重复的问题
    	error.attr("id", error.attr("id").replace(".", "-"));
    	if (element.is(":input") && element.next(".input-group-btn").size()) {
    		error.appendTo(element.parent().parent());
    	} else if (element.is(":radio") || element.is(":checkbox")) {
            error.appendTo(element.parent().parent().parent());
        } else {
            error.appendTo(element.parent());
        }
    },
    errorClass: "help-block m-b-none no-margins",
    validClass: "help-block m-b-none no-margins"

});