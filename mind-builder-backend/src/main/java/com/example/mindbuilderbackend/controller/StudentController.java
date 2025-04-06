package com.example.mindbuilderbackend.controller;

import com.example.mindbuilderbackend.dto.RegisterRequest;
import com.example.mindbuilderbackend.dto.StudentDTO;
import com.example.mindbuilderbackend.model.Parent;
import com.example.mindbuilderbackend.model.Student;
import com.example.mindbuilderbackend.service.ParentService;
import com.example.mindbuilderbackend.service.StudentService;
import com.example.mindbuilderbackend.util.StudentMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("*")
public class StudentController {

    private final StudentService studentService;

    private final ParentService parentService;
    public StudentController(StudentService studentService, ParentService parentService) {
        this.studentService = studentService;
        this.parentService = parentService;
    }

    @PostMapping("/register")
    public ResponseEntity<StudentDTO> registerStudent(@RequestBody RegisterRequest request) {
        Student student = new Student();
        student.setName(request.getName());
        student.setEmail(request.getEmail());
        student.setImgUrl(request.getImgUrl());
        student.setPassword(request.getPassword());
        if (request.getParentId() != null) {
            Parent parent = parentService.getParentEntityById(request.getParentId());
            student.setParent(parent);
        }

        Student registeredStudent = studentService.registerStudent(student);
        return new ResponseEntity<>(StudentMapper.toDTO(registeredStudent), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(StudentMapper.toDTO(student));
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        List<StudentDTO> dtos = students.stream()
                .map(StudentMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }


    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<StudentDTO>> getStudentsByParent(@PathVariable Long parentId) {
        List<Student> students = studentService.getStudentsByParent(parentId);
        List<StudentDTO> dtos = students.stream()
                .map(StudentMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO dto) {
        dto.setId(id);
        Student student = StudentMapper.toEntity(dto);
        Student updatedStudent = studentService.updateStudent(student);
        return ResponseEntity.ok(StudentMapper.toDTO(updatedStudent));
    }

    @PatchMapping("/{id}/rank")
    public ResponseEntity<StudentDTO> updateStudentRank(@PathVariable Long id, @RequestParam Integer rank) {
        Student updatedStudent = studentService.updateStudentRank(id, rank);
        return ResponseEntity.ok(StudentMapper.toDTO(updatedStudent));
    }

    @PatchMapping("/{id}/marks")
    public ResponseEntity<StudentDTO> updateStudentTotalMarks(@PathVariable Long id, @RequestParam Integer totalMarks) {
        Student updatedStudent = studentService.updateStudentTotalMarks(id, totalMarks);
        return ResponseEntity.ok(StudentMapper.toDTO(updatedStudent));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}