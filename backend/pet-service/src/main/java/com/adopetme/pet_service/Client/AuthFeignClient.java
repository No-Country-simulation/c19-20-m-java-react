package com.adopetme.pet_service.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.adopetme.pet_service.Dto.AuthUserDTO;
import com.adopetme.pet_service.Dto.NewUserDTO;
import com.adopetme.pet_service.Dto.RequestDTO;

@FeignClient(name = "auth-service", url = "http://localhost:5062")
public interface AuthFeignClient {

    @PostMapping(value = "/auth/validate")
    ResponseEntity<?> validate(@RequestParam String token, @RequestBody RequestDTO requestDTO);

    @PostMapping(value = "/auth/login")
    ResponseEntity<?> login(@RequestBody AuthUserDTO dto);

    @PostMapping(value = "/auth/create")
    ResponseEntity<?> create(@RequestBody NewUserDTO dto);
}
