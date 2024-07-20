package com.adopetme.image_service.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import com.adopetme.image_service.Dto.GenericResponseRecord;
import com.adopetme.image_service.Dto.ImageDto;
import com.adopetme.image_service.Model.ImageModel;
import com.adopetme.image_service.Service.ImageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;
    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<GenericResponseRecord<ImageDto>> readAll() throws Exception {
        List<ImageDto> petDtos = imageService.readAll().stream().map(this::converToDto).toList();
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", new ArrayList<>(petDtos)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponseRecord<ImageDto>> readById(@PathVariable("id") Long id) throws Exception {
        ImageDto imageDto = converToDto(imageService.readById(id));
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", Arrays.asList(imageDto)));
    }

    @GetMapping("/pet/{idPet}")
    public List<ImageDto> readByIdPet(@PathVariable("idPet") Long idPet)
            throws Exception {
        return imageService.readByIdPet(idPet).stream().map(this::converToDto).toList();
    }

    @PostMapping
    public ResponseEntity<ImageDto> save(@Valid @RequestBody ImageDto imageDto) throws Exception {
        ImageModel imageModel = imageService.save(convertToEntity(imageDto));
        return new ResponseEntity<>(converToDto(imageModel), HttpStatus.CREATED);
    }

    @PostMapping(value = "/savewithimage/{idPet}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<ImageDto>> saveWithImage(@PathVariable("idPet") Long idPet,
            @RequestParam("image") List<MultipartFile> images) throws Exception {
        List<ImageDto> imageDtos = new ArrayList<>();
        for (MultipartFile image : images) {
            try {
                // String originalFilename = image.getOriginalFilename();
                // String extension =
                // originalFilename.substring(originalFilename.lastIndexOf(".") +
                // 1).toLowerCase();
                // if (!extension.equals("jpg") && !extension.equals("jpeg") &&
                // !extension.equals("png")) {
                // throw new Exception("Invalid file format: " + originalFilename);
                // }
                byte[] bytes = image.getBytes();
                ImageModel imageModel = imageService.saveWithImage(idPet, bytes);
                imageDtos.add(converToDto(imageModel));
            } catch (IOException e) {
                throw new Exception("Error processing file: " + image.getOriginalFilename(), e);
            }
        }
        return new ResponseEntity<>(imageDtos, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImageDto> update(@Valid @PathVariable("id") Long id, @RequestBody ImageDto imageDto)
            throws Exception {
        ImageModel imageModel = imageService.update(convertToEntity(imageDto), id);
        return ResponseEntity.ok(converToDto(imageModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) throws Exception {
        imageService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private ImageDto converToDto(ImageModel object) {
        return modelMapper.map(object, ImageDto.class);
    }

    private ImageModel convertToEntity(ImageDto object) {
        return modelMapper.map(object, ImageModel.class);
    }

}
