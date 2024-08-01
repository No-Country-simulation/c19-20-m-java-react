package com.adopetme.pet_service.Model;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "pet")
@Entity
public class PetModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    @Column(name = "id_pet")
    private Long idPet;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "age", nullable = true)
    private Integer age;

    @Column(name = "longevity", nullable = false)
    private String longevity;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "gender", nullable = false)
    // 0 Macho, 1 Hembra
    private Integer gender;

    @Column(name = "size", nullable = true)
    private Double size;

    @Column(name = "weight", nullable = true)
    private Double weight;

    @Column(name = "active", nullable = false)
    private Integer active;

    @Column(name = "tag", nullable = true)
    private String tag;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    @CreationTimestamp(source = SourceType.DB)
    private Timestamp createdAt;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "updated_at", nullable = true)
    @UpdateTimestamp(source = SourceType.DB)
    private Timestamp updatedAt;

    @Column(name = "updated_by", nullable = true)
    private Long updatedBy;

    @Column(name = "id_species", nullable = true)
    private Long idSpecies;

    @Column(name = "id_breed", nullable = true)
    private Long idBreed;
}
