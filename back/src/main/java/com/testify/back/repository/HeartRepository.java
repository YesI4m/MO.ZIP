package com.testify.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.testify.back.entity.HeartEntity;
import com.testify.back.entity.primaryKey.HeartPk;
import com.testify.back.repository.resultSet.GetHeartListResultSet;


@Repository
public interface HeartRepository extends JpaRepository<HeartEntity, HeartPk> {
    HeartEntity findByBoardNumAndUserEmail(Integer boardNum, String userEmail);

    @Query(
        value = 
        "SELECT " +
        "    U.email AS email, " +
        "    U.nickname AS nickname, " +
        "    U.profile_image AS profileImage " +
        "FROM heart AS H " +
        "INNER JOIN user AS U " +
        "ON H.user_email = U.email " +
        "WHERE H.board_num = ?1",
        nativeQuery = true
    )
    List<GetHeartListResultSet> getHeartList(Integer boardNum);
}

