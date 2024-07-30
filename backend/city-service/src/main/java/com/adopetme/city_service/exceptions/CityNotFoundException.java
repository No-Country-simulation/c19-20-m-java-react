package com.adopetme.city_service.exceptions;

import lombok.Data;

@Data
public class CityNotFoundException extends RuntimeException{
    public CityNotFoundException(String message) {
        super(message);
    }
}
