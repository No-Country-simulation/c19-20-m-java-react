package com.adopetme.user_details_service.persistence.config;
import com.adopetme.user_details_service.domain.dao.UserDetailsDAO;
import com.adopetme.user_details_service.domain.service.CreateUserService;
import com.adopetme.user_details_service.domain.service.DeleteUserByIdService;
import com.adopetme.user_details_service.domain.service.GetUserByIdService;
import com.adopetme.user_details_service.domain.service.LocationDetailsService;
import com.adopetme.user_details_service.persistence.webclient.CountryServiceClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Bean
    public GetUserByIdService getUserByIdService (UserDetailsDAO userDetailsDAO, LocationDetailsService locationDetailsService){
        return new GetUserByIdService(userDetailsDAO, locationDetailsService);
    }
    @Bean
    public CreateUserService createUserService (UserDetailsDAO userDetailsDAO, CountryServiceClient countryServiceClient){
        return new CreateUserService(userDetailsDAO, countryServiceClient);}
    @Bean
    public DeleteUserByIdService deleteUserByIdService(UserDetailsDAO userDetailsDAO, GetUserByIdService getUserByIdService){
        return new DeleteUserByIdService(userDetailsDAO,getUserByIdService);
    }



}
