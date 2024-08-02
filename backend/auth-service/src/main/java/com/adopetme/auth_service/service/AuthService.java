package com.adopetme.auth_service.service;

import com.adopetme.auth_service.configuration.RouteValidator;
import com.adopetme.auth_service.dto.AuthUserDTO;
import com.adopetme.auth_service.dto.NewUserDTO;
import com.adopetme.auth_service.dto.RequestDTO;
import com.adopetme.auth_service.dto.UserDetailsDTO;
import com.adopetme.auth_service.enums.Rol;
import com.adopetme.auth_service.exception.CheckExistenceException;
import com.adopetme.auth_service.exception.InvalidToken;
import com.adopetme.auth_service.exception.LoginFailure;
import com.adopetme.auth_service.jwt.IJwtService;
import com.adopetme.auth_service.model.AuthUser;
import com.adopetme.auth_service.repository.AuthUserRepository;
import com.adopetme.auth_service.repository.UserDetailsAPI;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService implements IAuthService {

    private static final String FOUND = "El usuario que desea %s ya existe.";
    private static final String UNAUTHORIZED = "Su credenciales de inicio de sesion no son correctas.";

    @Autowired
    private AuthUserRepository authUserRepository;

    @Autowired
    private UserDetailsAPI userDetailsAPI;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IJwtService jwtService;

    @Autowired
    private RouteValidator routeValidator;

    @Override
    public AuthUser create(NewUserDTO dto) {
        checkExistence(dto.getUsername(), FOUND, "registrar");

        UserDetailsDTO userDetailsDTO = modelMapper.map(dto, UserDetailsDTO.class);
        userDetailsDTO.setCountry("Argentina");
        userDetailsDTO.setState("Misiones");
        userDetailsDTO.setCity("Posadas");
        userDetailsDTO.setFirstName(dto.getUsername());
        userDetailsDTO.setLastName(dto.getLastname());
        AuthUser authUser = AuthUser.builder()
                .username(dto.getUsername())
                .password(passwordEncoder.encode(dto.getPassword()))
                .rol(Rol.valueOf(dto.getRol().toUpperCase()))
                .id_user_details(userDetailsAPI.save(userDetailsDTO))
                .build();

        return authUserRepository.save(authUser);
    }

    @Override
    public String login(AuthUserDTO dto) {
        Optional<AuthUser> authUser = authUserRepository.findByUsername(dto.getUsername());

        if (authUser.isEmpty()) {
            throw new LoginFailure(UNAUTHORIZED);
        }

        if (!passwordEncoder.matches(dto.getPassword(), authUser.get().getPassword())) {
            throw new LoginFailure(UNAUTHORIZED);
        }

        return jwtService.createToken(authUser.get());
    }

    @Override
    public String validate(String token, RequestDTO requestDTO) {
        jwtService.validateToken(token);

        if (routeValidator.isAdminPath(requestDTO) && !jwtService.isAdmin(token)){
                throw new InvalidToken("No tienes permiso para acceder.");
        }

        return token;
    }

    @Override
    public void checkExistence(String username, String message, String action) {
        Optional<AuthUser> authUser = authUserRepository.findByUsername(username);
        if (authUser.isPresent()) {
            throw new CheckExistenceException(String.format(FOUND, action));
        }
    }
}
