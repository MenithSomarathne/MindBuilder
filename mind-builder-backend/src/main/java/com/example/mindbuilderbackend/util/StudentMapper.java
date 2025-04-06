package com.example.mindbuilderbackend.util;

import com.example.mindbuilderbackend.dto.ParentDTO;
import com.example.mindbuilderbackend.dto.StudentDTO;
import com.example.mindbuilderbackend.model.Student;

public class StudentMapper {
    public static StudentDTO toDTO(Student student) {
        if (student == null) {
            return null;
        }

        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setRank(student.getStudentRank());
        dto.setImgUrl(student.getImgUrl());
        dto.setTotalMarks(student.getTotalMarks());

        // Map parent to ParentDTO if exists
        if (student.getParent() != null) {
            dto.setParent(ParentMapper.toBasicDTO(student.getParent()));
        }

        return dto;
    }

    public static Student toEntity(StudentDTO dto) {
        if (dto == null) {
            return null;
        }

        Student student = new Student();
        student.setId(dto.getId());
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setImgUrl(dto.getImgUrl());
        student.setStudentRank(dto.getRank());
        student.setTotalMarks(dto.getTotalMarks());

        // Note: Parent relationship should be handled separately in service layer
        // Note: Password should be handled separately in service layer

        return student;
    }
}