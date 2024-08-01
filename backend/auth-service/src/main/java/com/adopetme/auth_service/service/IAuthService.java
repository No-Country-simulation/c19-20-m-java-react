package com.adopetme.auth_service.service;

import com.adopetme.auth_service.dto.AuthUserDTO;
import com.adopetme.auth_service.dto.NewUserDTO;
import com.adopetme.auth_service.dto.RequestDTO;
import com.adopetme.auth_service.model.AuthUser;

public interface IAuthService {

    //CRUD
    AuthUser create(NewUserDTO dto);
    //AUTENTICACION
    String login(AuthUserDTO dto);
    //AUTORIZACION
    String validate(String token, RequestDTO requestDTO);

    //EXTRAS
    void checkExistence(String username, String message, String action);
}
