package com.adopetme.pet_service.Client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import com.adopetme.pet_service.Dto.ImageDto;
import com.adopetme.pet_service.Dto.ImagesPetDto;

@FeignClient(name = "image-service", url = "http://localhost:5052")
public interface ImageFeignClient {

        @PostMapping(value = "/image/savewithimage/{idPet}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        ResponseEntity<List<ImagesPetDto>> saveWithImage(@PathVariable("idPet") Long idPet,
                        @RequestPart("image") List<MultipartFile> images) throws Exception;

        @GetMapping(value = "/image/pet/{idPet}")
        List<ImageDto> readByIdPet(@PathVariable("idPet") Long idPet)
                        throws Exception;
}
