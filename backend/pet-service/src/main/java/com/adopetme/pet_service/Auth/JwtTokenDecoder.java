package com.adopetme.pet_service.Auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

public class JwtTokenDecoder {

    public static Integer getUserId(String token) {
        token = token.replace("Bearer ", "");
        DecodedJWT jwt = JWT.decode(token);
        Integer userId = jwt.getClaim("idUserDetails").asInt();
        return userId;
    }
}
