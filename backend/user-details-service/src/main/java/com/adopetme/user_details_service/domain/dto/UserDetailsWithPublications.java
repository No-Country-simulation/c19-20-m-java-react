package com.adopetme.user_details_service.domain.dto;

import com.adopetme.user_details_service.domain.UserDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsWithPublications {
    private UserDetails userDetails;
    private List<Publication> publications;
}
