package com.adopetme.user_details_service.persistence.webclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "city-service", url = "http://localhost:433/city-service")
public interface CityClient {

    @GetMapping("/name/{city}")
    int getIdCity (@PathVariable String city);

}
