package com.testify.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.testify.back.entity.SearchLogEntity;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer>{
    
}
