package com.adopetme.image_service.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "image")
@Entity
public class ImageModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @Column(name = "id_image")
    private Long idImage;

    @Lob
    @Column(name = "image_pet", nullable = false, length = Integer.MAX_VALUE)
    private byte[] imagePet;

    @Column(name = "id_pet", nullable = false)
    private Long idPet;

}
