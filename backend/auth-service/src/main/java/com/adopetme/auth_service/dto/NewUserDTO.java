package com.adopetme.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewUserDTO {
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String country;
    private String state;
    private String city;
    private String rol;
}
