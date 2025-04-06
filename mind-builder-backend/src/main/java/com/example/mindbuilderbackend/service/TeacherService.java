package com.example.mindbuilderbackend.service;

import com.example.mindbuilderbackend.dto.TeacherDTO;
import com.example.mindbuilderbackend.dto.TeacherRegistrationDTO;
import com.example.mindbuilderbackend.dto.TeacherUpdateDTO;
import com.example.mindbuilderbackend.exception.ResourceNotFoundException;
import com.example.mindbuilderbackend.model.Teacher;
import com.example.mindbuilderbackend.model.enums.Role;
import com.example.mindbuilderbackend.repository.TeacherRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import springfox.documentation.swagger2.mappers.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;

    public TeacherService(TeacherRepository teacherRepository,
                          PasswordEncoder passwordEncoder) {
        this.teacherRepository = teacherRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public TeacherDTO registerTeacher(TeacherRegistrationDTO registrationDTO) {
        if (teacherRepository.existsByEmail(registrationDTO.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        Teacher teacher = new Teacher();
        teacher.setName(registrationDTO.getName());
        teacher.setEmail(registrationDTO.getEmail());
        teacher.setImgUrl(registrationDTO.getImgUrl());
        teacher.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        teacher.setRole(Role.TEACHER);

        Teacher savedTeacher = teacherRepository.save(teacher);
        return convertToDTO(savedTeacher);
    }

    public TeacherDTO getTeacherById(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
        return convertToDTO(teacher);
    }

    public List<TeacherDTO> getAllTeachers() {
        return teacherRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TeacherDTO updateTeacher(TeacherUpdateDTO updateDTO) {
        Teacher existingTeacher = teacherRepository.findById(updateDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + updateDTO.getId()));

        existingTeacher.setName(updateDTO.getName());
        existingTeacher.setEmail(updateDTO.getEmail());
existingTeacher.setImgUrl(updateDTO.getImgUrl());
        Teacher updatedTeacher = teacherRepository.save(existingTeacher);
        return convertToDTO(updatedTeacher);
    }

    public void deleteTeacher(Long id) {
        if (!teacherRepository.existsById(id)) {
            throw new ResourceNotFoundException("Teacher not found with id: " + id);
        }
        teacherRepository.deleteById(id);
    }

    public TeacherDTO getTeacherByEmail(String email) {
        Teacher teacher = teacherRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with email: " + email));
        return convertToDTO(teacher);
    }
    private TeacherDTO convertToDTO(Teacher teacher) {
        TeacherDTO dto = new TeacherDTO();
        dto.setId(teacher.getId());
        dto.setName(teacher.getName());
        dto.setImgUrl(teacher.getImgUrl());
        dto.setEmail(teacher.getEmail());
        dto.setRole(teacher.getRole());
        return dto;
    }

    private Teacher convertToEntity(TeacherRegistrationDTO registrationDTO) {
        Teacher teacher = new Teacher();
        teacher.setName(registrationDTO.getName());
        teacher.setEmail(registrationDTO.getEmail());
        teacher.setImgUrl(registrationDTO.getImgUrl());
        teacher.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        teacher.setRole(Role.TEACHER);
        return teacher;
    }
}