package com.adopetme.specie_service.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.adopetme.specie_service.Model.BreedModel;

public interface BreedRepository extends JpaRepository<BreedModel, Long> {
    List<BreedModel> findByIdSpecies(Long idSpecies);
}
