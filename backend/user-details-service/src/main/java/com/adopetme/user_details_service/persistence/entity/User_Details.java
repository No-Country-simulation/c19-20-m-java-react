package com.adopetme.user_details_service.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_details")
public class User_Details {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id_user")
    private int id;
    @Column(name = "names")
    private String name;
    @Column(name = "lastnames")
    private String lastName;
    @Column(name = "dni")
    private String dni;
    @Column(name = "birthday")
    private LocalDateTime birthDate;
    @Column(name = "phone")
    private String phone;
    @Column(name = "email")
    private String email;
    @Column(name = "user_id")
    private int user_id;
}
