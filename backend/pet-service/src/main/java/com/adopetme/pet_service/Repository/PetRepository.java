package com.adopetme.pet_service.Repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.adopetme.pet_service.Model.PetModel;

public interface PetRepository extends JpaRepository<PetModel, Long>, JpaSpecificationExecutor<PetModel> {
    List<PetModel> findByCreatedBy(Long createdBy);

    Optional<PetModel> findByIdPetAndCreatedBy(Long idPet, Long createdBy);
}
