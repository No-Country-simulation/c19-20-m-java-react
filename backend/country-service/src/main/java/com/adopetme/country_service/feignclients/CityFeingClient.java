package com.adopetme.country_service.feignclients;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "city-service", url = "http://localhost:8082")
public interface CityFeingClient {
}
