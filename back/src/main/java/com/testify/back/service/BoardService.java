package com.testify.back.service;

import org.springframework.http.ResponseEntity;

import com.testify.back.dto.request.board.PostBoardRequestDto;
import com.testify.back.dto.response.board.GetBoardResponseDto;
import com.testify.back.dto.response.board.PostBoardResponseDto;


public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNum);
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);    
}
