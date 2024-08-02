package com.adopetme.user_details_service.domain.exception;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException( String message) {
        super(message);
    }
}
