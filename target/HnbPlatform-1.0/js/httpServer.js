/**
 * Created by Administrator on 2018/5/21.
 */
//网络请求


var https =function(url,method,param){
    return new Promise(function(resolve,reject){
        $.ajax({
            type: method,
            url: url,
            data: param,
            success: function(data){
                //状态码200
                if(1){
                    resolve()
                }else{
                    reject()
                }
            },
            error:function(data){
                reject()
            }
        });
    });
}

var jsonHttp =function(url,method,param){
    return new Promise(function(resolve,reject){
        $.ajax({
            type: method,
            url: url,
            data: param,
            dataType: "json",
            success: function(data){
                //状态码200
                if(1){
                    resolve()
                }else{
                    reject()
                }
            },
            error:function(data){
                reject()
            }
        });
    });

}


module.exports = https;
module.exports = jsonHttp;

