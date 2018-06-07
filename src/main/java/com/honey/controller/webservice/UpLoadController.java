package com.honey.controller.webservice;

import com.honey.response.Code;
import com.honey.response.Response;
import com.honey.util.Constant;
import com.honey.util.DataUtils;
import com.honey.util.QiniuUtil;
import com.qiniu.storage.model.DefaultPutRet;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

/**
 * Created by ZYL on 2018/6/5.
 * 上传接口
 */
@Controller
@RequestMapping("/webservice/upload")
public class UpLoadController {

    /**
     * 上海窜图片至七牛
     * @param uploadFile
     * @param request
     * @return
     */
    @RequestMapping(value = "/uploadImage",method = RequestMethod.POST)
    @ResponseBody
    public Response uploadImage(MultipartFile uploadFile,HttpServletRequest request){
        DefaultPutRet putRet;
        String oldKey = request.getParameter("imageUrl");//如果在编辑的情况下获取原来图片在数据库中的名称
        try {
            //取文件的全名和扩展名
            String originalFilename = uploadFile.getOriginalFilename();
            String extName = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

            //获取Key值
            String key;
            if(DataUtils.isNullOrEmpty(oldKey)){//新的上传
                StringBuilder name = new StringBuilder();
                key = name.append(new Date().getTime()).append(".").append(extName).toString();
            }else {
                key = oldKey;
            }

            //获取token值
            String token = QiniuUtil.getToken(Constant.QINIU_ACCESS_KEY,Constant.QINIU_SECRET_KEY,Constant.QINIU_BUCKET,key);

            //返回信息
            putRet = QiniuUtil.uploadImage(uploadFile.getBytes(),key,token);
        }catch (Exception e){
            e.printStackTrace();
            return new Response(Code.UPLOAD_IMAGE_FAILED);
        }
        return new Response(putRet);
    }
}
