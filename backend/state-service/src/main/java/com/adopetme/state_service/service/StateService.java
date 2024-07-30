package com.adopetme.state_service.service;

import com.adopetme.state_service.dto.CityDTO;
import com.adopetme.state_service.dto.StateDTO;
import com.adopetme.state_service.model.Ids;
import com.adopetme.state_service.model.Names;

import java.util.List;

public interface StateService {
    List<StateDTO> getByCountryId(Long id_user);

    StateDTO getById(Long id);

    StateDTO getByName(String name);

    List<CityDTO> getCitiesByCountryAndState(Long country, String state);

    Ids getIdsByName(Long countryId, String nameState, String nameCity);

    Names getNamesById(Long countryId, Long stateId, Long cityId);
}
