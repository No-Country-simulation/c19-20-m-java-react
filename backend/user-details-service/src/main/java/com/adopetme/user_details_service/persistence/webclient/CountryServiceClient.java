package com.adopetme.user_details_service.persistence.webclient;

import com.adopetme.user_details_service.domain.dto.AllNames;
import com.adopetme.user_details_service.domain.dto.IdsAll;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "country-service", url = "http://localhost:5057")
public interface CountryServiceClient {

    @GetMapping("/country/idsbyname/{namecountry}/{namestate}/{namecity}")
    ResponseEntity<IdsAll> getIdsByName(@PathVariable("namecountry") String nameCountry,
                                        @PathVariable("namestate") String nameState,
                                        @PathVariable("namecity") String nameCity);
    @GetMapping("/country/namesbyid/{idcountry}/{idstate}/{idcity}")
    ResponseEntity<AllNames> getNamesById(@PathVariable("idcountry") Long idCountry,
                                             @PathVariable("idstate") Long idState,
                                             @PathVariable("idcity") Long idCity);



}
