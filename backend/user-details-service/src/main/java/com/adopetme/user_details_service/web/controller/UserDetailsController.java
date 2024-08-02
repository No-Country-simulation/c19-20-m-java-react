package com.adopetme.user_details_service.web.controller;

import com.adopetme.user_details_service.domain.UserDetails;
import com.adopetme.user_details_service.domain.dto.AllNames;
import com.adopetme.user_details_service.domain.dto.CreateUpdateUser;
import com.adopetme.user_details_service.domain.dto.UserDetailsWithPublications;
import com.adopetme.user_details_service.domain.service.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users_details")
public class UserDetailsController {

    @Autowired
    private final GetUserByIdService getUserByIdService;
    @Autowired
    private final CreateUserService createUserService;
    @Autowired
    private final DeleteUserByIdService deleteUserByIdService;
    @Autowired
    private final LocationDetailsService locationDetailsService;
    @Autowired
    private final GetUserWithPublicationsService getUserWithPublicationsService;
    @Autowired
    private UpdateUserDetailsService  updateUserDetailsService;


    public UserDetailsController(GetUserByIdService getUserByIdService, CreateUserService createUserService, DeleteUserByIdService deleteUserByIdService, LocationDetailsService locationDetailsService, GetUserWithPublicationsService getUserWithPublicationsService) {
        this.getUserByIdService = getUserByIdService;
        this.createUserService = createUserService;
        this.deleteUserByIdService = deleteUserByIdService;
        this.locationDetailsService = locationDetailsService;
        this.getUserWithPublicationsService = getUserWithPublicationsService;
    }


    //OBTENER UN USUARIO POR ID

    @GetMapping("/{id}")
    @ApiOperation(value = "Search a product with an ID")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 404, message = "User not found")
    })
    public ResponseEntity<UserDetails> getUserDetails(
            @ApiParam(value = "The id of the user", required = true, example = "7") @PathVariable("id") int id) {
        return getUserByIdService.execute(id)
                .map(userDetails -> new ResponseEntity<>(userDetails, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //CREAR UN NUEVO USUARIO

   @PostMapping("/save")
   public ResponseEntity<Integer> save(@RequestBody UserDetails userDetails) {
       return new ResponseEntity<>(createUserService.execute(userDetails), HttpStatus.CREATED);
   }

   //ELIMINAR UN USUARIO POR ID

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable("id") int userDetailsId) {
        if (deleteUserByIdService.delete(userDetailsId)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    //OBTENER LOS DETALLES DE UBICACION

    @GetMapping("/namesbyid/{idcountry}/{idstate}/{idcity}")
    public ResponseEntity<AllNames> getLocationNames(@PathVariable("idcountry") Long countryId,
                                                         @PathVariable("idstate") Long stateId,
                                                         @PathVariable("idcity") Long cityId) {
        AllNames locationNames = locationDetailsService.getLocationNamesById(countryId, stateId, cityId);
        return ResponseEntity.ok(locationNames);
    }

    //OBTENER UN USUARIO Y SUS PUBLICACIONES CON EL ID DE USUARIO

    @GetMapping("/{id}/publications")
    public ResponseEntity<UserDetailsWithPublications> getUserWithPublications(@PathVariable Long id) {
        UserDetailsWithPublications userWithPublications = getUserWithPublicationsService.getUserWithPublications(Math.toIntExact(id));
        return ResponseEntity.ok(userWithPublications);
    }

    //REALIZAR CAMBIOS EN LOS DETALLES DE UN USUARIO POR ID

    @PutMapping("/edit/{id}")
    public ResponseEntity<Integer> updateUser(@PathVariable int id, @RequestBody CreateUpdateUser userDTO) {
        Integer updatedUserId = updateUserDetailsService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUserId);
    }


}
