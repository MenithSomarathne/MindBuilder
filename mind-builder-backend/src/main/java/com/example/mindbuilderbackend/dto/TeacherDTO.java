package com.example.mindbuilderbackend.dto;

import com.example.mindbuilderbackend.model.enums.Role;
import lombok.Data;

@Data
public class TeacherDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String imgUrl;
}