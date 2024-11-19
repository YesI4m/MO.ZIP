package com.testify.back.common;

public interface ResponseCode {
    
    String SUCCESS = "SU";
    String VALIDATION_FAILED = "VF";
    String DUPLICATE_EMAIL = "DE";
    String DUPLICATE_TEL_NUMBER = "DT";
    String DUPLICATE_NICKNAME = "DN";
    String NOT_EXISTED_USER = "NU";
    String NOT_EXISTED_BOARD = "NB";
    String SIGN_IN_FAIL = "SF";
    String AUTHORIZATION_FAIL = "AF";
    String NO_PERMISSION = "NP";
    String DATABASE_ERROR = "DBE";

}
