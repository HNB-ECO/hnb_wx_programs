package com.honey.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * JWT工具�?
 *
 * @author Shixing
 */
@Component
public class TokenUtils {

    private static final String JWT_CLAIMS_ROLES = "roles";

    @Value("${eva.token.secret}")
    private String secretKey;

    @Value("${eva.token.expiration}")
    private long expiration;

    /**
     * 从Token中获取用户名
     *
     * @param token JWT
     * @return 返回用户�?
     */
    public String getUsernameFromToken(String token) {
        String username;
        try {
            username = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    /**
     * 从Token中获取过期时�?
     *
     * @param token JWT
     * @return 返回过期日期
     */
    private Date getExpirationDate(String token) {
        Date expiration;
        try {
            expiration = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration;
    }

    /**
     * 生成JWT
     *
     * @param username 用户�?
     * @param role     用户角色
     * @return 返回JWT
     */
    public String generateToken(String username, String role) {
        Claims claims = Jwts.claims();
        claims.put(JWT_CLAIMS_ROLES, role);
        claims.setSubject(username);
        claims.setIssuer(username);
//        claims.setExpiration(new Date(curTime + expiration * 1000));
        claims.setIssuedAt(new Date(0L));
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    /**
     * 验证Token
     *
     * @param token    JWT
     * @param username 用户�?
     * @param role     用户角色
     * @return 是否验证成功(true/false)
     */
    public boolean validateToken(String token, String username, String role) {
//        final Date expiration = getExpirationDate(token);
        return getUsernameFromToken(token).equals(username)
//                && expiration.after(new Date(System.currentTimeMillis()))
                && generateToken(username, role).equals(token);
    }

    /**
     * 从Token中获取Claims，详见Json Web Token规范
     *
     * @param token JWT
     * @return 返回Claims
     */
    public Claims getClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey)
                .parseClaimsJws(token).getBody();
    }

    /**
     * 获取用户�?
     *
     * @param claims JWT-Claims
     * @return 返回用户�?
     */
    public String getUsername(Claims claims) {
        return claims.getIssuer();
    }

    /**
     * 获取用户角色
     *
     * @param claims JWT-Claims
     * @return 返回用户角色
     */
    public String getRoles(Claims claims) {
        Object rolesObj = claims.get(JWT_CLAIMS_ROLES);
        if (rolesObj != null) {
            return (String) rolesObj;
        }
        return null;
    }
}
