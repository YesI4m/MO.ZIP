package com.testify.back.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.testify.back.provider.JwtProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

// ioc를 통해 di할수 있도록 컴포넌트로 등록
@Component
// 필수 생성자를 만들어줌 <= final로 지정된거
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final JwtProvider jwtProvider;

    // jwtauthenticationfilter의 implemented methods
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {



    }

    // 헤더의 인증키를 찾아 bearer인증인지 확인
    private String parseBearerToken(HttpServletRequest request){
        String authorization = request.getHeader("Authorization");
        // hasText는 null이거나 공백으로 들어가있으면 false 반환
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer");
        if (!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }
}
