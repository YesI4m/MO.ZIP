package com.testify.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.testify.back.entity.CommentEntity;
import com.testify.back.repository.resultSet.GetCommentListResultSet;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer>{
    
    @Query(
        value = 
        "SELECT  " +
        "    U.nickname AS nickname, " +
        "    U.profile_image AS profileImage, " +
        "    C.datetime AS datetime, " +
        "    C.content AS content " +
        "FROM comment AS C " +
        "INNER JOIN user AS U " +
        "ON C.user_email = U.email " +
        "WHERE C.board_num = ?1 " +
        "ORDER BY datetime DESC",
        nativeQuery = true
    )
    List<GetCommentListResultSet> getCommentList(Integer boardNum);

}
