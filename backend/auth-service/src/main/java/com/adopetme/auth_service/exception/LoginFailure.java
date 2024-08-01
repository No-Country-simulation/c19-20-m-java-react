package com.adopetme.auth_service.exception;

public class LoginFailure extends RuntimeException{
    public LoginFailure(String message) {
        super(message);
    }
}
