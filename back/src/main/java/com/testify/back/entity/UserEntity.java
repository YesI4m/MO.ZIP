package com.testify.back.entity;

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
    
}
