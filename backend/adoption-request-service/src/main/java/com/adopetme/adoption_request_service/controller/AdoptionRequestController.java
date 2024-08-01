package com.adopetme.adoption_request_service.controller;

import com.adopetme.adoption_request_service.dto.AdoptionRequestDTO;
import com.adopetme.adoption_request_service.exception.ResourceNotFoundException;
import com.adopetme.adoption_request_service.services.IAdoptionRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adoption-request")
public class AdoptionRequestController {


    @Autowired
    private IAdoptionRequestService adoptionRequestService;
    @GetMapping
    public List<AdoptionRequestDTO> getAllAdoptionRequests() {
        return adoptionRequestService.getAllAdoptionRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdoptionRequestDTO> getAdoptionRequestById(@PathVariable(value = "id") Long adoptionRequestId)
            throws ResourceNotFoundException {
        return ResponseEntity.ok().body(adoptionRequestService.getAllAdoptionRequestById(adoptionRequestId));
    }

    @PostMapping
    public AdoptionRequestDTO createAdoptionRequest(@Valid @RequestBody AdoptionRequestDTO adoptionRequestDTO) {
        return adoptionRequestService.createAdoptionRequest(adoptionRequestDTO);
    }
    @PutMapping("/{id}")
    public ResponseEntity<AdoptionRequestDTO> updateAdoptionRequest(@PathVariable(value = "id") Long adoptionRequestId,
                                                                    @Valid @RequestBody AdoptionRequestDTO adoptionRequestDetails) throws ResourceNotFoundException {
        return ResponseEntity.ok(adoptionRequestService.updateAdoptionRequest(adoptionRequestId, adoptionRequestDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdoptionRequest(@PathVariable(value = "id") Long adoptionRequestId) throws ResourceNotFoundException {
        adoptionRequestService.deleteAdoptionRequest(adoptionRequestId);
        return ResponseEntity.noContent().build();
    }

}
