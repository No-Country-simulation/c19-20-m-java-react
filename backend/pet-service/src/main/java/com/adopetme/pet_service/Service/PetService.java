package com.adopetme.pet_service.Service;

import java.util.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.beans.PropertyDescriptor;
import com.adopetme.pet_service.Client.ImageFeignClient;
import com.adopetme.pet_service.Client.SpeciesFeignClient;
import com.adopetme.pet_service.Config.ByteArrayMultipartFile;
import com.adopetme.pet_service.Config.PetSpecification;
import com.adopetme.pet_service.Dto.GenericResponseRecord;
import com.adopetme.pet_service.Dto.ImageDto;
import com.adopetme.pet_service.Dto.PetAndImagesDto;
import com.adopetme.pet_service.Dto.PetsDetailsDto;
import com.adopetme.pet_service.Dto.SpeciesDto;
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

    @Autowired
    private SpeciesFeignClient speciesClient;

    public PetModel save(PetModel pet) throws Exception {
        return petRepository.save(pet);
    }

    public PetModel saveWithImage(PetModel pet, List<byte[]> imageBytes, Integer idUser) throws Exception {
        pet.setCreatedBy(Long.valueOf(idUser));
        petRepository.save(pet);
        List<MultipartFile> multipartFiles = new ArrayList<>();
        for (byte[] bytes : imageBytes) {
            multipartFiles.add(new ByteArrayMultipartFile(bytes, "image"));
        }
        imageFeignClient.saveWithImage(pet.getIdPet(), multipartFiles);
        return pet;
    }

    public List<PetModel> readAll(Integer idUser) throws Exception {
        return petRepository.findByCreatedBy(Long.valueOf(idUser));
    }

    public List<PetAndImagesDto> readAllPet() throws Exception {
        List<PetModel> pets = petRepository.findAll();
        List<PetAndImagesDto> petAndImagesDtos = new ArrayList<>();
        for (PetModel pet : pets) {
            List<ImageDto> images = imageFeignClient.readByIdPet(pet.getIdPet());
            Long idSpecies = pet.getIdSpecies();
            ResponseEntity<GenericResponseRecord<SpeciesDto>> species = speciesClient.readById(idSpecies);
            String speciesName = species.getBody().data().get(0).getName();

            PetAndImagesDto petAndImagesDto = converToDtoImage(pet, images);
            petAndImagesDto.setSpecies(speciesName);

            petAndImagesDtos.add(petAndImagesDto);
        }
        return petAndImagesDtos;
    }

    public List<PetAndImagesDto> readAllPetUser(Integer idUser) throws Exception {
        List<PetModel> pets = petRepository.findByCreatedBy(Long.valueOf(idUser));
        List<PetAndImagesDto> petAndImagesDtos = new ArrayList<>();
        for (PetModel pet : pets) {
            List<ImageDto> images = imageFeignClient.readByIdPet(pet.getIdPet());
            Long idSpecies = pet.getIdSpecies();
            ResponseEntity<GenericResponseRecord<SpeciesDto>> species = speciesClient.readById(idSpecies);
            String speciesName = species.getBody().data().get(0).getName();

            PetAndImagesDto petAndImagesDto = converToDtoImage(pet, images);
            petAndImagesDto.setSpecies(speciesName);

            petAndImagesDtos.add(petAndImagesDto);
        }
        return petAndImagesDtos;
    }

    public List<PetsDetailsDto> search(String param) throws Exception {
        Specification<PetModel> spec = Specification
                .where(new PetSpecification("name", "like", param))
                .or(new PetSpecification("description", "like", "%" + param + "%"));
        try {
            ResponseEntity<GenericResponseRecord<SpeciesDto>> species = speciesClient.readByName(param);
            Long speciesId = species.getBody().data().get(0).getIdSpecies();
            spec = spec.or(new PetSpecification("idSpecies", "=", speciesId));
        } catch (Exception e) {
            // Ignorar si no se encuentra ninguna especie con ese nombre
        }

        List<PetModel> pets = petRepository.findAll(spec);
        List<PetsDetailsDto> petDetailsDtos = new ArrayList<>();
        for (PetModel pet : pets) {
            List<ImageDto> images = imageFeignClient.readByIdPet(pet.getIdPet());
            PetsDetailsDto petDetailsDto = convertToDto(pet, images);
            ResponseEntity<GenericResponseRecord<SpeciesDto>> species = speciesClient.readById(pet.getIdSpecies());
            String speciesName = species.getBody().data().get(0).getName();
            petDetailsDto.setSpecies(speciesName);
            petDetailsDtos.add(petDetailsDto);
        }
        return petDetailsDtos;
    }

    public PetModel readById(Long id) throws Exception {
        return petRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
    }

    public PetAndImagesDto readByIdPet(Long id) throws Exception {
        PetModel pet = petRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        List<ImageDto> images = imageFeignClient.readByIdPet(id);
        return converToDtoImage(pet, images);
    }

    public PetModel update(PetModel pet, Long id, Integer idUser) throws Exception {
        Optional<PetModel> optionalPet = petRepository.findByIdPetAndCreatedBy(id, Long.valueOf(idUser));
        PetModel existingPet = optionalPet.orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        BeanUtils.copyProperties(pet, existingPet, getNullPropertyNames(pet));
        pet.setUpdatedBy(Long.valueOf(idUser));
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

    public void delete(Long id, Integer idUser) throws Exception {
        Optional<PetModel> optionalPet = petRepository.findByIdPetAndCreatedBy(id, Long.valueOf(idUser));
        PetModel existingPet = optionalPet.orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        petRepository.delete(existingPet);
    }

    private PetAndImagesDto converToDtoImage(PetModel object, List<ImageDto> images) {
        PetAndImagesDto petAndImagesDto = modelMapper.map(object, PetAndImagesDto.class);
        petAndImagesDto.setImage(images);
        return petAndImagesDto;
    }

    public PetsDetailsDto convertToDto(PetModel object, List<ImageDto> images) {
        PetsDetailsDto petDetailsDto = modelMapper.map(object, PetsDetailsDto.class);
        petDetailsDto.setImage(images);
        return petDetailsDto;
    }
    // List<T> readAll() throws Exception;

    // T readById(ID id) throws Exception;

    // T update(T t, ID id) throws Exception;

    // void delete(ID id) throws Exception;
}
