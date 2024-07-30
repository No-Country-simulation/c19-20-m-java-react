package com.adopetme.user_details_service.domain.dao;

import com.adopetme.user_details_service.domain.UserDetails;

import java.util.Optional;


public interface UserDetailsDAO {

    Optional<UserDetails> getUserDetailsByID(int id);

    Integer save(UserDetails userDetails);

    void delete (int idUserDetails);
}
