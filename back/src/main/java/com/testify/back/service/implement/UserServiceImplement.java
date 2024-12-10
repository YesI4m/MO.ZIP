package com.testify.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.testify.back.dto.response.ResponseDto;
import com.testify.back.dto.response.user.GetSignInUserResponseDto;
import com.testify.back.entity.UserEntity;
import com.testify.back.repository.UserRepository;
import com.testify.back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

    private final UserRepository userRespository;

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
        
        UserEntity userEntity = null;

        try {
            userEntity = userRespository.findByEmail(email);
            if (userEntity == null) return GetSignInUserResponseDto.notExistUser();
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return GetSignInUserResponseDto.success(userEntity);
    }
    
}
