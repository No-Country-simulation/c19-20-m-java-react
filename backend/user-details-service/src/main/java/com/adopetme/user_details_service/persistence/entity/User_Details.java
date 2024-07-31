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
    @Column(name ="user_id")
    private int id;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    @Column(name = "phone")
    private String phone;
    @Column(name = "email")
    private String email;


    @Column(name="country")
    private String country;
    @Column(name="state")
    private String state;
    @Column(name="city")
    private String city;


}
