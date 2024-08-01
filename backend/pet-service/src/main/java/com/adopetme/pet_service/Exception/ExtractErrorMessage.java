package com.adopetme.pet_service.Exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import feign.FeignException;

public class ExtractErrorMessage {
    public static String extractErrorMessage(FeignException e) {
        String errorMessage = e.getMessage();
        System.out.println("Original error message: " + errorMessage);
        try {
            int startIndex = errorMessage.indexOf("{");
            int endIndex = errorMessage.lastIndexOf("}") + 1;
            if (startIndex != -1 && endIndex != -1 && endIndex > startIndex) {
                String responseBody = errorMessage.substring(startIndex, endIndex);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode actualObj = mapper.readTree(responseBody);
                JsonNode dataNode = actualObj.get("data");
                if (dataNode != null && dataNode.isArray() && dataNode.size() > 0) {
                    JsonNode firstErrorNode = dataNode.get(0);
                    errorMessage = firstErrorNode.get("message").asText();
                }
            }
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }
        return errorMessage;
    }
}
