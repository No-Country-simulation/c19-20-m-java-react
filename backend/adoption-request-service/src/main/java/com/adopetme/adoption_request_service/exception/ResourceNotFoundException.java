package com.adopetme.adoption_request_service.exception;


public class ResourceNotFoundException extends RuntimeException{

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String publication, String id, Long id1) {
    }
}
