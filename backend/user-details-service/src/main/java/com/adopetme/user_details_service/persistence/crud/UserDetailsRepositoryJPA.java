package com.adopetme.user_details_service.persistence.crud;

import com.adopetme.user_details_service.persistence.entity.User_Details;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserDetailsRepositoryJPA extends CrudRepository<User_Details, Integer> {


}
