package Services;

import Exceptions.ResourceNotFoundException;
import Model.Publication;
import Repository.PublicationRepository;
import Services.PublicationService;
import dto.CreateUpdatePublicationDTO;
import dto.PublicationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PublicationServiceImpl implements PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;

    @Override
    public List<PublicationDTO> getAllPublications() {
        return publicationRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PublicationDTO> getPublicationById(Long id) {
        return publicationRepository.findById(id)
                .map(this::convertToDTO);
    }

    @Override
    public PublicationDTO createPublication(CreateUpdatePublicationDTO publicationDTO) {
        Publication publication = convertToEntity(publicationDTO);
        return convertToDTO(publicationRepository.save(publication));
    }

    @Override
    public PublicationDTO updatePublication(Long id, CreateUpdatePublicationDTO publicationDTO) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication not found"));
        publication.setAdoptionDate(publicationDTO.getAdoptionDate());
        publication.setStatus(publicationDTO.getStatus());
        publication.setIdUser(publicationDTO.getIdUser());
        publication.setIdPet(publicationDTO.getIdPet());
        publication.setIdCountry(publicationDTO.getIdCountry());
        publication.setIdState(publicationDTO.getIdState());
        publication.setIdCity(publicationDTO.getIdCity());
        publication.setTypePublication(publicationDTO.getTypePublication());
        return convertToDTO(publicationRepository.save(publication));
    }

    @Override
    public void deletePublication(Long id) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication not found"));
        publicationRepository.delete(publication);
    }

    private PublicationDTO convertToDTO(Publication publication) {
        PublicationDTO publicationDTO = new PublicationDTO();
        publicationDTO.setIdPublication(publication.getIdPublication());
        publicationDTO.setAdoptionDate(publication.getAdoptionDate());
        publicationDTO.setStatus(publication.getStatus());
        publicationDTO.setIdUser(publication.getIdUser());
        publicationDTO.setIdPet(publication.getIdPet());
        publicationDTO.setIdCountry(publication.getIdCountry());
        publicationDTO.setIdState(publication.getIdState());
        publicationDTO.setIdCity(publication.getIdCity());
        publicationDTO.setTypePublication(publication.getTypePublication());
        publicationDTO.setCreatedAt(publication.getCreatedAt());
        publicationDTO.setUpdatedAt(publication.getUpdatedAt());
        return publicationDTO;
    }

    private Publication convertToEntity(CreateUpdatePublicationDTO publicationDTO) {
        Publication publication = new Publication();
        publication.setAdoptionDate(publicationDTO.getAdoptionDate());
        publication.setStatus(publicationDTO.getStatus());
        publication.setIdUser(publicationDTO.getIdUser());
        publication.setIdPet(publicationDTO.getIdPet());
        publication.setIdCountry(publicationDTO.getIdCountry());
        publication.setIdState(publicationDTO.getIdState());
        publication.setIdCity(publicationDTO.getIdCity());
        publication.setTypePublication(publicationDTO.getTypePublication());
        return publication;
    }

    @Override
    public List<Publication> getPublicationsByUserId(Long userId) {
        return publicationRepository.findByUserId(userId);
    }


}