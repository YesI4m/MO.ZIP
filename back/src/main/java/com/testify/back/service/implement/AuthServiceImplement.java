package com.testify.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.testify.back.dto.request.auth.SignInRequestDto;
import com.testify.back.dto.request.auth.SignUpRequestDto;
import com.testify.back.dto.response.ResponseDto;
import com.testify.back.dto.response.auth.SignInResponseDto;
import com.testify.back.dto.response.auth.SignUpResponseDto;
import com.testify.back.entity.UserEntity;
import com.testify.back.provider.JwtProvider;
import com.testify.back.repository.UserRepository;
import com.testify.back.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        
        try {
            String email = dto.getEmail();
            boolean existedEmail = userRepository.existsByEmail(email);
            if (existedEmail) return SignUpResponseDto.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existedNickName = userRepository.existsByNickname(nickname);
            if (existedNickName) return SignUpResponseDto.duplicateNickname();

            String telNum = dto.getTelNum();
            boolean existsByTelNum = userRepository.existsByTelNum(telNum);
            if (existsByTelNum) return SignUpResponseDto.duplicateTelNumber();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
    
        return SignUpResponseDto.success();

    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {

        String token = null;

        try {

            String email = dto.getEmail();
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return SignInResponseDto.signInFailed();

            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if (!isMatched) return SignInResponseDto.signInFailed();

            token = jwtProvider.create(email);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(token);
    }
    
}
