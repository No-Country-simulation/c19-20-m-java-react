package com.adopetme.country_service.models;

import com.adopetme.country_service.dto.CountryDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "country")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_country;
    private String name;

    public CountryDTO toDTO() {
        return new CountryDTO(this.name);
    }

}
