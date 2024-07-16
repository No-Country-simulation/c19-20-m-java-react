package com.adopetme.pet_service.Dto;

import java.util.List;

public record GenericResponseRecord<T>(
        int status,
        String message,
        List<T> data) {

}
