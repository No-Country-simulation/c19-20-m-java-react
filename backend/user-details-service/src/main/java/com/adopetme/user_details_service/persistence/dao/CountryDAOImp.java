package com.adopetme.user_details_service.persistence.dao;

import com.adopetme.user_details_service.domain.dao.CountryDAO;
import com.adopetme.user_details_service.persistence.webclient.CountryClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CountryDAOImp implements CountryDAO {

    @Autowired
    private CountryClient countryClient;
    @Override
    public int getIdCountry(String country) {

        return countryClient.getIdCountry(country);
    }
}
