package com.adopetme.auth_service.exception;

public class InvalidToken extends RuntimeException {
    public InvalidToken(String message) {
        super(message);
    }
}
