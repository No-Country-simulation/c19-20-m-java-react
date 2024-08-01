package com.adopetme.user_details_service.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUpdateUser {
    private String firstname;
    private String lastname;
    private String phone;
    private String email;
}