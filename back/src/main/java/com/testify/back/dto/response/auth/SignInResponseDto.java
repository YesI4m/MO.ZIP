package com.testify.back.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.testify.back.common.ResponseCode;
import com.testify.back.common.ResponseMessage;
import com.testify.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class SignInResponseDto extends ResponseDto{
    
    private String token;
    private int expirationTime;

    private SignInResponseDto(String token){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.token = token;
        this.expirationTime = 3600; // jwtprovider에 1시간으로 잡아놔서 3600분으로 지정
    }

    public static ResponseEntity<SignInResponseDto> success(String token) {
        SignInResponseDto result = new SignInResponseDto(token);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    
    public static ResponseEntity<ResponseDto> signInFailed(){
        ResponseDto result = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}
