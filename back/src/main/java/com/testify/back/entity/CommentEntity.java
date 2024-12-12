package com.testify.back.entity;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import com.testify.back.dto.request.board.PostCommentRequestDto;

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
@Entity(name="comment")
@Table(name="comment")
public class CommentEntity {
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentNum;
    private String content;
    private String datetime;
    private String userEmail;
    private int boardNum;


    public CommentEntity(PostCommentRequestDto dto, Integer boardNum, String email){

        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDatetime = simpleDateFormat.format(now);

        this.content = dto.getContent();
        this.datetime = writeDatetime;
        this.userEmail = email;
        this.boardNum = boardNum;
    }

}
