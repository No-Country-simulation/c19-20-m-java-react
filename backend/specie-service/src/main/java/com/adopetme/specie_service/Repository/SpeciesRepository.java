package com.adopetme.specie_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adopetme.specie_service.Model.SpeciesModel;

public interface SpeciesRepository extends JpaRepository<SpeciesModel, Long> {
    SpeciesModel findByName(String name);
}
