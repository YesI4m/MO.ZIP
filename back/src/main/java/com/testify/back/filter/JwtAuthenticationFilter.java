package com.testify.back.filter;

import java.io.IOException;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.testify.back.provider.JwtProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
            String authorization = request.getHeader("Authorization");
            System.out.println("Authorization header: " + authorization);

            
        try {
                
            String token = parseBearerToken(request);
            if (token == null) {
                System.out.println("No token found in request.");
                filterChain.doFilter(request, response);
                return;
            }

            String email = jwtProvider.validate(token);
            
            if (email == null){
                System.out.println("Invalid or expired JWT token.");
                filterChain.doFilter(request, response);
                return;
            }

            System.out.println("Valid token for user: " + email);

            AbstractAuthenticationToken authenticationToken = 
            new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            
            System.out.println("Authentication token created for: " + email);

            SecurityContext SecurityContext = SecurityContextHolder.createEmptyContext();
            SecurityContext.setAuthentication(authenticationToken);

            SecurityContextHolder.setContext(SecurityContext);

            System.out.println("SecurityContext set for user: " + email);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error in JWT filter: " + e.getMessage());
    }
    
    filterChain.doFilter(request, response);

    }

    private String parseBearerToken(HttpServletRequest request){
        String authorization = request.getHeader("Authorization");
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization) {
        return null;}

        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }
}
