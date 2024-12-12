package com.testify.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testify.back.dto.request.board.PostBoardRequestDto;
import com.testify.back.dto.response.board.GetBoardResponseDto;
import com.testify.back.dto.response.board.GetHeartListResponseDto;
import com.testify.back.dto.response.board.PostBoardResponseDto;
import com.testify.back.dto.response.board.PutHeartResponseDto;
import com.testify.back.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/board")
@RequiredArgsConstructor
public class BoardController {
    
    private final BoardService boardService;

    @GetMapping("/{boardNum}")
    public ResponseEntity<? super GetBoardResponseDto> getBoard(
        @PathVariable("boardNum") Integer boardNum
    ){
        ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(boardNum);
        return response;
    }

    @GetMapping("/{boardNum}/heart-list")
    public ResponseEntity<? super GetHeartListResponseDto> getHeartList(
        @PathVariable("boardNum") Integer boardNum
    ){
        ResponseEntity<? super GetHeartListResponseDto> response = boardService.getHeartList(boardNum);
        return response;
    }
    
    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(
        @RequestBody @Valid PostBoardRequestDto requestBody,
        @AuthenticationPrincipal String email
    ){
        ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody, email);
        return response;
    }
    
    @PutMapping("/{boardNum}/heart")
    public ResponseEntity<? super PutHeartResponseDto> putHeart(
        @PathVariable("boardNum") Integer boardNum,
        @AuthenticationPrincipal String email
        ){
        ResponseEntity<? super PutHeartResponseDto> response = boardService.putHeart(boardNum, email);
        return response;
    }

}
