package com.adopetme.auth_service.service;

import com.adopetme.auth_service.dto.*;
import com.adopetme.auth_service.enums.Rol;
import com.adopetme.auth_service.model.AuthUser;
import com.adopetme.auth_service.repository.AuthUserRepository;
import com.adopetme.auth_service.repository.UserDetailsAPI;
import com.adopetme.auth_service.security.JwtProvider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthUserService {

    @Autowired
    private AuthUserRepository authUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserDetailsAPI userDetailsAPI;

    public AuthUser save(NewUserDTO dto) {
        Optional<AuthUser> user = authUserRepository.findByUsername(dto.getUsername());

        if (user.isPresent()) {
            return null;
        }

        ModelMapper modelMapper = new ModelMapper();
        UserDetailsDTO userDetailsDTO = modelMapper.map(dto, UserDetailsDTO.class);

        String password = passwordEncoder.encode(dto.getPassword());
        AuthUser authUser = AuthUser.builder()
                .username(dto.getUsername())
                .password(password)
                .rol(Rol.valueOf(dto.getRol().toUpperCase()))
                //.id_user_details(userDetailsAPI.save(userDetailsDTO))
                .build();
        
        return authUserRepository.save(authUser);
    }

    public TokenDTO login(AuthUserDTO dto) {
        Optional<AuthUser> user = authUserRepository.findByUsername(dto.getUsername());

        if (!user.isPresent()) {
            return null;
        }

        if (passwordEncoder.matches(dto.getPassword(), user.get().getPassword())) {
            return new TokenDTO(jwtProvider.createToken(user.get()));
        }

        return null;
    }

    public TokenDTO validate(String token, RequestDTO requestDTO) {
        if (!jwtProvider.validateToken(token, requestDTO)) {
            return null;
        }

        String username = jwtProvider.getUsernameFromToken(token);

        if (!authUserRepository.findByUsername(username).isPresent()) {
            return null;
        }

        return new TokenDTO(token);
    }
}
