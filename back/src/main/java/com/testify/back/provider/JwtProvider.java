package com.testify.back.provider;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

//의존성 주입
@Component
public class JwtProvider {

    //키 생성
    private String secretKey = "SecretKey";

    public String create(String email){
        // 만료기간 = 현재시간 + 1시간
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS) );
        // jwt 생성
        String jwt = Jwts.builder()
        // HS256 알고리즘 사용, 만들어놓은 secret 키 사용
            .signWith(SignatureAlgorithm.HS256, secretKey)
        // 주체 : email,        생성시간 : 현재시간       만료시간 : 위에서 정한 만료시간
            .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
        // 만들기
            .compact();

        return jwt;

    }
    // 검증
    public String validate(String jwt){
        Claims claims = null;
        try{
            claims = Jwts.parser().setSigningKey(secretKey)
                .parseClaimsJws(jwt).getBody();
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
        return claims.getSubject();
    }

}
