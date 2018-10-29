package com.honey.util;

import javax.crypto.Cipher;
import java.security.Key;

public class DESCodec {

    /**
     * 将byte数组转换为表�?16进制值的字符串， 如：byte[]{8,18}转换为：0813�? 和public static byte[]
     * hexStr2ByteArr(String strIn) 互为可�?�的转换过程
     *
     * @param arrB �?要转换的byte数组
     * @return 转换后的字符�?
     * @throws Exception
     */
    public static String byteArr2HexStr(byte[] arrB) throws Exception {
        int iLen = arrB.length;
        // 每个byte用两个字符才能表示，�?以字符串的长度是数组长度的两�?
        StringBuffer sb = new StringBuffer(iLen * 2);
        for (int i = 0; i < iLen; i++) {
            int intTmp = arrB[i];
            // 把负数转换为正数
            while (intTmp < 0) {
                intTmp = intTmp + 256;
            }
            // 小于0F的数�?要在前面�?0
            if (intTmp < 16) {
                sb.append("0");
            }
            sb.append(Integer.toString(intTmp, 16));
        }
        return sb.toString();
    }

    /**
     * 将表�?16进制值的字符串转换为byte数组�? 和public static String byteArr2HexStr(byte[] arrB)
     * 互为可�?�的转换过程
     *
     * @param strIn �?要转换的字符�?
     * @return 转换后的byte数组
     * @throws Exception
     */
    public static byte[] hexStr2ByteArr(String strIn) throws Exception {
        byte[] arrB = strIn.getBytes();
        int iLen = arrB.length;

        // 两个字符表示�?个字节，�?以字节数组长度是字符串长度除�?2
        byte[] arrOut = new byte[iLen / 2];
        for (int i = 0; i < iLen; i = i + 2) {
            String strTmp = new String(arrB, i, 2);
            arrOut[i / 2] = (byte) Integer.parseInt(strTmp, 16);
        }
        return arrOut;
    }

    /**
     * 加密字符�?
     *
     * @param strIn �?加密的字符串
     * @return 加密后的字符�?
     * @throws Exception
     */
    public static String encrypt(String strIn, String key) throws Exception {
        Key k = getKey(key.getBytes());

        Cipher encryptCipher = Cipher.getInstance("DES");
        encryptCipher.init(Cipher.ENCRYPT_MODE, k);

        byte[] bytes = encryptCipher.doFinal(strIn.getBytes());
        return byteArr2HexStr(bytes);
    }

    /**
     * 解密字符�?
     *
     * @param strIn �?解密的字符串
     * @return 解密后的字符�?
     * @throws Exception
     */
    public static String decrypt(String strIn, String key) throws Exception {
        Key k = getKey(key.getBytes());

        Cipher decryptCipher = Cipher.getInstance("DES");
        decryptCipher.init(Cipher.DECRYPT_MODE, k);

        byte[] bytes = decryptCipher.doFinal(hexStr2ByteArr(strIn));

        return new String(bytes);
    }

    /**
     * 从指定字符串生成密钥，密钥所�?的字节数组长度为8�? 不足8位时后面�?0，超�?8位只取前8�?
     *
     * @param arrBTmp 构成该字符串的字节数�?
     * @return 生成的密�?
     * @throws Exception
     */
    private static Key getKey(byte[] arrBTmp) throws Exception {
        // 创建�?个空�?8位字节数组（默认值为0�?
        byte[] arrB = new byte[8];

        // 将原始字节数组转换为8�?
        for (int i = 0; i < arrBTmp.length && i < arrB.length; i++) {
            arrB[i] = arrBTmp[i];
        }

        // 生成密钥
        Key key = new javax.crypto.spec.SecretKeySpec(arrB, "DES");

        return key;
    }

    //
//    public static void main(String[] args) {
//        try {
////            System.out.println(DESCodec.encrypt("1", Constants.DES_KEY));
////            System.out.println(Md5Utils.toMd5("1"));
////            System.out.println(Md5Utils.toMd5("123456a"));
////            System.out.println(DESCodec.encrypt("123456", Constants.DES_KEY));
////            SimpleDateFormat format = new SimpleDateFormat("YY-MM-dd HH:mm:ss");
////            Date date = new Date(1469018238680L);
////            String dateTime = format.format(date);
////            System.out.print(System.currentTimeMillis());
////            Long.parseLong(null);
//            String a="12345";
//            String b=a+"sadfa";
//            System.out.print(b.substring(a.length(),b.length()));
//        } catch (Exception e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//    }


//    public static void main(String[] args) throws Exception {
//
//       System.out.print(DESCodec.encrypt("123456",Constants.DES_KEY));
//    }
}
