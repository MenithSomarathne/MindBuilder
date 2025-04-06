package com.example.mindbuilderbackend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String imgUrl;
    private String password;
    private Long parentId;
}