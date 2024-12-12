package com.testify.back.service;

import org.springframework.http.ResponseEntity;

import com.testify.back.dto.request.board.PostBoardRequestDto;
import com.testify.back.dto.response.board.GetBoardResponseDto;
import com.testify.back.dto.response.board.GetHeartListResponseDto;
import com.testify.back.dto.response.board.PostBoardResponseDto;
import com.testify.back.dto.response.board.PutHeartResponseDto;


public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNum);

    ResponseEntity<? super GetHeartListResponseDto> getHeartList(Integer boradNum);

    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email); 

    ResponseEntity<? super PutHeartResponseDto> putHeart(Integer boardNum, String email);
    
}
