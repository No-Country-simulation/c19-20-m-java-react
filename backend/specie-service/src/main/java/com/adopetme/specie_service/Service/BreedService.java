package com.adopetme.specie_service.Service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;
import com.adopetme.specie_service.Exception.ModelNotFoundException;
import com.adopetme.specie_service.Model.BreedModel;
import com.adopetme.specie_service.Repository.BreedRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BreedService {

    @Autowired
    private final BreedRepository breedRepository;

    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    private String getIdFieldName(Class<?> clazz) {
        for (Field field : clazz.getDeclaredFields()) {
            return field.getName();
        }
        return null;
    }

    public BreedModel save(BreedModel breed) throws Exception {
        return breedRepository.save(breed);
    }

    public List<BreedModel> readAll() throws Exception {
        return breedRepository.findAll();
    }

    public BreedModel readById(Long id) throws Exception {
        return breedRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
    }

    public List<BreedModel> readBySpeciesId(Long id) throws Exception {
        return breedRepository.findByIdSpecies(id);
    }

    public BreedModel update(BreedModel breed, Long id) throws Exception {
        Class<?> clazz = breed.getClass();
        String idFieldName = getIdFieldName(clazz);
        String methodName = "set" + Character.toUpperCase(idFieldName.charAt(0)) + idFieldName.substring(1);

        Method setIdMethod = clazz.getMethod(methodName, id.getClass());
        setIdMethod.invoke(breed, id);

        breedRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        return breedRepository.save(breed);
    }

    public void delete(Long id) throws Exception {
        breedRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        breedRepository.deleteById(id);
    }

}
