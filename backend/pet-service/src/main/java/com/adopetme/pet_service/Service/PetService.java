package com.adopetme.pet_service.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.beans.PropertyDescriptor;
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
        PetModel existingPet = petRepository.findById(id)
                .orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        BeanUtils.copyProperties(pet, existingPet, getNullPropertyNames(pet));

        return petRepository.save(existingPet);
    }

    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<String>();
        for (PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null)
                emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
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
