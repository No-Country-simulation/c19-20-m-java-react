package com.adopetme.adoption_request_service.repository;

import com.adopetme.adoption_request_service.model.AdoptionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {
}
