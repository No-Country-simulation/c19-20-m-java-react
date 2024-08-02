package com.adopetme.city_service.service;

import com.adopetme.city_service.dto.CityDTO;

import java.util.List;

public interface CityService {

    List<CityDTO> getByCountryIdAndStateId(Long id_country,Long id_State);

    CityDTO getById(Long id);

    CityDTO getByName(String name);

    Long getIdByName(Long stateId,String name);

    String getNameById(Long stateId,Long id);
}
