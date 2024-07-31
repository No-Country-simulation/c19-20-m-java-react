package com.adopetme.pet_service.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.adopetme.pet_service.Dto.GenericResponseRecord;
import com.adopetme.pet_service.Dto.SpeciesDto;

@FeignClient(name = "specie-service", url = "https://service12.mercelab.com")
public interface SpeciesFeignClient {

    @GetMapping(value = "/species/{id}")
    ResponseEntity<GenericResponseRecord<SpeciesDto>> readById(@PathVariable("id") Long id) throws Exception;

    @GetMapping(value = "/species/name/{name}")
    ResponseEntity<GenericResponseRecord<SpeciesDto>> readByName(@PathVariable("name") String name);
}
