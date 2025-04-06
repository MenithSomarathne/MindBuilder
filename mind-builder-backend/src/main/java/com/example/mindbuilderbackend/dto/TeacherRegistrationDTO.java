package com.example.mindbuilderbackend.dto;

import lombok.Data;

@Data
public class TeacherRegistrationDTO {
    private String name;
    private String email;
    private String password;
    private String imgUrl;
}
