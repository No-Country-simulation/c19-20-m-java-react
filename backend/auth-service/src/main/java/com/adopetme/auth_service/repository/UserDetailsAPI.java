package com.adopetme.auth_service.repository;

import com.adopetme.auth_service.dto.UserDetailsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "userdetailsapi", url = "http://localhost:433/users_details")
public interface UserDetailsAPI {
    @PostMapping("/save")
    int save (@RequestBody UserDetailsDTO userDetails);
}
