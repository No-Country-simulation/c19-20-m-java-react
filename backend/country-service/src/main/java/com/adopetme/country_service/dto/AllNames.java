package com.adopetme.country_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllNames {
    private String name_country;
    private String name_state;
    private String name_city;
}
