package com.honey.util;

public class QiniuToken {

    public static void main(String[] args) {
        String accessKey = "vWxd-w1ipbuT3vMkHA8mRblGnFpJ9AlWYmCyTPRx";
        String secretKey = "hLEEcpZ4LP78Kqq3lNe-4_rtf3fhm03HgdJiNYQ3";
        String space = "hnbblock";
        int effectiveTime = 10;
        String token = Auth.create(accessKey, secretKey).uploadToken(space, null, 1000 * 3600 * 24 * 365 * effectiveTime, null);
        System.out.println(token);
    }
}
