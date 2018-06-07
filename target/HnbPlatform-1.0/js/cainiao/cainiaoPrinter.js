var printerMap = new HashMap();
var printerNameMap = new HashMap();

// 菜鸟打印
function cainiaoPrint(data, address, template) {
	var socket = getSocket(address);
	setTimeout(_doPrint(socket, data, template), 1000);
}

function _doPrint(socket, data, template) {
	return function() {
		doPrint(socket, data, template);
	}
}

// 设置打印机名称
// address 打印机地址
// defaultPrinterName 默认打印机
function cainiaoSetPrinterConfig(address, printer) {
	var socket = getSocket(address, null);
	if( printer.name != null ){
		printerMap.put(socket,printer.name);
	}
	printerNameMap.put('ws://' + address + "/", printer.name );
	if( printer.paperSize != null ){
		printerMap.put(printer.name,printer.paperSize);
	}
	
	doSetPrinterConfig(socket, printer);
}

/*******************************************************************************
 * 获取打印机 address 打印机地址
 */
function cainiaoGetPrinters(address) {
	var socket = getSocket(address);
	setTimeout(_doGetPrinters(socket), 1000);
}

function _doGetPrinters(socket) {
	return function() {
		doGetPrinters(socket);
	}
}

/*******************************************************************************
 * 打开打印机连接
 */
function getSocket(address, defaultPrinterName) {
	var socket = printerMap.get(address);
	if (socket == null) {
		socket = new WebSocket('ws://' + address);
		socket.onopen = function(event) {
			printerMap.put(address, socket);
		};
		// 监听消息
		socket.onmessage = function(event) {
			console.log('Client received a message', event);
			var data = JSON.parse(event.data);
			if ("getPrinters" == data.cmd) {
				$("#printBarcodeList").empty();
				for (var i = 0; i < data.printers.length; i++) {
					$("#printBarcodeList").append(
							"<option value='" + data.printers[i].name + "'>"
									+ data.printers[i].name + "</option>");
				}
				defaultPrinter = data.defaultPrinter;
			} else if ("setPrinterConfig" == data.cmd) {
				if (data.status == "failed") {
					alertMsg.error(data.msg)
				}
			} else if ("print" == data.cmd) {
				if (data.status == "failed") {
					alertMsg.error(data.msg)
				}
			}
		};

		// 监听Socket的关闭
		socket.onclose = function(event) {
			printerMap.remove(event.target);
			printerMap.remove(event.target.url.replace("ws://","").replace("/",""));
			console.log('Client notified socket has closed', event);
		};

		socket.onerror = function(event) {
			alertMsg.error('无法连接到:' + address);
		};
	}

	return socket;
}

/*******************************************************************************
 * 请求打印机列表协议
 */
function doGetPrinters(socket) {
	var myDate = new Date();
	now = myDate.getTime();
	var request = {
		requestId : '' + now,
		version : "1.0",
		cmd : "getPrinters"
	};
	socket.send(JSON.stringify(request));
}

/*******************************************************************************
 * 设置打印机名字并打印
 */
function doSetPrinterConfig(socket, printer) {
	var myDate = new Date();
	now = myDate.getTime();
	var request = {
		requetId : '' + now,
		version : '1.0',
		cmd : 'setPrinterConfig',
		printer :printer
	};
	socket.send(JSON.stringify(request));
}

/*******************************************************************************
 * 打印
 */
function doPrint(socket, data, template) {
	debugger
	var documents = $.parseJSON(data);
	var myDate = new Date();
	var now = myDate.getTime();
	var printerName = printerNameMap.get(socket.url);
	var random = parseInt(1000 * Math.random());
	var request = {
		cmd : "print",
		requestID : now + random,
		version : "1.0",
		task : {
			taskID : '' + random,
			preview : false,
			printer : printerName,
			previewType : 'pdf',
			documents : documents
		}
	};
	socket.send(JSON.stringify(request));
}
