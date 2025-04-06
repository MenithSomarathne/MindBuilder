package com.example.mindbuilderbackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ParentDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private List<StudentDTO> children;
}
