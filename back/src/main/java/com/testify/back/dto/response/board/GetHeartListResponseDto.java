package com.testify.back.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.testify.back.common.ResponseCode;
import com.testify.back.common.ResponseMessage;
import com.testify.back.dto.object.HeartListItem;
import com.testify.back.dto.response.ResponseDto;
import com.testify.back.repository.resultSet.GetHeartListResultSet;

import lombok.Getter;

@Getter
public class GetHeartListResponseDto extends ResponseDto{
    
    private List<HeartListItem> heartList;

    private GetHeartListResponseDto(List<GetHeartListResultSet> resultSets){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.heartList = HeartListItem.copyList(resultSets);
    }

    public static ResponseEntity<GetHeartListResponseDto> success(List<GetHeartListResultSet> resultSets){
        GetHeartListResponseDto result = new GetHeartListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> noExistBoard(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
