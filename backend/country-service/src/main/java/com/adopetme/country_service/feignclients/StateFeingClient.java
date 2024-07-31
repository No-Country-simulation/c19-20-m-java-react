package com.adopetme.country_service.feignclients;

import com.adopetme.country_service.dto.CityDTO;
import com.adopetme.country_service.dto.Ids;
import com.adopetme.country_service.dto.Names;
import com.adopetme.country_service.dto.StateDTO;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@FeignClient(name = "state-service", url = "http://localhost:5058")
public interface StateFeingClient {
    @GetMapping("/state/all/{idcountry}")
    List<StateDTO> getAllStatesByCountry(@PathVariable("idcountry") @Valid Long idcountry);

    @GetMapping("/state/cities/{idcountry}/{idstate}")
    List<CityDTO> getAllCitiesByCountryAndState(@PathVariable("idcountry") @Valid Long idcountry, @PathVariable("idstate") @Valid String idstate);

    @GetMapping("/state/idsbyname/{idcountry}/{namestate}/{namecity}")
    Ids getIdsByName(@PathVariable("idcountry") Long idcountry, @PathVariable("namestate") String nameState , @PathVariable("namecity") String nameCity);

    @GetMapping("/state/namebyid/{idcountry}/{idstate}/{idcity}")
    Names getNamesById(@PathVariable("idcountry") @Valid Long idcountry, @PathVariable("idstate") @Valid Long idstate, @PathVariable("idcity") @Valid Long idcity);
}
