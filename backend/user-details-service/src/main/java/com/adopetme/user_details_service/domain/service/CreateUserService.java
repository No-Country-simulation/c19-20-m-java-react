package com.adopetme.user_details_service.domain.service;

import com.adopetme.user_details_service.domain.UserDetails;
import com.adopetme.user_details_service.domain.dao.UserDetailsDAO;
import com.adopetme.user_details_service.domain.exception.UserExistException;
import com.adopetme.user_details_service.domain.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

public class CreateUserService {

    @Autowired
    private  final UserDetailsDAO userDetailsDAO;

    public CreateUserService(UserDetailsDAO userDetailsDAO) {
        this.userDetailsDAO = userDetailsDAO;
    }

    public UserDetails execute(UserDetails userDetails) {

        if(userDetailsDAO.getUserDetailsByID(userDetails.getId()).isPresent()){
            throw new UserExistException("El usuario ya esta registrado");
        }
        return userDetailsDAO.save(userDetails);
    }
}
