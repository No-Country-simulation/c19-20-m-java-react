package com.adopetme.user_details_service.persistence.webclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "country-service", url = "http://localhost:433/country-service")
public interface CountryClient {

    @GetMapping("/name/{country}")
    int getIdCountry(@PathVariable String country);

}
