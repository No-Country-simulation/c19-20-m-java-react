package com.adopetme.city_service.controller;

import com.adopetme.city_service.dto.CityDTO;
import com.adopetme.city_service.exceptions.BadRequestException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.adopetme.city_service.service.CityService;

import java.util.List;

@RestController
@RequestMapping("/city")
public class CityController {

    @Autowired
    private CityService cityService;

    @GetMapping("/all/{idcountry}/{idstate}")
    public ResponseEntity<List<CityDTO>> getAllCitiesByCountryAndState(@PathVariable("idcountry") @Valid Long idcountry,@PathVariable("idstate") @Valid Long idstate){
        if(idstate<=0 || idcountry<=0){
            throw new BadRequestException("Id cannot be less than or equal to 0");
        }
        List<CityDTO> cities = cityService.getByCountryIdAndStateId(idcountry,idstate);
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/byid/{id}")
    public ResponseEntity<CityDTO> getById(@PathVariable("id") @Valid Long id){
        if(id<=0){
            throw new BadRequestException("Id cannot be less than or equal to 0");
        }
        CityDTO city = cityService.getById(id);
        return ResponseEntity.ok(city);
    }

    @GetMapping("/byname/{name}")
    public ResponseEntity<CityDTO> getByName(@PathVariable String name){
        if (name == null || name.trim().isEmpty()) {
            throw new BadRequestException("Name cannot be empty");
        }
        CityDTO city = cityService.getByName(name);
        return ResponseEntity.ok(city);
    }

    @GetMapping("/idbyname/{stateId}/{name}")
    public ResponseEntity<Long> getIdByName(@PathVariable("stateId") @Valid Long stateId,@PathVariable("name") @Valid String name){
        if (name == null || name.trim().isEmpty()) {
            throw new BadRequestException("Name cannot be empty");
        }
        if(stateId<=0){
            throw new BadRequestException("Id cannot be less than or equal to 0");
        }
        Long id = cityService.getIdByName(stateId,name);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/namebyid/{idstate}/{idcity}")
    public ResponseEntity<String> getNameById(@PathVariable("idstate") @Valid Long idstate,@PathVariable("idcity") @Valid Long idcity){
        if(idstate<=0 || idcity<=0){
            throw new BadRequestException("Id cannot be less than or equal to 0");
        }
        String name = cityService.getNameById(idstate,idcity);
        return ResponseEntity.ok(name);
    }
}
