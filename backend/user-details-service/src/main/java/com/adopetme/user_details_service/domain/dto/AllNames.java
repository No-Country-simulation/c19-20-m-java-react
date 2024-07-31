package com.adopetme.user_details_service.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllNames {

    private String countryName;
    private String stateName;
    private String cityName;

}
