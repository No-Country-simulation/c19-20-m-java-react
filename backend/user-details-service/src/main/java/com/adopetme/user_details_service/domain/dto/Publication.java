package com.adopetme.user_details_service.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Publication {
    private Long idPublication;
    private LocalDateTime adoptionDate;
    private String status;
    private Long idUser;
    private Long idPet;
    private Long idCountry;
    private Long idState;
    private Long idCity;
    private String typePublication;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
