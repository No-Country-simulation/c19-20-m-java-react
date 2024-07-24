package com.adopetme.auth_service.security;

import com.adopetme.auth_service.dto.RequestDTO;
import com.adopetme.auth_service.model.AuthUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtProvider {
    @Value("${jwt.secret}")
    private String secret;

    @Autowired
    RouteValidator routeValidator;

    @PostConstruct
    protected void init() {
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String createToken(AuthUser authUser) {
        return Jwts.builder()
                .signWith(this.getPrivateKey(secret))
                .setSubject(authUser.getUsername())
                .claim("role", authUser.getRol().name())
                .claim("id_user_details", authUser.getId_user_details())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 3600 * 1000))
                .compact();

    }

    public Boolean validateToken(String token, RequestDTO requestDTO) {
        try {
            Jwts.parser().setSigningKey(this.getPrivateKey(secret)).build().parseClaimsJws(token);
        } catch (Exception e) {
            return false;
        }

        if (!isAdmin(token) && routeValidator.isAdminPath(requestDTO)) {
            return false;
        }

        return true;
    }

    public String getUsernameFromToken(String token) {
        try {
            return Jwts.parser().setSigningKey(this.getPrivateKey(secret)).build().parseClaimsJws(token).getBody().getSubject();
        } catch (Exception e) {
            return "bad token";
        }
    }

    private boolean isAdmin(String token) {
        return Jwts.parser().setSigningKey(this.getPrivateKey(secret)).build().parseClaimsJws(token).getBody().get("role").equals("ADMIN");
    }

    private Key getPrivateKey(String secret) {
        byte[] secretBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(secretBytes);
    }
}
