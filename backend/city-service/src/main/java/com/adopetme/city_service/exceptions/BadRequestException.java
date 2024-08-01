package com.adopetme.city_service.exceptions;

import lombok.Data;

@Data
public class BadRequestException extends RuntimeException{

    public BadRequestException(String message) {
        super(message);
    }
}