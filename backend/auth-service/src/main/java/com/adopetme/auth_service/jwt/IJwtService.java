package com.adopetme.auth_service.jwt;

import com.adopetme.auth_service.model.AuthUser;

import javax.crypto.SecretKey;

public interface IJwtService {
    //PRINCIPAL
    String createToken(AuthUser user);
    void validateToken(String token);

    //EXTRAS
    SecretKey getPrivateKey();
    boolean isAdmin(String token);
}
