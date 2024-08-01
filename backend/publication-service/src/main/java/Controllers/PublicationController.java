package Controllers;
import Exceptions.ResourceNotFoundException;
import Model.Publication;
import Services.PublicationService;
import dto.CreateUpdatePublicationDTO;
import dto.PublicationDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/publications")
public class PublicationController {

    @Autowired
    private PublicationService publicationService;

    @GetMapping
    public List<PublicationDTO> getAllPublications() {
        return publicationService.getAllPublications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublicationDTO> getPublicationById(@PathVariable Long id) {
        PublicationDTO publication = publicationService.getPublicationById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publication not found"));
        return ResponseEntity.ok(publication);
    }

    @PostMapping
    public PublicationDTO createPublication(@RequestBody CreateUpdatePublicationDTO publicationDTO) {
        return publicationService.createPublication(publicationDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PublicationDTO> updatePublication(@PathVariable Long id, @RequestBody CreateUpdatePublicationDTO publicationDTO) {
        PublicationDTO updatedPublication = publicationService.updatePublication(id, publicationDTO);
        return ResponseEntity.ok(updatedPublication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable Long id) {
        publicationService.deletePublication(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public List<Publication> getPublicationsByUserId(@PathVariable(value = "userId") Long userId) {
        return publicationService.getPublicationsByUserId(userId);
    }
}