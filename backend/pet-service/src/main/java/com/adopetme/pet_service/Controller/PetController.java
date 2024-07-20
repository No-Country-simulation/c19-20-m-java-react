package com.adopetme.pet_service.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Qualifier;
import com.adopetme.pet_service.Dto.GenericResponseRecord;
import com.adopetme.pet_service.Dto.PetAndImagesDto;
import com.adopetme.pet_service.Dto.PetDto;
import com.adopetme.pet_service.Exception.IsValidFormat;
import com.adopetme.pet_service.Model.PetModel;
import com.adopetme.pet_service.Service.PetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/pet")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;
    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<GenericResponseRecord<PetDto>> readAll() throws Exception {
        List<PetDto> petDtos = petService.readAll().stream().map(this::converToDto).toList();
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", new ArrayList<>(petDtos)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponseRecord<PetDto>> readById(@PathVariable("id") Long id) throws Exception {
        PetDto petDto = converToDto(petService.readById(id));
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", Arrays.asList(petDto)));
    }

    @GetMapping("/petimages/{id}")
    public ResponseEntity<GenericResponseRecord<PetAndImagesDto>> readByIdPet(@PathVariable("id") Long id)
            throws Exception {
        PetAndImagesDto petImageDto = petService.readByIdPet(id);
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", Arrays.asList(petImageDto)));
    }

    @PostMapping
    public ResponseEntity<PetDto> save(@Valid @RequestBody PetDto petDto) throws Exception {
        PetModel petModel = petService.save(convertToEntity(petDto));
        return new ResponseEntity<>(converToDto(petModel), HttpStatus.CREATED);
    }

    // @PostMapping("/savewithimage")
    // public ResponseEntity<PetDto> saveWithImage(@Valid PetDto petDto,
    // @RequestPart("image") List<MultipartFile> image) throws Exception {
    // List<byte[]> imageBytes = new ArrayList<>();
    // for (MultipartFile multipartFile : image) {
    // imageBytes.add(multipartFile.getBytes());
    // }
    // PetModel petModel = petService.saveWithImage(convertToEntity(petDto),
    // imageBytes);
    // return new ResponseEntity<>(converToDto(petModel), HttpStatus.CREATED);
    // }
    @PostMapping("/savewithimage")
    public ResponseEntity<PetDto> saveWithImage(@Valid PetDto petDto,
            @RequestPart("image") List<MultipartFile> image) throws Exception {
        List<byte[]> imageBytes = new ArrayList<>();
        for (MultipartFile multipartFile : image) {
            IsValidFormat isValidFormat = new IsValidFormat();
            if (!isValidFormat.isValidFormat(multipartFile)) {
                throw new Exception("Invalid file format: " + multipartFile.getOriginalFilename());
            }
            imageBytes.add(multipartFile.getBytes());
        }
        PetModel petModel = petService.saveWithImage(convertToEntity(petDto), imageBytes);
        return new ResponseEntity<>(converToDto(petModel), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDto> update(@Valid @PathVariable("id") Long id, @RequestBody PetDto petDto)
            throws Exception {
        PetModel petModel = petService.update(convertToEntity(petDto), id);
        return ResponseEntity.ok(converToDto(petModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) throws Exception {
        petService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private PetDto converToDto(PetModel object) {
        return modelMapper.map(object, PetDto.class);
    }

    private PetModel convertToEntity(PetDto object) {
        return modelMapper.map(object, PetModel.class);
    }
}
