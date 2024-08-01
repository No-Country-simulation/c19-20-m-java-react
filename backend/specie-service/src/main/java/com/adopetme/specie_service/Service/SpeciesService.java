package com.adopetme.specie_service.Service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;
import com.adopetme.specie_service.Exception.ModelNotFoundException;
import com.adopetme.specie_service.Model.SpeciesModel;
import com.adopetme.specie_service.Repository.SpeciesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpeciesService {

    @Autowired
    private final SpeciesRepository speciesRepository;

    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    private String getIdFieldName(Class<?> clazz) {
        for (Field field : clazz.getDeclaredFields()) {
            return field.getName();
        }
        return null;
    }

    public SpeciesModel save(SpeciesModel species) throws Exception {
        return speciesRepository.save(species);
    }

    public List<SpeciesModel> readAll() throws Exception {
        return speciesRepository.findAll();
    }

    public SpeciesModel readById(Long id) throws Exception {
        return speciesRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
    }

    public SpeciesModel readByname(String name) throws Exception {
        return speciesRepository.findByName(name);
    }

    public SpeciesModel update(SpeciesModel species, Long id) throws Exception {
        Class<?> clazz = species.getClass();
        String idFieldName = getIdFieldName(clazz);
        String methodName = "set" + Character.toUpperCase(idFieldName.charAt(0)) + idFieldName.substring(1);

        Method setIdMethod = clazz.getMethod(methodName, id.getClass());
        setIdMethod.invoke(species, id);

        speciesRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        return speciesRepository.save(species);
    }

    public void delete(Long id) throws Exception {
        speciesRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        speciesRepository.deleteById(id);
    }
}
