package com.adopetme.specie_service.Controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.adopetme.specie_service.Dto.BreedDto;
import com.adopetme.specie_service.Dto.GenericResponseRecord;
import com.adopetme.specie_service.Model.BreedModel;
import com.adopetme.specie_service.Service.BreedService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/breed")
@RequiredArgsConstructor
public class BreedController {

    private final BreedService breedService;
    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<GenericResponseRecord<BreedDto>> readAll() throws Exception {
        List<BreedDto> breedDtos = breedService.readAll().stream().map(this::converToDto).toList();
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", new ArrayList<>(breedDtos)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponseRecord<BreedDto>> readById(@PathVariable("id") Long id) throws Exception {
        BreedDto breedDto = converToDto(breedService.readById(id));
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", Arrays.asList(breedDto)));
    }

    @GetMapping("/species/{id}")
    public ResponseEntity<GenericResponseRecord<BreedDto>> readBySpeciesId(@PathVariable("id") Long id)
            throws Exception {
        List<BreedDto> breedDtos = breedService.readBySpeciesId(id).stream().map(this::converToDto).toList();
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", new ArrayList<>(breedDtos)));
    }

    @PostMapping
    public ResponseEntity<BreedDto> save(@Valid @RequestBody BreedDto breedDto) throws Exception {
        BreedModel imageModel = breedService.save(convertToEntity(breedDto));
        return new ResponseEntity<>(converToDto(imageModel), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BreedDto> update(@Valid @PathVariable("id") Long id, @RequestBody BreedDto breedDto)
            throws Exception {
        BreedModel imageModel = breedService.update(convertToEntity(breedDto), id);
        return ResponseEntity.ok(converToDto(imageModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) throws Exception {
        breedService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private BreedDto converToDto(BreedModel object) {
        return modelMapper.map(object, BreedDto.class);
    }

    private BreedModel convertToEntity(BreedDto object) {
        return modelMapper.map(object, BreedModel.class);
    }
}
