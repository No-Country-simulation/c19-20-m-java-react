package Services;


import Model.Publication;
import dto.CreateUpdatePublicationDTO;
import dto.PublicationDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface PublicationService {
    List<PublicationDTO> getAllPublications();
    Optional<PublicationDTO> getPublicationById(Long id);
    PublicationDTO createPublication(CreateUpdatePublicationDTO publicationDTO);
    PublicationDTO updatePublication(Long id, CreateUpdatePublicationDTO publicationDTO);
    void deletePublication(Long id);
    List<Publication> getPublicationsByUserId(Long userId);
}