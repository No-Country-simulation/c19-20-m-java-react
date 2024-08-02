package com.adopetme.state_service.exceptions;

import lombok.Data;

@Data
public class StateNotFoundException extends RuntimeException{
    public StateNotFoundException(String message) {
        super(message);
    }
}
