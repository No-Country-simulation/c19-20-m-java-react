package com.adopetme.state_service.controller;

import com.adopetme.state_service.dto.CityDTO;
import com.adopetme.state_service.dto.StateDTO;
import com.adopetme.state_service.exceptions.BadRequestException;
import com.adopetme.state_service.model.Ids;
import com.adopetme.state_service.model.Names;
import com.adopetme.state_service.service.StateService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/state")
public class StateController {

    @Autowired
    private StateService stateService;

    @GetMapping("/all/{idcountry}")
    public ResponseEntity<List<StateDTO>> getAllStatesByCountry(@PathVariable("idcountry") @Valid Long idcountry){
        if(idcountry<=0){
            throw new BadRequestException("Id cannot be less than or equal to 0");
        }
        List<StateDTO> states = stateService.getByCountryId(idcountry);
        return ResponseEntity.ok(states);
    }

    @GetMapping("/byid/{id}")
    public ResponseEntity<StateDTO> getById(@PathVariable("id") @Valid Long id){
        if(id<=0){
            throw new BadRequestException("Id cannot be less than or equal to 0");
        }
        StateDTO state = stateService.getById(id);
        return ResponseEntity.ok(state);
    }

    @GetMapping("/byname/{name}")
    public ResponseEntity<StateDTO> getByName(@PathVariable String name){
        if (name == null || name.trim().isEmpty()) {
            throw new BadRequestException("Name cannot be empty");
        }
        StateDTO state = stateService.getByName(name);
        return ResponseEntity.ok(state);
    }

    @GetMapping("/cities/{idcountry}/{idstate}")
    public ResponseEntity<List<CityDTO>> getAllCitiesByCountryAndState(@PathVariable("idcountry") @Valid Long idcountry,@PathVariable("idstate") @Valid String idstate){
        if (idstate == null || idstate.trim().isEmpty()) {
            throw new BadRequestException("Name state cannot be empty");
        }
        if(idcountry<=0){
            throw new BadRequestException("Id cannot be less than or equal to 0");
        }
        List<CityDTO> cities = stateService.getCitiesByCountryAndState(idcountry,idstate);
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/idsbyname/{idcountry}/{namestate}/{namecity}")
    public ResponseEntity<Ids> getIdsByName(@PathVariable("idcountry") Long idcountry,@PathVariable("namestate") String nameState ,@PathVariable("namecity") String nameCity){
        if (nameState == null || nameState.trim().isEmpty()) {
            throw new BadRequestException("Name state cannot be empty");
        }
        if (nameCity == null || nameCity.trim().isEmpty()) {
            throw new BadRequestException("Name City cannot be empty");
        }
        Ids ids = stateService.getIdsByName(idcountry,nameState,nameCity);
        return ResponseEntity.ok(ids);
    }

    @GetMapping("/namebyid/{idcountry}/{idstate}/{idcity}")
    public ResponseEntity<Names> getNamesById(@PathVariable("idcountry") @Valid Long idcountry, @PathVariable("idstate") @Valid Long idstate, @PathVariable("idcity") @Valid Long idcity){

        if(idcountry<=0 || idcity<=0 || idstate<=0){
            throw new BadRequestException("Id cannot be less than or equal to 0");
        }
        Names names = stateService.getNamesById(idcountry,idstate,idcity);
        return ResponseEntity.ok(names);
    }
}
