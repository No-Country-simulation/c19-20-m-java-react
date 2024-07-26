package com.adopetme.pet_service.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adopetme.pet_service.Client.AuthFeignClient;
import com.adopetme.pet_service.Dto.RequestDTO;

@Service
public class AuthService {

    @Autowired
    private AuthFeignClient authFeignClient;

    public boolean validate(String token, RequestDTO request) {
        return authFeignClient.validate(token, request).getStatusCode().is2xxSuccessful();
    }

}
