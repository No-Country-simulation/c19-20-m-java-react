package com.adopetme.user_details_service.domain.service;

import com.adopetme.user_details_service.domain.UserDetails;
import com.adopetme.user_details_service.domain.dao.UserDetailsDAO;
import com.adopetme.user_details_service.domain.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetUserByIdService {

    @Autowired
    private final UserDetailsDAO userDetailsDAO;

    public GetUserByIdService(UserDetailsDAO userDetailsDao) {
        this.userDetailsDAO = userDetailsDao;
    }

    public Optional<UserDetails> execute(int id) {

        Optional<UserDetails> userDetails = userDetailsDAO.getUserDetailsByID(id);

        if(userDetails.isEmpty()){
            throw new UserNotFoundException("El usuario no fue encontrado o no existe");
        }
        return userDetails;
    }
}
