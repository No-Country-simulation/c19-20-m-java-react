package com.adopetme.user_details_service.persistence.webclient;

import com.adopetme.user_details_service.domain.dto.Publication;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "publication-service" , url = "http://localhost:5060")
public interface PublicationServiceClient {

    @GetMapping("/publications/user/{userId}")
    ResponseEntity<List<Publication>> getPublicationsByUserId(@PathVariable("userId") Long userId);
}
