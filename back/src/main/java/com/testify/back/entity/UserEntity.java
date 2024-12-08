package com.testify.back.entity;

import com.testify.back.dto.request.auth.SignUpRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity(name="user")
@Table(name="user")
public class UserEntity {

    @Id
    private String email;
    private String nickname;
    private String telNum;
    private String address;
    private String addressDetail;
    private String profileImage;
    private boolean agreedPersonal;

    public UserEntity(SignUpRequestDto dto){
        this.email = dto.getEmail();
        this.nickname = dto.getNickname();
        this.telNum = dto.getTelNum();
        this.address = dto.getAddress();
        this.addressDetail = dto.getAddressDetail();
        this.agreedPersonal = dto.getAgreedPersonal();
    }
    
}
