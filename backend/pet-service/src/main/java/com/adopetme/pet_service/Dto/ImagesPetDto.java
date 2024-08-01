package com.adopetme.pet_service.Dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImagesPetDto {

    private List<ImageDto> imagesDto;
}
