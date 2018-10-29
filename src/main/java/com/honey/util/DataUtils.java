package com.honey.util;


import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.sql.Blob;
import java.sql.Clob;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by 74186 on 2016/6/17.
 */
public class DataUtils {
    public static String getUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }



    public static String replaceBlank(String str) {
        String dest = "";
        if (str!=null) {
            Pattern p = Pattern.compile("\\s*|\t|\r|\n");
            Matcher m = p.matcher(str);
            dest = m.replaceAll("");
        }
        return dest;
    }

    /**
     * 随机生成指定长度的字符串
     *
     * @param count
     * @return
     */
    public static String getCode(int count) {
        String a = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String code = "";
        for (int i = 0; i < count; i++) {
            int rand = (int) (Math.random() * a.length());
            code += String.valueOf(a.charAt(rand));
        }
        return code;
    }



    /**
     * @param obj
     * @return boolean
     * @method isNullOrEmpty
     * @description 判断对象是否为空
     */
    public static boolean isNullOrEmpty(Object obj) {
        if (obj == null)
            return true;

        String str = obj.toString().trim();
        if (str.equals("") || str.equalsIgnoreCase("null"))
            return true;

        if (obj instanceof Collection) {
            Collection collection = (Collection) obj;
            return collection.isEmpty();
        } else if (obj instanceof Map) {
            Map map = (Map) obj;
            return map.isEmpty();
        } else if (obj instanceof Object[]) {
            Object[] array = (Object[]) obj;
            return (array.length == 0);
        }

        return false;
    }

    /**
     * 获取实体类的属�?�名-属�?��?�的Map
     *
     * @param entity
     * @return
     */
    public static Map<String, Object> getEntityFieldMap(Object entity) {
        if (DataUtils.isNullOrEmpty(entity)) {
            return null;
        }

        Map<String, Object> map = new HashMap<String, Object>();
        Field[] fields = DataUtils.getDeclaredFields(entity);

        for (Field field : fields) {
            String fieldName = field.getName();
            Object fieldValue = DataUtils.getFieldValueByName(fieldName, entity);
            if (fieldValue == null) {
                map.put(fieldName, "");
            } else {
                if (fieldValue instanceof Date) {
                    map.put(fieldName, ((Date) fieldValue).getTime());
                } else if (fieldValue instanceof Clob) {
                    map.put(fieldName, DataUtils.clob2String((Clob) fieldValue));
                } else if (fieldValue instanceof Blob) {
                    map.put(fieldName, DataUtils.blob2String((Blob) fieldValue));
                } else if (fieldValue instanceof String) {
                    map.put(fieldName, DataUtils.getString(fieldValue, ""));
                } else {
                    map.put(fieldName, fieldValue);
                }
            }
        }

        return map;
    }

    /**
     * 获取对象的所有属性名
     */
    public static Field[] getDeclaredFields(Object o) {
        try {
            return o.getClass().getDeclaredFields();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 根据属�?�名获取属�?��??
     */
    public static Object getFieldValueByName(String fieldName, Object o) {
        try {
            String firstLetter = fieldName.substring(0, 1).toUpperCase();
            String getter = "get" + firstLetter + fieldName.substring(1);
            Method method = o.getClass().getMethod(getter, new Class[]{});
            Object value = method.invoke(o, new Object[]{});
            return value;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String clob2String(Clob clob) {
        try {
            return clob.getSubString(1, (int) clob.length());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String blob2String(Blob blob) {
        try {
            if (blob == null)
                return "";
            return new String(blob.getBytes(1, (int) blob.length()), "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String getString(Object value, String defaultValue) {
        if (value == null)
            return defaultValue;
        else
            return value.toString();
    }

    public static Long getLong(Object value, long defaultValue) {
        try {
            if (DataUtils.isNullOrEmpty(value))
                return defaultValue;
            return Long.parseLong(String.valueOf(value));
        } catch (Exception e) {
            return defaultValue;
        }
    }

    public static Integer getInt(Object value, int defaultValue) {
        try {
            if (DataUtils.isNullOrEmpty(value))
                return defaultValue;
            return Integer.parseInt(String.valueOf(value));
        } catch (Exception e) {
            return defaultValue;
        }
    }

    public static Double getDouble(Object value, double defaultValue) {
        try {
            if (DataUtils.isNullOrEmpty(value))
                return defaultValue;
            return Double.parseDouble(String.valueOf(value));
        } catch (Exception e) {
            return defaultValue;
        }
    }

    /**
     * 随机生成4位数字验证码
     *
     * @return
     */
    public static String randomVerifyCode() {
        return Double.valueOf(Math.random() * 9000 + 1000).intValue() + "";
    }


    /**
     * 生成图片URL
     *
     * @param imgBase64
     * @param fileDir
     * @param imgDomainUrl
     * @return
     */
    public static String buildImgUrl(String imgBase64, String fileDir, String imgDomainUrl) {
        String fileName = DataUtils.getUUID() + ".png";
        if (!fileDir.endsWith(File.separator)) {
            fileDir += File.separator;
        }

        try {
            DataUtils.base64String2ImageFile(imgBase64, fileDir + fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return imgDomainUrl + fileName;
    }

    /**
     * 将base64字符串转换成图片文件
     *
     * @param base64String
     * @return
     * @throws IOException
     */
    public static File base64String2ImageFile(String base64String,
                                              String imageFilePath) throws IOException {
        byte[] bytes = Base64Codec.decrypt(base64String);
        ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
        BufferedImage bi1 = ImageIO.read(bais);
        File file = new File(imageFilePath);// 可以是jpg,png,gif格式
        ImageIO.write(bi1, "png", file);// 不管输出�?么格式图片，此处不需改动

        return file;
    }

//    public static void main (String []args){
//
//        System.out.println(   DataUtils.getCode(8));
//
//
//    }

    /**
     * @Description 将字符串中的emoji表情转换成可以在utf-8字符集数据库中保存的格式（表情占4个字节，�?要utf8mb4字符集）
     * @param str
     *            待转换字符串
     * @return 转换后字符串
     * @throws UnsupportedEncodingException
     *             exception
     */
    public static String emojiConvert1(String str)
            throws UnsupportedEncodingException {
        String patternString = "([\\x{10000}-\\x{10ffff}\ud800-\udfff])";

        Pattern pattern = Pattern.compile(patternString);
        Matcher matcher = pattern.matcher(str);
        StringBuffer sb = new StringBuffer();
        while(matcher.find()) {
            try {
                matcher.appendReplacement(
                        sb,
                        "[["
                                + URLEncoder.encode(matcher.group(1),
                                "UTF-8") + "]]");
            } catch(UnsupportedEncodingException e) {

                throw e;
            }
        }
        matcher.appendTail(sb);
        return sb.toString();
    }

    /**
     * @Description 还原utf8数据库中保存的含转换后emoji表情的字符串
     * @param str
     *            转换后的字符�?
     * @return 转换前的字符�?
     * @throws UnsupportedEncodingException
     *             exception
     */
    public static String emojiRecovery2(String str)
            throws UnsupportedEncodingException {
        String patternString = "\\[\\[(.*?)\\]\\]";

        Pattern pattern = Pattern.compile(patternString);
        Matcher matcher = pattern.matcher(str);

        StringBuffer sb = new StringBuffer();
        while(matcher.find()) {
            try {
                matcher.appendReplacement(sb,
                        URLDecoder.decode(matcher.group(1), "UTF-8"));
            } catch(UnsupportedEncodingException e) {
                throw e;
            }
        }
        matcher.appendTail(sb);
        return sb.toString();
    }


}
