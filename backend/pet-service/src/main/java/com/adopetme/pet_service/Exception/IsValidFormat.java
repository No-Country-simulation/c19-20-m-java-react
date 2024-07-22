package com.adopetme.pet_service.Exception;

import java.util.Arrays;

import org.springframework.web.multipart.MultipartFile;

public class IsValidFormat {
    public boolean isValidFormat(MultipartFile file) {
        String[] validFormats = { "image/jpeg", "image/png", "image/jpg" };
        return Arrays.asList(validFormats).contains(file.getContentType());
    }
}
