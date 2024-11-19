package com.testify.back.common;

public interface ResponseMessage {
    
    String SUCCESS = "Success";
    String VALIDATION_FAILED = "Validation Failed";
    String DUPLICATE_EMAIL = "Duplicate Email";
    String DUPLICATE_TEL_NUMBER = "Duplicate Tel Number";
    String DUPLICATE_NICKNAME = "Duplicate Nickname";
    String NOT_EXISTED_USER = "This User does NOT exist";
    String NOT_EXISTED_BOARD = "This Board does NOt exist";
    String SIGN_IN_FAIL = "Login Information Mismatch";
    String AUTHORIZATION_FAIL = "Authorization Fail";
    String NO_PERMISSION = "Do NOT have Permission";
    String DATABASE_ERROR = "Database ERROR";

}
