package com.example.mindbuilderbackend.dto;

import lombok.Data;

@Data
public class TeacherUpdateDTO {
    private Long id;
    private String name;
    private String email;
    private String imgUrl;
}
