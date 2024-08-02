package com.adopetme.user_details_service.domain.service;

import com.adopetme.user_details_service.domain.UserDetails;
import com.adopetme.user_details_service.domain.dao.UserDetailsDAO;
import com.adopetme.user_details_service.domain.dto.CreateUpdateUser;
import com.adopetme.user_details_service.domain.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

public class UpdateUserDetailsService {

    @Autowired
    private final UserDetailsDAO userDetailsDAO;

    public UpdateUserDetailsService(UserDetailsDAO userDetailsDAO) {
        this.userDetailsDAO = userDetailsDAO;
    }


    public Integer updateUser(int id, CreateUpdateUser userDTO) {
        UserDetails userDetails = userDetailsDAO.getUserDetailsByID(id)
                .orElseThrow(() -> new UserNotFoundException("El usuario no fue encontrado o no existe"));

        userDetails.setFirstName(userDTO.getFirstname());
        userDetails.setLastName(userDTO.getLastname());
        userDetails.setPhone(userDTO.getPhone());
        userDetails.setEmail(userDTO.getEmail());

        return userDetailsDAO.save(userDetails);
    }


}
