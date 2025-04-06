package com.example.mindbuilderbackend.service;

import com.example.mindbuilderbackend.exception.ResourceNotFoundException;
import com.example.mindbuilderbackend.model.Student;
import com.example.mindbuilderbackend.repository.StudentRepository;
import com.example.mindbuilderbackend.service.StudentService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService{

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Student registerStudent(Student student) {
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new IllegalStateException("Email already in use");
        }
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        return studentRepository.save(student);
    }


    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with email: " + email));
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Student> getStudentsByParent(Long parentId) {
        return studentRepository.findByParentId(parentId);
    }

    public Student updateStudent(Student student) {
        Student existingStudent = getStudentById(student.getId());

        if (student.getName() != null) {
            existingStudent.setName(student.getName());
        }
        if (student.getPassword() != null) {
            existingStudent.setPassword(passwordEncoder.encode(student.getPassword()));
        }
        if (student.getImgUrl() != null) {  // Add this condition
            existingStudent.setImgUrl(student.getImgUrl());
        }
        if (student.getParent() != null) {
            existingStudent.setParent(student.getParent());
        }

        return studentRepository.save(existingStudent);
    }

    public Student updateStudentRank(Long studentId, Integer rank) {
        Student student = getStudentById(studentId);
        student.setStudentRank(rank);
        return studentRepository.save(student);
    }

    public Student updateStudentTotalMarks(Long studentId, Integer totalMarks) {
        Student student = getStudentById(studentId);
        student.setTotalMarks(totalMarks);
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }
}