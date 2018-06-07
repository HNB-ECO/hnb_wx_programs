package com.honey.util;

import com.google.gson.Gson;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;

/**
 * Created by Administrator on 2018/6/5.
 */
public class QiniuUtil {

    /**
     * 获取七牛token
     * @param accessKey
     * @param secretKey
     * @param bucket
     * @return
     */
    public static String getToken(String accessKey,String secretKey,String bucket) {
        Auth auth = Auth.create(accessKey, secretKey);
        String token = auth.uploadToken(bucket);
        return token;
    }


    /**
     * 获取七牛覆盖文件token
     * @param accessKey
     * @param secretKey
     * @param bucket
     * @param fileKey 要覆盖文件的名称
     * @return
     */
    public static String getToken(String accessKey,String secretKey,String bucket,String fileKey) {
        Auth auth = Auth.create(accessKey, secretKey);
        String token = auth.uploadToken(bucket,fileKey);
        return token;
    }


    /**
     * 上传图片
     * @param uploadBytes
     * @param key
     * @param token
     * @return putRet
     */
    public static DefaultPutRet  uploadImage(byte[] uploadBytes,String key,String  token){
        DefaultPutRet putRet = null;
        try {
            //构造一个带指定Zone对象的配置类
            Configuration cfg = new Configuration(Zone.zone0());
            UploadManager uploadManager = new UploadManager(cfg);

            //上传
            Response response = uploadManager.put(uploadBytes, key, token);
            //解析上传成功的结果
            putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
        }catch (Exception e){
            e.printStackTrace();
        }
        return putRet;
    }

    /*String token = Auth.create(Constant.QINIU_ACCESS_KEY, Constant.QINIU_SECRET_KEY).uploadToken(Constant.QINIU_BUCKET, null, 3600 * 24 * 365 * Constant.QINIU_EFFECTIVETIME, null);*/
}
