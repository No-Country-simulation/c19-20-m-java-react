package com.adopetme.country_service.exceptions;

import lombok.Data;

@Data
public class CountryNotFoundException extends RuntimeException{
    public CountryNotFoundException(String message) {
        super(message);
    }
}
