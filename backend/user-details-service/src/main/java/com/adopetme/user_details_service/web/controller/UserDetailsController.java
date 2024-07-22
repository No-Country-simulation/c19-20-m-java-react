package com.adopetme.user_details_service.web.controller;

import com.adopetme.user_details_service.domain.UserDetails;
import com.adopetme.user_details_service.domain.service.CreateUserService;
import com.adopetme.user_details_service.domain.service.DeleteUserByIdService;
import com.adopetme.user_details_service.domain.service.GetUserByIdService;
import com.adopetme.user_details_service.domain.service.UpdateUserByIdService;
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
    private GetUserByIdService getUserByIdService;
    @Autowired
    private CreateUserService createUserService;

    @Autowired
    private DeleteUserByIdService deleteUserByIdService;

    @GetMapping("/{id}")
    @ApiOperation(value = "Search a product with an ID")
    @ApiResponses({
            @ApiResponse(code=200,message="OK"),
            @ApiResponse(code=404 , message = "User not found")
    })
    public ResponseEntity<UserDetails> getUserDetails(@ApiParam(value = "The id of the product", required = true, example = "7")
                                              @PathVariable("id") int id) {
        return getUserByIdService.execute(id)
                .map(userDetails -> new ResponseEntity<>(userDetails, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/save")
    public ResponseEntity<UserDetails> save (@RequestBody UserDetails userDetails){
        return new ResponseEntity<>(createUserService.execute(userDetails),HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable("id") int userDetailsId) {
        if(deleteUserByIdService.delete(userDetailsId)){
            return new ResponseEntity(HttpStatus.OK);
        }else{
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }






}
