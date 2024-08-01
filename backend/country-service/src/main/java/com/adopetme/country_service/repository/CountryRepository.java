package com.adopetme.country_service.repository;

import com.adopetme.country_service.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country,Long> {
    Optional<Country> findByName(String name);
}
