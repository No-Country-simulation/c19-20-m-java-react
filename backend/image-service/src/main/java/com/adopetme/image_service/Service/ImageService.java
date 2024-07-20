package com.adopetme.image_service.Service;

import java.beans.PropertyDescriptor;
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
        ImageModel existingImage = imageRepository.findById(id)
                .orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        BeanUtils.copyProperties(img, existingImage, getNullPropertyNames(img));
        return imageRepository.save(existingImage);
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
        imageRepository.findById(id).orElseThrow(() -> new ModelNotFoundException("Id not found: " + id));
        imageRepository.deleteById(id);
    }

}
