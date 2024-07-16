package com.adopetme.pet_service.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.modelmapper.ModelMapper;

@Configuration
public class MapperConfig {
    @Bean("defaultMapper")
    public ModelMapper defaultMapper() {
        return new ModelMapper();
    }
}
