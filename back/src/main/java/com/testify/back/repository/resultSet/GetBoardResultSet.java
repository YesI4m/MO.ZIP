package com.testify.back.repository.resultSet;

public interface GetBoardResultSet {
    Integer getBoardNum();
    String getTitle();
    String getContent();
    String getWriteDatetime();
    String getWriterEmail();
    String getWriterNickname();
    String getWriterProfileImage();
}
