package com.adopetme.country_service.service;

import com.adopetme.country_service.dto.*;
import com.adopetme.country_service.models.Country;

import java.util.List;
import java.util.Optional;

public interface CountryService {

    List<CountryDTO> getAllCountries();

    CountryDTO getById(Long id);

    List<StateDTO> getStatesByName(String name);

    List<CityDTO> getCitiesByNames(String country,String state);

    IdsAll getIdsByName(String country, String state, String city);

    AllNames getNamesById(Long country, Long state, Long city);
}
