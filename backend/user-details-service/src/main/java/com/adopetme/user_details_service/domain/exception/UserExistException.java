package com.adopetme.user_details_service.domain.exception;

public class UserExistException extends RuntimeException {
    public UserExistException( String message) {
        super(message);
    }
}
