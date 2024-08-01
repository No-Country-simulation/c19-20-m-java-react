package com.adopetme.adoption_request_service.services;

import com.adopetme.adoption_request_service.dto.AdoptionRequestDTO;
import com.adopetme.adoption_request_service.model.AdoptionRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IAdoptionRequestService {

    public List<AdoptionRequestDTO> getAllAdoptionRequests();

    public AdoptionRequestDTO getAllAdoptionRequestById(Long id);

    public AdoptionRequestDTO createAdoptionRequest(AdoptionRequestDTO adoptionRequestDTO);

    public AdoptionRequestDTO updateAdoptionRequest(Long id, AdoptionRequestDTO adoptionRequestDTO);

    public void deleteAdoptionRequest(Long id);

}
