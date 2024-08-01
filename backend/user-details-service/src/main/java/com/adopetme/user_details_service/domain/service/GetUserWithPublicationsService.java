package com.adopetme.user_details_service.domain.service;

import com.adopetme.user_details_service.domain.UserDetails;
import com.adopetme.user_details_service.domain.dao.UserDetailsDAO;
import com.adopetme.user_details_service.domain.dto.Publication;
import com.adopetme.user_details_service.domain.dto.UserDetailsWithPublications;
import com.adopetme.user_details_service.domain.exception.UserNotFoundException;
import com.adopetme.user_details_service.persistence.webclient.PublicationServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetUserWithPublicationsService {

    @Autowired
    private final UserDetailsDAO userDetailsDAO;
    @Autowired
    private final PublicationServiceClient publicationServiceClient;

    public UserDetailsWithPublications getUserWithPublications(int userId) {
        Optional<UserDetails> userDetails = userDetailsDAO.getUserDetailsByID(userId);

        if (userDetails.isEmpty()) {
            throw new UserNotFoundException("El usuario no fue encontrado o no existe");
        }

        ResponseEntity<List<Publication>> publicationsResponse = publicationServiceClient.getPublicationsByUserId((long) userId);
        List<Publication> publications = publicationsResponse.getBody();

        UserDetailsWithPublications dto = new UserDetailsWithPublications();
        dto.setUserDetails(userDetails.get());
        dto.setPublications(publications);

        return dto;
    }
}