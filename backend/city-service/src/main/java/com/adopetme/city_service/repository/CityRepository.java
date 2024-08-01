package com.adopetme.city_service.repository;

import com.adopetme.city_service.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City,Long>{
    List<City> findByStateId(Long idState);

    List<City> findByStateIdAndCountryId(Long stateId, Long countryId);

    Optional<City> findById(Long id);

    Optional<City> findByName(String name);

    Optional<City> findByStateIdAndName(Long stateId, String name);

    Optional<City> findByStateIdAndIdCity(Long stateId, Long idCity);
}
