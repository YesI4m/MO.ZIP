package com.testify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.testify.back.entity.HeartEntity;
import com.testify.back.entity.primaryKey.HeartPk;

@Repository
public interface HeartRepository extends JpaRepository<HeartEntity, HeartPk> {
    
}
