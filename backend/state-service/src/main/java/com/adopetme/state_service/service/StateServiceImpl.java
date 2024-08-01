package com.adopetme.state_service.service;

import com.adopetme.state_service.dto.CityDTO;
import com.adopetme.state_service.dto.StateDTO;
import com.adopetme.state_service.exceptions.StateNotFoundException;
import com.adopetme.state_service.feingclients.CityFeingClient;
import com.adopetme.state_service.model.Ids;
import com.adopetme.state_service.model.Names;
import com.adopetme.state_service.model.State;
import com.adopetme.state_service.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StateServiceImpl implements StateService{

    @Autowired
    private CityFeingClient cityFeingClient;
    @Autowired
    private StateRepository stateRepository;
    @Override
    public List<StateDTO> getByCountryId(Long id_country) {
        List<State> states = stateRepository.findByCountryId(id_country);
        if(states.isEmpty()){
            throw new StateNotFoundException("No states found for country with id: "+id_country);
        }
        return states.stream().map(State::toDTO).collect(Collectors.toList());
    }

    @Override
    public StateDTO getById(Long id) {
        Optional<State> optionalState = stateRepository.findById(id);
        if (optionalState.isEmpty()){
            throw new StateNotFoundException("State not found with id: "+id);
        }
        StateDTO state = optionalState.get().toDTO();
        return state;
    }

    @Override
    public StateDTO getByName(String name) {
        Optional<State> optionalState = stateRepository.findByName(name);
        if (optionalState.isEmpty()){
            throw new StateNotFoundException("State not found with name: "+name);
        }
        StateDTO state = optionalState.get().toDTO();
        return state;
    }

    @Override
    public List<CityDTO> getCitiesByCountryAndState(Long country,String state){
        Optional<State> optionalState = stateRepository.findByCountryIdAndName(country,state);
        if(optionalState.isEmpty()){
            throw new StateNotFoundException("State not found with name: "+state);
        }

        return cityFeingClient.getAllCitiesByCountryAndState(country,optionalState.get().getIdState());
    }

    @Override
    public Ids getIdsByName(Long countryId, String namestate, String namecity) {
        Optional<State> optionalState = stateRepository.findByCountryIdAndName(countryId,namestate);
        if (optionalState.isEmpty()){
            throw new StateNotFoundException("State not found with name: "+namestate);
        }
        Long idCity = cityFeingClient.getIdByName(optionalState.get().getIdState(),namecity);
        if(idCity == null){
            throw new StateNotFoundException("City not found with name: "+namecity);
        }
        Ids ids = new Ids(optionalState.get().getIdState(),idCity);
        return ids;
    }

    @Override
    public Names getNamesById(Long countryId, Long stateId,Long cityId) {
        Optional<State> optionalState = stateRepository.findByCountryIdAndIdState(countryId,stateId);
        if (optionalState.isEmpty()){
            throw new StateNotFoundException("State not found with id: "+stateId);
        }
        String nameCity = cityFeingClient.getNameById(stateId,cityId);
        if(nameCity == null){
            throw new StateNotFoundException("City not found with id: "+cityId);
        }
        Names names = new Names(optionalState.get().getName(),nameCity);
        return names;
    }
}
