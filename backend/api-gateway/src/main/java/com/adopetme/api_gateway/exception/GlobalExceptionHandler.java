package com.adopetme.api_gateway.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(InvalidToken.class)
    public ResponseEntity<CustomErrorResponse> runtimeExceptionHandler(InvalidToken ex) {
        CustomErrorResponse error = CustomErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.UNAUTHORIZED.value())
                .error("Not Authorized")
                .message(ex.getMessage())
                .path("/api-gateway")
                .build();
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
}
