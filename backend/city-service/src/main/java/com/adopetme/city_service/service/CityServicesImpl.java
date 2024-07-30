package com.adopetme.city_service.service;

import com.adopetme.city_service.dto.CityDTO;
import com.adopetme.city_service.exceptions.CityNotFoundException;
import com.adopetme.city_service.model.City;
import com.adopetme.city_service.repository.CityRepository;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CityServicesImpl implements CityService {

    @Autowired
    private CityRepository cityRepository;


    @Override
    public List<CityDTO> getByCountryIdAndStateId(Long id_country,Long id_State) {
        List<City> cities = cityRepository.findByStateIdAndCountryId(id_State,id_country);
        if(cities.isEmpty()){
            throw new CityNotFoundException("No cities found");
        }
        return cities.stream().map(City::toDTO).collect(Collectors.toList());
    }

    @Override
    public CityDTO getById(Long id) {
        Optional<City> city = cityRepository.findById(id);
        if(city.isEmpty()){
            throw new CityNotFoundException("City not found with id: "+id);
        }
        CityDTO cityDTO = city.get().toDTO();
        return cityDTO;
    }

    @Override
    public CityDTO getByName(String name) {
        Optional<City> city = cityRepository.findByName(name);
        if(city.isEmpty()){
            throw new CityNotFoundException("City not found with name: "+name);
        }
        CityDTO cityDTO = city.get().toDTO();
        return cityDTO;
    }

    @Override
    public Long getIdByName(Long stateId,String name) {
        Optional<City> city = cityRepository.findByStateIdAndName(stateId,name);
        if(city.isEmpty()){
            throw new CityNotFoundException("City not found with name: "+name);
        }
        return city.get().getIdCity();
    }

    @Override
    public String getNameById(Long stateId,Long id) {
        Optional<City> city = cityRepository.findByStateIdAndIdCity(stateId,id);
        if(city.isEmpty()){
            throw new CityNotFoundException("City not found with id: "+id);
        }
        return city.get().getName();
    }
}
