package com.adopetme.image_service.Service;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.adopetme.image_service.Exception.ModelNotFoundException;
import com.adopetme.image_service.Model.ImageModel;
import com.adopetme.image_service.Repository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

    @Autowired
    private final ImageRepository imageRepository;

    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    private String getIdFieldName(Class<?> clazz) {
        for (Field field : clazz.getDeclaredFields()) {
            return field.getName();
        }
        return null;
    }

    public ImageModel save(ImageModel img) throws Exception {
        return imageRepository.save(img);
    }

    public ImageModel saveWithImage(Long idPet, byte[] image) throws Exception {
        ImageModel imageModel = new ImageModel();
        imageModel.setIdPet(idPet);
        imageModel.setImagePet(image);
        return imageRepository.save(imageModel);
    }

    public List<ImageModel> readAll() throws Exception {
        return imageRepository.findAll();
    }

    public ImageModel readById(Long id) throws Exception {
        return imageRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
    }

    public List<ImageModel> readByIdPet(Long idPet) throws Exception {
        List<ImageModel> images = imageRepository.findByIdPet(idPet);
        if (images.isEmpty()) {
            throw new ModelNotFoundException("Id not found: " + idPet);
        }
        return images;
    }

    public ImageModel update(ImageModel img, Long id) throws Exception {
        Class<?> clazz = img.getClass();
        String idFieldName = getIdFieldName(clazz);
        String methodName = "set" + Character.toUpperCase(idFieldName.charAt(0)) + idFieldName.substring(1);

        Method setIdMethod = clazz.getMethod(methodName, id.getClass());
        setIdMethod.invoke(img, id);

        imageRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        return imageRepository.save(img);
    }

    public void delete(Long id) throws Exception {
        imageRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        imageRepository.deleteById(id);
    }

}
