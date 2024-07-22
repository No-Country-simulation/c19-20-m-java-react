package com.adopetme.specie_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adopetme.specie_service.Model.BreedModel;

public interface BreedRepository extends JpaRepository<BreedModel, Long> {

}
