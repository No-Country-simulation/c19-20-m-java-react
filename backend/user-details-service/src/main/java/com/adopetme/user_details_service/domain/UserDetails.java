package com.adopetme.user_details_service.domain;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDetails {

    @NotNull (message = "El id del usuario no puede ser nulo")
    private int id;
    @NotNull (message = "El nombre no puede ser nulo")
    private String name;
    private String lastName;
    @NotNull (message = "El dni no puede ser nulo")
    private String dni;
    @NotNull (message = "La fecha de nacimiento no puede ser nulo")
    private LocalDateTime birthDate;
    private String phone;
    @Email(message = "El correo electrónico debe ser válido")
    @NotNull(message = "El correo electrónico no puede ser nulo")
    private String email;







}
