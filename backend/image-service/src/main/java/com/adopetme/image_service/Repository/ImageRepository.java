package com.adopetme.image_service.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adopetme.image_service.Model.ImageModel;

public interface ImageRepository extends JpaRepository<ImageModel, Long> {

    List<ImageModel> findByIdPet(Long idPet) throws Exception;
}
