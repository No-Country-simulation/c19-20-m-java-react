package com.adopetme.user_details_service.persistence.dao;

import com.adopetme.user_details_service.domain.UserDetails;
import com.adopetme.user_details_service.domain.dao.UserDetailsDAO;
import com.adopetme.user_details_service.persistence.crud.UserDetailsRepositoryJPA;
import com.adopetme.user_details_service.persistence.entity.User_Details;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public class UserDetailsDaoImp implements UserDetailsDAO {

    @Autowired
    private  UserDetailsRepositoryJPA userDetailsRepositoryJPA;

    private ModelMapper mapper = new ModelMapper();



    @Override
    public Optional<UserDetails> getUserDetailsByID(int id) {
       Optional<User_Details> userDetails =  userDetailsRepositoryJPA.findById(id);
        return userDetails.map(user_details -> mapper.map(user_details, UserDetails.class));
    }
    @Override
    public Integer save(UserDetails userDetails) {
        User_Details user = mapper.map(userDetails,User_Details.class);
        User_Details userSave = userDetailsRepositoryJPA.save(user);
        return userSave.getId();}

    @Override
    public void delete(int idUserDetails) {
          userDetailsRepositoryJPA.deleteById(idUserDetails);
    }
}
