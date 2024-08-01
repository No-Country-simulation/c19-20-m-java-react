package com.adopetme.adoption_request_service.services;

import com.adopetme.adoption_request_service.dto.AdoptionRequestDTO;
import com.adopetme.adoption_request_service.exception.ResourceNotFoundException;
import com.adopetme.adoption_request_service.model.AdoptionRequest;
import com.adopetme.adoption_request_service.repository.AdoptionRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdoptionRequestServiceImpl implements IAdoptionRequestService{


    @Autowired
    public final AdoptionRequestRepository adoptionRequestRepository;


    @Override
    public List<AdoptionRequestDTO> getAllAdoptionRequests() {
        return adoptionRequestRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
    }

    @Override
    public AdoptionRequestDTO getAllAdoptionRequestById(Long id) {
        AdoptionRequest adoptionRequest = adoptionRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Adoption request not found for this id : " + id));
        return convertEntityToDTO(adoptionRequest);
    }

    @Override
    public AdoptionRequestDTO createAdoptionRequest(AdoptionRequestDTO adoptionRequestDTO) {
        AdoptionRequest adoptionRequest = new AdoptionRequest();
        BeanUtils.copyProperties(adoptionRequestDTO, adoptionRequest);
        adoptionRequest.setCreatedAt(LocalDateTime.now());
        adoptionRequest.setUpdatedAt(LocalDateTime.now());
        AdoptionRequest savedAdoptionRequest = adoptionRequestRepository.save(adoptionRequest);
        return convertEntityToDTO(savedAdoptionRequest);
    }

    @Override
    public AdoptionRequestDTO updateAdoptionRequest(Long adoptionRequestId, AdoptionRequestDTO adoptionRequestDetails) throws ResourceNotFoundException {
        AdoptionRequest adoptionRequest = adoptionRequestRepository.findById(adoptionRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Adoption request not found for this id :: " + adoptionRequestId));

        BeanUtils.copyProperties(adoptionRequestDetails, adoptionRequest, "id", "createdAt");
        adoptionRequest.setUpdatedAt(LocalDateTime.now());
        AdoptionRequest updatedAdoptionRequest = adoptionRequestRepository.save(adoptionRequest);
        return convertEntityToDTO(updatedAdoptionRequest);
    }

    @Override
    public void deleteAdoptionRequest(Long adoptionRequestId) throws ResourceNotFoundException {
        AdoptionRequest adoptionRequest = adoptionRequestRepository.findById(adoptionRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Adoption request not found for this id :: " + adoptionRequestId));
        adoptionRequestRepository.delete(adoptionRequest);
    }
    private AdoptionRequestDTO convertEntityToDTO(AdoptionRequest adoptionRequest) {
        AdoptionRequestDTO adoptionRequestDTO = new AdoptionRequestDTO();
        BeanUtils.copyProperties(adoptionRequest, adoptionRequestDTO);
        return adoptionRequestDTO;
    }
}
