package com.adopetme.country_service.service;

import com.adopetme.country_service.dto.*;
import com.adopetme.country_service.exceptions.BadRequestException;
import com.adopetme.country_service.exceptions.CountryNotFoundException;
import com.adopetme.country_service.feignclients.StateFeingClient;
import com.adopetme.country_service.models.Country;
import com.adopetme.country_service.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private StateFeingClient stateFeingClient;
    @Autowired
    private CountryRepository countryRepository;

    @Override
    public List<CountryDTO> getAllCountries() {
        List<Country> countries = countryRepository.findAll();
        if (countries.isEmpty()) {
            throw new CountryNotFoundException("No countries found");
        }
        return countries.stream().map(Country::toDTO).collect(Collectors.toList());
    }

    @Override
    public CountryDTO getById(Long id) {

        if (id == null) {
            throw new BadRequestException("Id cannot be null");
        }

        Optional<Country> optionalCountry = countryRepository.findById(id);
        if (optionalCountry.isEmpty()) {
            throw new CountryNotFoundException("Country not found with id: " + id);
        }
        Country country = optionalCountry.get();
        return country.toDTO();
    }

    @Override
    public List<StateDTO> getStatesByName(String name) {
        Optional<Country> optionalCountry = countryRepository.findByName(name);
        if (optionalCountry.isEmpty()) {
            throw new CountryNotFoundException("Country not found with name: " + name);
        }
        List<StateDTO> states = stateFeingClient.getAllStatesByCountry(optionalCountry.get().getId_country());
        if (states.isEmpty()) {
            throw new CountryNotFoundException("No states found");
        }

        return states;
    }

    @Override
    public List<CityDTO> getCitiesByNames(String country, String state) {
        Optional<Country> optionalCountry = countryRepository.findByName(country);
        if (optionalCountry.isEmpty()) {
            throw new CountryNotFoundException("Country not found with name: " + country);
        }
        return stateFeingClient.getAllCitiesByCountryAndState(optionalCountry.get().getId_country(), state);
    }

    @Override
    public IdsAll getIdsByName(String country, String state, String city) {
        Optional<Country> optionalCountry = countryRepository.findByName(country);
        if (optionalCountry.isEmpty()) {
            throw new CountryNotFoundException("Country not found with name: " + country);
        }
        Ids idStateAndCity = stateFeingClient.getIdsByName(optionalCountry.get().getId_country(), state, city);
        IdsAll idsAll = new IdsAll(optionalCountry.get().getId_country(),idStateAndCity.getId_state(), idStateAndCity.getId_city());
        return idsAll;
    }

    @Override
    public AllNames getNamesById(Long country, Long state, Long city) {
        Optional<Country> optionalCountry = countryRepository.findById(country);
        if (optionalCountry.isEmpty()) {
            throw new CountryNotFoundException("Country not found with id: " + country);
        }
        Names names = stateFeingClient.getNamesById(country,state, city);
        AllNames allNames = new AllNames(optionalCountry.get().getName(), names.getName_state(), names.getName_city());
        return allNames;
    }


}
