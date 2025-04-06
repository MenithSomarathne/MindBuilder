package com.example.mindbuilderbackend.dto;

import lombok.Data;

@Data
public class RegisterParentRequest {
    private String name;
    private String email;
    private String password;
}
