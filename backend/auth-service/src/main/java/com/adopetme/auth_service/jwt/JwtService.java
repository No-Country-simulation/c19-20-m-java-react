package com.adopetme.auth_service.jwt;

import com.adopetme.auth_service.exception.InvalidToken;
import com.adopetme.auth_service.model.AuthUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtService implements IJwtService {
    @Value("${jwt.secret}")
    private String secret;

    @PostConstruct
    protected void init(){
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    @Override
    public String createToken(AuthUser user) {
        return Jwts.builder()
                .subject(user.getUsername())
                .claim("rol",user.getRol().name())
                .claim("idUserDetails",user.getId_user_details())
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + 3600*1000))
                .signWith(this.getPrivateKey())
                .compact();
    }

    @Override
    public void validateToken(String token) {
        try {
            Jwts.parser().verifyWith(this.getPrivateKey()).build().parseSignedClaims(token);
        }catch (Exception e){
            throw new InvalidToken("El token es invalido: "+e.getMessage());
        }
    }

    @Override
    public boolean isAdmin(String token) {
        return Jwts.parser().verifyWith(this.getPrivateKey()).build().parseSignedClaims(token).getPayload().get("rol").equals("ADMIN");
    }

    @Override
    public SecretKey getPrivateKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }
}
