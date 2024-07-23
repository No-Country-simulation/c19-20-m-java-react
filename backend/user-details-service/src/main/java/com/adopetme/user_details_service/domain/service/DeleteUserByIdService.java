package com.adopetme.user_details_service.domain.service;

import com.adopetme.user_details_service.domain.dao.UserDetailsDAO;
import org.springframework.beans.factory.annotation.Autowired;

import java.awt.font.TextHitInfo;

public class DeleteUserByIdService {

    @Autowired
    private final UserDetailsDAO userDetailsDAO;
    @Autowired
    private final GetUserByIdService getUserByIdService;

    public DeleteUserByIdService(UserDetailsDAO userDetailsDAO,  GetUserByIdService getUserByIdService) {
        this.userDetailsDAO = userDetailsDAO;
        this.getUserByIdService=getUserByIdService;
    }

    public boolean delete(int userDetailsId) {
        return getUserByIdService.execute(userDetailsId).map(userDetails -> {
            userDetailsDAO.delete(userDetailsId);
            return true;
        }).orElse(false);
    }

}
