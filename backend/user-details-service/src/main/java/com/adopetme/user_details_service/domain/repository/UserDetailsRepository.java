package com.adopetme.user_details_service.domain.repository;

import com.adopetme.user_details_service.domain.UserDetails;

public interface UserDetailsRepository {

    UserDetails save (UserDetails userDetails);
}
