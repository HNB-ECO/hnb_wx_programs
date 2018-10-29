package com.honey.util;

import java.nio.charset.Charset;
import java.util.Arrays;

public class WxPKCS7Encoder {

    private static final Charset CHARSET = Charset.forName("utf-8");
    private static final int BLOCK_SIZE = 32;

    /**
     * 获得对明文进行补位填充的字节.
     *
     * @param count �?要进行填充补位操作的明文字节个数
     * @return 补齐用的字节数组
     */
    public static byte[] encode(int count) {
        // 计算�?要填充的位数
        int amountToPad = BLOCK_SIZE - (count % BLOCK_SIZE);
        if (amountToPad == 0) {
            amountToPad = BLOCK_SIZE;
        }
        // 获得补位�?用的字符
        char padChr = chr(amountToPad);
        String tmp = new String();
        for (int index = 0; index < amountToPad; index++) {
            tmp += padChr;
        }
        return tmp.getBytes(CHARSET);
    }

    /**
     * 删除解密后明文的补位字符
     *
     * @param decrypted 解密后的明文
     * @return 删除补位字符后的明文
     */
    public static byte[] decode(byte[] decrypted) {
        int pad = decrypted[decrypted.length - 1];
        if (pad < 1 || pad > 32) {
            pad = 0;
        }
        return Arrays.copyOfRange(decrypted, 0, decrypted.length - pad);
    }

    /**
     * 将数字转化成ASCII码对应的字符，用于对明文进行补码
     *
     * @param a �?要转化的数字
     * @return 转化得到的字�?
     */
    public static char chr(int a) {
        byte target = (byte) (a & 0xFF);
        return (char) target;
    }
}
