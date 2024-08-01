package com.adopetme.user_details_service.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IdsAll {
    private Long id_country;
    private Long id_state;
    private Long id_city;
}
