package com.adopetme.state_service.feingclients;

import com.adopetme.state_service.dto.CityDTO;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "city-service", url = "http://localhost:5059")
public interface CityFeingClient {
    @GetMapping("/city/all/{idcountry}/{idstate}")
    List<CityDTO> getAllCitiesByCountryAndState(@PathVariable("idcountry") @Valid Long idcountry, @PathVariable("idstate") @Valid Long idstate);

    @GetMapping("/city/idbyname/{stateId}/{name}")
    Long getIdByName(@PathVariable("stateId") @Valid Long stateId,@PathVariable("name") @Valid String name);

    @GetMapping("/city/namebyid/{idstate}/{idcity}")
    String getNameById(@PathVariable("idstate") @Valid Long idstate,@PathVariable("idcity") @Valid Long idcity);
    }
