package com.testify.back.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.testify.back.dto.request.board.PostBoardRequestDto;
import com.testify.back.dto.response.ResponseDto;
import com.testify.back.dto.response.board.GetBoardResponseDto;
import com.testify.back.dto.response.board.PostBoardResponseDto;
import com.testify.back.entity.BoardEntity;
import com.testify.back.entity.ImageEntity;
import com.testify.back.repository.BoardRepository;
import com.testify.back.repository.ImageRepository;
import com.testify.back.repository.UserRepository;
import com.testify.back.repository.resultSet.GetBoardResultSet;
import com.testify.back.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {
    
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    

    
    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNum) {

        GetBoardResultSet resultSet = null;
        List<ImageEntity> imageEntities = new ArrayList<>();
    
        try {
            
            resultSet = boardRepository.getBoard(boardNum);
            if(resultSet == null) {
                return GetBoardResponseDto.noExistBoard();
            }
            
            imageEntities = imageRepository.findByBoardNum(boardNum);
            
            BoardEntity boardEntity = boardRepository.findByBoardNum(boardNum);
            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetBoardResponseDto.success(resultSet, imageEntities);
    }


    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {

        try {
            boolean existedEmail = userRepository.existsByEmail(email);
            if (!existedEmail) return PostBoardResponseDto.notExistUser();

            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);

            int boardNum = boardEntity.getBoardNum();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            for (String image: boardImageList){
                ImageEntity imageEntity = new ImageEntity(boardNum, image);
                imageEntities.add(imageEntity);
            }

            imageRepository.saveAll(imageEntities);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

    return PostBoardResponseDto.success();
    }


}
