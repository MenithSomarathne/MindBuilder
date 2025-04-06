package com.example.mindbuilderbackend.controller;

import com.example.mindbuilderbackend.dto.TeacherDTO;
import com.example.mindbuilderbackend.dto.TeacherRegistrationDTO;
import com.example.mindbuilderbackend.dto.TeacherUpdateDTO;
import com.example.mindbuilderbackend.service.TeacherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin("*")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping("/register")
    public ResponseEntity<TeacherDTO> registerTeacher(@RequestBody TeacherRegistrationDTO registrationDTO) {
        TeacherDTO teacherDTO = teacherService.registerTeacher(registrationDTO);
        return new ResponseEntity<>(teacherDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherDTO> getTeacherById(@PathVariable Long id) {
        TeacherDTO teacherDTO = teacherService.getTeacherById(id);
        return ResponseEntity.ok(teacherDTO);
    }

    @GetMapping
    public ResponseEntity<List<TeacherDTO>> getAllTeachers() {
        List<TeacherDTO> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @PutMapping
    public ResponseEntity<TeacherDTO> updateTeacher(@RequestBody TeacherUpdateDTO updateDTO) {
        TeacherDTO teacherDTO = teacherService.updateTeacher(updateDTO);
        return ResponseEntity.ok(teacherDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<TeacherDTO> getTeacherByEmail(@PathVariable String email) {
        TeacherDTO teacherDTO = teacherService.getTeacherByEmail(email);
        return ResponseEntity.ok(teacherDTO);
    }
}
