package com.adopetme.user_details_service.persistence.dao;

import com.adopetme.user_details_service.domain.dao.CityDAO;
import com.adopetme.user_details_service.persistence.webclient.CityClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CityDAOImp implements CityDAO {

    @Autowired
    private CityClient cityClient;
    @Override
    public int getIdCity(String city) {
        return cityClient.getIdCity(city);
    }
}
