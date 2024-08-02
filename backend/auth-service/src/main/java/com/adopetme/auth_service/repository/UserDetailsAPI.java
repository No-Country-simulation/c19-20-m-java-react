package com.adopetme.auth_service.repository;

import com.adopetme.auth_service.dto.UserDetailsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "userdetailsapi")
public interface UserDetailsAPI {
    @PostMapping("/save")
    int save(@RequestBody UserDetailsDTO userDetails);
}
