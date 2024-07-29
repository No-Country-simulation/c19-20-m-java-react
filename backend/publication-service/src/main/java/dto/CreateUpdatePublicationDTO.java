package dto;


import Model.PublicationStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateUpdatePublicationDTO {
    private LocalDateTime adoptionDate;
    private PublicationStatus status;
    private Long idUser;
    private Long idPet;
    private Long idCountry;
    private Long idState;
    private Long idCity;
    private String typePublication;
}
