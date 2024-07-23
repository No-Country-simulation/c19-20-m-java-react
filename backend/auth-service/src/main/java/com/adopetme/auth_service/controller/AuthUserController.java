package com.adopetme.auth_service.controller;

import com.adopetme.auth_service.service.AuthUserService;
import com.adopetme.auth_service.dto.AuthUserDTO;
import com.adopetme.auth_service.dto.NewUserDTO;
import com.adopetme.auth_service.dto.RequestDTO;
import com.adopetme.auth_service.dto.TokenDTO;
import com.adopetme.auth_service.model.AuthUser;
import com.adopetme.auth_service.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthUserController {
    @Autowired
    private AuthUserService authUserService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthUserDTO dto) {
        TokenDTO tokenDTO = authUserService.login(dto);
        if (tokenDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(tokenDTO);
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestParam String token, @RequestBody RequestDTO requestDTO) {
        TokenDTO tokenDTO = authUserService.validate(token, requestDTO);
        if (tokenDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(tokenDTO);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody NewUserDTO dto) {
        AuthUser authUser = authUserService.save(dto);
        if (authUser == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(authUser);
    }
}
