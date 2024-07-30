package com.adopetme.country_service.controller;

import com.adopetme.country_service.dto.*;
import com.adopetme.country_service.exceptions.BadRequestException;
import com.adopetme.country_service.exceptions.CountryNotFoundException;
import com.adopetme.country_service.models.Country;
import com.adopetme.country_service.repository.CountryRepository;
import com.adopetme.country_service.service.CountryService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/country")
public class CountryController {

    @Autowired
    private CountryService countryService;

    @GetMapping("/all")
    public ResponseEntity<List<CountryDTO>> getAllCountries(){
        List<CountryDTO> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }

    @GetMapping("/byid/{id}")
    public ResponseEntity<CountryDTO> getById(@PathVariable("id") @Valid Long id){
        if(id<=0){
            throw new BadRequestException("Id cannot be less than or equal to 0");
        }
        CountryDTO country = countryService.getById(id);
        return ResponseEntity.ok(country);
    }

    @GetMapping("/states/{name}")
    public ResponseEntity<List<StateDTO>> getByName(@PathVariable String name){
        if (name == null || name.trim().isEmpty()) {
            throw new BadRequestException("Name cannot be empty");
        }
        List<StateDTO> states = countryService.getStatesByName(name);
        return ResponseEntity.ok(states);
    }
    @GetMapping("/cities/{idcountry}/{idstate}")
    public ResponseEntity<List<CityDTO>> getAllCitiesByCountryAndState(@PathVariable("idcountry") @Valid String idcountry,@PathVariable("idstate") @Valid String idstate){
        if (idcountry == null || idcountry.trim().isEmpty()) {
            throw new BadRequestException("Name country cannot be empty");
        }
        if (idstate == null || idstate.trim().isEmpty()) {
            throw new BadRequestException("Name state cannot be empty");
        }
        List<CityDTO> cities = countryService.getCitiesByNames(idcountry,idstate);
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/idsbyname/{namecountry}/{namestate}/{namecity}")
    public ResponseEntity<IdsAll> getIdsByName(@PathVariable("namecountry") @NotBlank String nameCountry, @PathVariable("namestate") @NotBlank String nameState , @PathVariable("namecity") @NotBlank String nameCity){
        if (nameCountry == null || nameCountry.trim().isEmpty()) {
            throw new BadRequestException("Name country cannot be empty");
        }
        if (nameState == null || nameState.trim().isEmpty()) {
            throw new BadRequestException("Name state cannot be empty");
        }
        if (nameCity == null || nameCity.trim().isEmpty()) {
            throw new BadRequestException("Name city cannot be empty");
        }
        IdsAll ids = countryService.getIdsByName(nameCountry,nameState,nameCity);
        return ResponseEntity.ok(ids);
    }

    @GetMapping("/namesbyid/{idcountry}/{idstate}/{idcity}")
    public ResponseEntity<AllNames> getNamesById(@PathVariable("idcountry") @Valid Long idcountry, @PathVariable("idstate") @Valid Long idstate, @PathVariable("idcity") @Valid Long idcity){
        if(idcountry<=0 || idstate<=0 || idcity<=0){
            throw new BadRequestException("Id cannot be less than or equal to 0");
        }
        AllNames names = countryService.getNamesById(idcountry,idstate,idcity);
        return ResponseEntity.ok(names);
    }
}
