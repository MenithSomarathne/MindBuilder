package com.example.mindbuilderbackend.dto;

import com.example.mindbuilderbackend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class AuthenticationResponse {
    private User userDetails;
    private String message;
    private boolean success;

    // Constructors
    public AuthenticationResponse() {}

    public AuthenticationResponse(User userDetails, String message, boolean success) {
        this.userDetails = userDetails;
        this.message = message;
        this.success = success;
    }

    // Getters and Setters
    public User getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(User userDetails) {
        this.userDetails = userDetails;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
