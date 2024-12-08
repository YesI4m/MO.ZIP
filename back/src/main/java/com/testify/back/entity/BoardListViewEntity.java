package com.testify.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="board_list_view")
@Table(name="board_list_view")
public class BoardListViewEntity {
    
    @Id
    private int boardNum;
    private String title;
    private String content;
    private String datetime;
    private String titleImage;
    private int likeCount;
    private int commentCount;
    private int viewCount;
    private String email;
    private String nickname;
    private String profileImage;

}
