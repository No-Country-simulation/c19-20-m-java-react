package com.adopetme.pet_service.Dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PetDto {

    private Long idPet;

    @NotNull
    @Size(min = 3, max = 25)
    private String name;

    @Min(0)
    @Max(99)
    private Integer age;

    @NotNull
    @Size(max = 6)
    private String longevity;

    @NotNull
    @Size(min = 50, max = 250)
    private String description;

    @NotNull
    @Min(0)
    @Max(1)
    private Integer gender;

    @DecimalMin("0.0")
    @DecimalMax("10.0")
    private Double size;

    @DecimalMin("0.0")
    @DecimalMax("100.0")
    private Double weight;

    private Integer active;

    @Size(max = 500)
    private String tag;

    private Long createdBy;

    @NotNull
    private Long idSpecies;

    @NotNull
    private Long idBreed;

}
