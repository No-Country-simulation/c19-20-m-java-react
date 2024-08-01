package com.adopetme.adoption_request_service.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Data
public class AdoptionRequestDTO {
    private Long id;

    @NotNull(message = "User ID cannot be null")
    private Long id_user;

    @NotNull(message = "Publication ID cannot be null")
    private Long id_publication;

    private String status;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

}
