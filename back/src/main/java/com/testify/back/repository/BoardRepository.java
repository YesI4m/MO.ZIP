package com.testify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.testify.back.entity.BoardEntity;
import com.testify.back.repository.resultSet.GetBoardResultSet;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>{

    boolean existsByBoardNum(Integer boardNum);

    BoardEntity findByBoardNum(Integer boardNum);

    @Query(
        value = 
            "SELECT " + 
                "B.board_num AS boardNum, " +
                "B.title AS title, " +
                "B.content AS content, " +
                "B.datetime AS writeDatetime, " +
                "B.like_count AS likeCount, " +
                "B.comment_count AS commentCount, " +
                "B.view_count AS viewCount, " +
                "B.writer_email AS writerEmail, " +
                "U.nickname AS writerNickname, " +
                "U.profile_image AS writerProfileImage " +
            "FROM board AS B " +
            "INNER JOIN user AS U " +
            "ON B.writer_email = U.email "+
            "WHERE board_num = ?1 ",
            nativeQuery = true
    )
    GetBoardResultSet getBoard(Integer boardNum);
    
}
