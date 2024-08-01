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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Qualifier;

import com.adopetme.pet_service.Auth.JwtTokenDecoder;
import com.adopetme.pet_service.Dto.GenericResponseRecord;
import com.adopetme.pet_service.Dto.PetAndImagesDto;
import com.adopetme.pet_service.Dto.PetDto;
import com.adopetme.pet_service.Dto.PetsDetailsDto;
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
    public ResponseEntity<GenericResponseRecord<PetDto>> readAll(@RequestHeader("Authorization") String token)
            throws Exception {
        Integer userId = JwtTokenDecoder.getUserId(token);
        List<PetDto> petDtos = petService.readAll(userId).stream().map(this::converToDto).toList();
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", new ArrayList<>(petDtos)));

    }

    @GetMapping("/petimage")
    public ResponseEntity<GenericResponseRecord<PetAndImagesDto>> readAllPet() throws Exception {
        List<PetAndImagesDto> petAndImagesDtos = petService.readAllPet();
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", new ArrayList<>(petAndImagesDtos)));
    }

    @GetMapping("/petuser")
    public ResponseEntity<GenericResponseRecord<PetAndImagesDto>> readAllPetUser(
            @RequestHeader("Authorization") String token) throws Exception {
        Integer userId = JwtTokenDecoder.getUserId(token);
        List<PetAndImagesDto> petAndImagesDtos = petService.readAllPetUser(userId);
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", new ArrayList<>(petAndImagesDtos)));
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

    @GetMapping("/search")
    public ResponseEntity<GenericResponseRecord<PetsDetailsDto>> search(@RequestParam("param") String param)
            throws Exception {
        List<PetsDetailsDto> petsDetailsDto = petService.search(param);
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", new ArrayList<>(petsDetailsDto)));
    }

    @PostMapping
    public ResponseEntity<PetDto> save(@Valid @RequestBody PetDto petDto) throws Exception {
        PetModel petModel = petService.save(convertToEntity(petDto));
        return new ResponseEntity<>(converToDto(petModel), HttpStatus.CREATED);
    }

    @PostMapping("/savewithimage")
    public ResponseEntity<PetDto> saveWithImage(@Valid PetDto petDto,
            @RequestPart("image") List<MultipartFile> image,
            @RequestHeader("Authorization") String token) throws Exception {
        Integer userId = JwtTokenDecoder.getUserId(token);
        List<byte[]> imageBytes = new ArrayList<>();
        for (MultipartFile multipartFile : image) {
            IsValidFormat isValidFormat = new IsValidFormat();
            if (!isValidFormat.isValidFormat(multipartFile)) {
                throw new Exception("Invalid file format: " + multipartFile.getOriginalFilename());
            }
            imageBytes.add(multipartFile.getBytes());
        }
        PetModel petModel = petService.saveWithImage(convertToEntity(petDto), imageBytes, userId);
        return new ResponseEntity<>(converToDto(petModel), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDto> update(@Valid @PathVariable("id") Long id, @RequestBody PetDto petDto,
            @RequestHeader("Authorization") String token)
            throws Exception {
        Integer userId = JwtTokenDecoder.getUserId(token);
        PetModel petModel = petService.update(convertToEntity(petDto), id, userId);
        return ResponseEntity.ok(converToDto(petModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id, @RequestHeader("Authorization") String token)
            throws Exception {
        Integer userId = JwtTokenDecoder.getUserId(token);
        petService.delete(id, userId);
        return ResponseEntity.noContent().build();
    }

    private PetDto converToDto(PetModel object) {
        return modelMapper.map(object, PetDto.class);
    }

    private PetModel convertToEntity(PetDto object) {
        return modelMapper.map(object, PetModel.class);
    }
}
