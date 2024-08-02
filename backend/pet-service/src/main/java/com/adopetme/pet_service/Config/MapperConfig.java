package com.adopetme.pet_service.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.adopetme.pet_service.Dto.PetAndImagesDto;
import com.adopetme.pet_service.Model.PetModel;

import org.modelmapper.ModelMapper;

@Configuration
public class MapperConfig {
    @Bean("defaultMapper")
    public ModelMapper defaultMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(PetModel.class, PetAndImagesDto.class)
                .addMappings(mapper -> mapper.skip(PetAndImagesDto::setImage));
        return modelMapper;
    }
}
