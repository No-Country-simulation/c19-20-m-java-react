package com.adopetme.user_details_service.domain.service;

import com.adopetme.user_details_service.domain.UserDetails;
import com.adopetme.user_details_service.domain.dao.UserDetailsDAO;
import com.adopetme.user_details_service.domain.dto.IdsAll;
import com.adopetme.user_details_service.domain.exception.UserExistException;
import com.adopetme.user_details_service.persistence.webclient.CountryServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

public class CreateUserService {

    @Autowired
    private  final UserDetailsDAO userDetailsDAO;

    @Autowired
    private final CountryServiceClient countryServiceClient;

    public CreateUserService(UserDetailsDAO userDetailsDAO, CountryServiceClient countryServiceClient) {
        this.userDetailsDAO = userDetailsDAO;
        this.countryServiceClient = countryServiceClient;
    }


    public Integer execute(UserDetails userDetails) {

        ResponseEntity<IdsAll> response = countryServiceClient.getIdsByName(userDetails.getCountry(), userDetails.getState(), userDetails.getCity());
        IdsAll idsAll = response.getBody();

        if (idsAll != null) {
            userDetails.setCountry(String.valueOf(idsAll.getId_country()));
            userDetails.setState(String.valueOf(idsAll.getId_state()));
            userDetails.setCity(String.valueOf(idsAll.getId_city()));
        }

        if(userDetailsDAO.getUserDetailsByID(userDetails.getId()).isPresent()){
            throw new UserExistException("El usuario ya esta registrado");
        }


        return userDetailsDAO.save(userDetails);
    }

}
