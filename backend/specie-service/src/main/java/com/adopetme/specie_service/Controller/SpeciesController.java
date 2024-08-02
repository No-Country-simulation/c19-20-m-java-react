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
import com.adopetme.specie_service.Dto.SpeciesDto;
import com.adopetme.specie_service.Dto.GenericResponseRecord;
import com.adopetme.specie_service.Model.SpeciesModel;
import com.adopetme.specie_service.Service.SpeciesService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/species")
@RequiredArgsConstructor
public class SpeciesController {

    private final SpeciesService speciesService;
    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<GenericResponseRecord<SpeciesDto>> readAll() throws Exception {
        List<SpeciesDto> speciesDtos = speciesService.readAll().stream().map(this::converToDto).toList();
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", new ArrayList<>(speciesDtos)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponseRecord<SpeciesDto>> readById(@PathVariable("id") Long id) throws Exception {
        SpeciesDto speciesDto = converToDto(speciesService.readById(id));
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", Arrays.asList(speciesDto)));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<GenericResponseRecord<SpeciesDto>> readByName(@PathVariable("name") String name)
            throws Exception {
        SpeciesDto speciesDto = converToDto(speciesService.readByname(name));
        return ResponseEntity.ok(new GenericResponseRecord<>(200, "success", Arrays.asList(speciesDto)));
    }

    @PostMapping
    public ResponseEntity<SpeciesDto> save(@Valid @RequestBody SpeciesDto speciesDto) throws Exception {
        SpeciesModel imageModel = speciesService.save(convertToEntity(speciesDto));
        return new ResponseEntity<>(converToDto(imageModel), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpeciesDto> update(@Valid @PathVariable("id") Long id, @RequestBody SpeciesDto speciesDto)
            throws Exception {
        SpeciesModel imageModel = speciesService.update(convertToEntity(speciesDto), id);
        return ResponseEntity.ok(converToDto(imageModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) throws Exception {
        speciesService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private SpeciesDto converToDto(SpeciesModel object) {
        return modelMapper.map(object, SpeciesDto.class);
    }

    private SpeciesModel convertToEntity(SpeciesDto object) {
        return modelMapper.map(object, SpeciesModel.class);
    }
}
