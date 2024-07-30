package com.adopetme.user_details_service.domain.service;

import com.adopetme.user_details_service.domain.UserDetails;
import com.adopetme.user_details_service.domain.dao.CityDAO;
import com.adopetme.user_details_service.domain.dao.CountryDAO;
import com.adopetme.user_details_service.domain.dao.UserDetailsDAO;
import com.adopetme.user_details_service.domain.exception.UserExistException;
import org.springframework.beans.factory.annotation.Autowired;

public class CreateUserService {

    @Autowired
    private  final UserDetailsDAO userDetailsDAO;

    @Autowired
    private final CountryDAO countryDAO;

    @Autowired
    private final CityDAO cityDAO;

    public CreateUserService(UserDetailsDAO userDetailsDAO, CountryDAO countryDAO, CityDAO cityDAO) {
        this.userDetailsDAO = userDetailsDAO;
        this.countryDAO = countryDAO;
        this.cityDAO = cityDAO;
    }

    public Integer execute(UserDetails userDetails) {

        int idCountry = countryDAO.getIdCountry(userDetails.getCountry());
        int idCity = cityDAO.getIdCity(userDetails.getCity());

        if(userDetailsDAO.getUserDetailsByID(userDetails.getId()).isPresent()){
            throw new UserExistException("El usuario ya esta registrado");
        }

        userDetails.setCity(String.valueOf(idCity));
        userDetails.setCountry(String.valueOf(idCountry));

        return userDetailsDAO.save(userDetails);
    }

}
