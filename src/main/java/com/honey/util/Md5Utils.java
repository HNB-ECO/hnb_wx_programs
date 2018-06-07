package com.honey.util;

import java.security.MessageDigest;

/**
 * Created by xingfinal on 16/1/20.
 */
public class Md5Utils {

    /**
     * 字符串MD5加密
     *
     * @param str 待加密的字符�?
     * @return 加密后的字符�?
     */
    public static String toMd5(String str) {
        MessageDigest md5 = null;
        try {
            md5 = MessageDigest.getInstance("MD5");
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        char[] charArray = str.toCharArray();
        byte[] byteArray = new byte[charArray.length];

        for (int i = 0; i < charArray.length; i++)
            byteArray[i] = (byte) charArray[i];
        byte[] md5Bytes = md5.digest(byteArray);
        StringBuffer hexValue = new StringBuffer();
        for (int i = 0; i < md5Bytes.length; i++) {
            int val = ((int) md5Bytes[i]) & 0xff;
            if (val < 16)
                hexValue.append("0");
            hexValue.append(Integer.toHexString(val));
        }
        return hexValue.toString();

    }


    public static void main(String[] s){
        String sss = "123456";
         System.out.print(toMd5(sss));
    }
}
