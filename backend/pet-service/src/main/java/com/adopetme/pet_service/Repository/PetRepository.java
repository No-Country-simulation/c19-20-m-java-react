package com.adopetme.pet_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.adopetme.pet_service.Model.PetModel;

public interface PetRepository extends JpaRepository<PetModel, Long> {

}
