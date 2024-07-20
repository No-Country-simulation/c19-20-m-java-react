package com.adopetme.pet_service.Service;

import java.util.ArrayList;
import java.util.List;
import java.lang.reflect.Method;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.lang.reflect.Field;
import com.adopetme.pet_service.Client.ImageFeignClient;
import com.adopetme.pet_service.Config.ByteArrayMultipartFile;
import com.adopetme.pet_service.Dto.ImageDto;
import com.adopetme.pet_service.Dto.PetAndImagesDto;
import com.adopetme.pet_service.Exception.ModelNotFoundException;
import com.adopetme.pet_service.Model.PetModel;
import com.adopetme.pet_service.Repository.PetRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PetService {

    @Autowired
    private final PetRepository petRepository;

    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    @Autowired
    private ImageFeignClient imageFeignClient;

    private String getIdFieldName(Class<?> clazz) {
        for (Field field : clazz.getDeclaredFields()) {
            return field.getName();
        }
        return null;
    }

    public PetModel save(PetModel pet) throws Exception {
        return petRepository.save(pet);
    }

    public PetModel saveWithImage(PetModel pet, List<byte[]> imageBytes) throws Exception {
        petRepository.save(pet);
        List<MultipartFile> multipartFiles = new ArrayList<>();
        for (byte[] bytes : imageBytes) {
            multipartFiles.add(new ByteArrayMultipartFile(bytes, "image"));
        }
        imageFeignClient.saveWithImage(pet.getIdPet(), multipartFiles);
        return pet;
    }

    public List<PetModel> readAll() throws Exception {
        return petRepository.findAll();
    }

    public PetModel readById(Long id) throws Exception {
        return petRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
    }

    public PetAndImagesDto readByIdPet(Long id) throws Exception {
        PetModel pet = petRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        List<ImageDto> images = imageFeignClient.readByIdPet(id);
        return converToDtoImage(pet, images);
    }

    public PetModel update(PetModel pet, Long id) throws Exception {
        Class<?> clazz = pet.getClass();
        String idFieldName = getIdFieldName(clazz);
        String methodName = "set" + Character.toUpperCase(idFieldName.charAt(0)) + idFieldName.substring(1);

        Method setIdMethod = clazz.getMethod(methodName, id.getClass());
        setIdMethod.invoke(pet, id);

        petRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        return petRepository.save(pet);
    }

    public void delete(Long id) throws Exception {
        petRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        petRepository.deleteById(id);
    }

    private PetAndImagesDto converToDtoImage(PetModel object, List<ImageDto> images) {
        PetAndImagesDto petAndImagesDto = modelMapper.map(object, PetAndImagesDto.class);
        petAndImagesDto.setImage(images);
        return petAndImagesDto;
    }
    // List<T> readAll() throws Exception;

    // T readById(ID id) throws Exception;

    // T update(T t, ID id) throws Exception;

    // void delete(ID id) throws Exception;
}
