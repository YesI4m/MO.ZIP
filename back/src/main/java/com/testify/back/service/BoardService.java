package com.testify.back.service;

import org.springframework.http.ResponseEntity;

import com.testify.back.dto.request.board.PostBoardRequestDto;
import com.testify.back.dto.response.board.PostBoardResponseDto;


public interface BoardService {
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);    
}
