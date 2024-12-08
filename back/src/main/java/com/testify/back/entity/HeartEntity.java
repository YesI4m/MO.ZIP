package com.testify.back.entity;

import com.testify.back.entity.primaryKey.HeartPk;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="heart")
@Table(name="heart")
@IdClass(HeartPk.class)
public class HeartEntity {
    @Id
    private String userEmail;
    @Id
    private int boardNum;
}
