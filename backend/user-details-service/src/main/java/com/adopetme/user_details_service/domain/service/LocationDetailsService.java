package com.adopetme.user_details_service.domain.service;

import com.adopetme.user_details_service.domain.dto.AllNames;
import com.adopetme.user_details_service.persistence.webclient.CountryServiceClient;
import com.netflix.discovery.provider.Serializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LocationDetailsService {

    @Autowired
    private final CountryServiceClient countryServiceClient;

    @Autowired
    public LocationDetailsService(CountryServiceClient countryServiceClient) {
        this.countryServiceClient = countryServiceClient;
    }

    public AllNames getLocationNamesById(Long countryId, Long stateId, Long cityId) {
        ResponseEntity<AllNames> response = countryServiceClient.getNamesById(countryId, stateId, cityId);
        return response.getBody();
    }

}
