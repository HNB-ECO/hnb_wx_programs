function setBmsysLocal(localStr) {
	var urlStr = document.location.href;
	
	$.get(urlStr,{"request_locale":localStr}, function() {
		document.location.href = urlStr;
	});
}

function setUrlAndLocal(urlStr, localStr) {
	document.location.href = urlStr + "?request_locale=" + localStr;
}