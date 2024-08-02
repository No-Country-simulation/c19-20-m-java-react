package com.adopetme.user_details_service.domain.service;

import com.adopetme.user_details_service.domain.UserDetails;
import com.adopetme.user_details_service.domain.dao.UserDetailsDAO;
import com.adopetme.user_details_service.domain.dto.AllNames;
import com.adopetme.user_details_service.domain.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetUserByIdService {

    @Autowired
    private final UserDetailsDAO userDetailsDAO;
    @Autowired
    private final LocationDetailsService locationDetailsService;

    public GetUserByIdService(UserDetailsDAO userDetailsDao, LocationDetailsService locationDetailsService) {
        this.userDetailsDAO = userDetailsDao;
        this.locationDetailsService = locationDetailsService;
    }

    public Optional<UserDetails> execute(int id) {

        // Obtén los detalles del usuario desde el DAO
        Optional<UserDetails> userDetailsOptional = userDetailsDAO.getUserDetailsByID(id);

        if (userDetailsOptional.isEmpty()) {
            throw new UserNotFoundException("El usuario no fue encontrado o no existe");
        }

        UserDetails userDetails = userDetailsOptional.get();

        // Obtén los nombres de ubicación si el usuario tiene ubicaciones definidas
        AllNames locationNames = locationDetailsService.getLocationNamesById(
                Long.valueOf(userDetails.getCountry()),
                Long.valueOf(userDetails.getState()),
                Long.valueOf(userDetails.getCity())
        );

        // Actualiza los nombres de ubicación en el objeto UserDetails
        userDetails.setCountry(locationNames.getName_country());
        userDetails.setState(locationNames.getName_state());
        userDetails.setCity(locationNames.getName_city());

        return Optional.of(userDetails);
    }
}
