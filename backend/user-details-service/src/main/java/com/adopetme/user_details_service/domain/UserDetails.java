package com.adopetme.user_details_service.domain;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetails {

    @NotNull (message = "El id del usuario no puede ser nulo")
    private int id;
    @NotNull (message = "El nombre no puede ser nulo")
    private String firstName;
    @NotNull (message = "El apellido no puede ser nulo")
    private String lastName;
    @NotNull (message = "El telefono no puede ser nulo")
    private String phone;
    @Email(message = "El correo electrónico debe ser válido")
    @NotNull(message = "El correo electrónico no puede ser nulo")
    private String email;

    @NotNull(message = "El campo country no puede ser nulo")
    private String country;
    @NotNull(message = "El campo sate no puede ser nulo")
    private String state;
    @NotNull(message = "El campo country no puede ser nulo")
    private String city;







}
