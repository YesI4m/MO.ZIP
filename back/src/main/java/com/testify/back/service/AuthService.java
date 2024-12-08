package com.testify.back.service;

import org.springframework.http.ResponseEntity;

import com.testify.back.dto.request.auth.SignUpRequestDto;
import com.testify.back.dto.response.auth.SignUpResponseDto;

public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    
}
