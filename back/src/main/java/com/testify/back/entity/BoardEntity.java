package com.testify.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="board")
@Table(name="board")
public class BoardEntity {
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNum;
    private String title;
    private String content;
    private String datetime;
    private int like_count;
    private int comment_count;
    private int view_count;
    private String writer_email;

}
