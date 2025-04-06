package com.example.mindbuilderbackend.util;

import com.example.mindbuilderbackend.dto.ParentDTO;
import com.example.mindbuilderbackend.dto.StudentDTO;
import com.example.mindbuilderbackend.model.Parent;
import com.example.mindbuilderbackend.model.Student;

import java.util.List;
import java.util.stream.Collectors;

public class ParentMapper {

    public static ParentDTO toDTO(Parent parent) {
        if (parent == null) {
            return null;
        }

        ParentDTO parentDTO = new ParentDTO();
        parentDTO.setId(parent.getId());
        parentDTO.setName(parent.getName());
        parentDTO.setEmail(parent.getEmail());

        // Map children if they exist
        if (parent.getChildren() != null) {
            List<StudentDTO> childrenDTOs = parent.getChildren().stream()
                    .map(StudentMapper::toDTO)
                    .collect(Collectors.toList());
            parentDTO.setChildren(childrenDTOs);
        }

        return parentDTO;
    }

    // Basic DTO without children to avoid circular references
    public static ParentDTO toBasicDTO(Parent parent) {
        if (parent == null) {
            return null;
        }

        ParentDTO parentDTO = new ParentDTO();
        parentDTO.setId(parent.getId());
        parentDTO.setName(parent.getName());
        parentDTO.setEmail(parent.getEmail());

        return parentDTO;
    }

    public static Parent toEntity(ParentDTO parentDTO) {
        if (parentDTO == null) {
            return null;
        }

        Parent parent = new Parent();
        parent.setId(parentDTO.getId());
        parent.setName(parentDTO.getName());
        parent.setEmail(parentDTO.getEmail());

        // Note: Password should be handled separately in the service layer
        // Note: Children relationships should be managed through separate operations

        return parent;
    }
}