// LessonController.java
package com.example.mindbuilderbackend.controller;

import com.example.mindbuilderbackend.dto.LessonCreateDTO;
import com.example.mindbuilderbackend.dto.LessonDTO;
import com.example.mindbuilderbackend.dto.LessonUpdateDTO;
import com.example.mindbuilderbackend.service.LessonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin("*")
public class LessonController {

    private final LessonService lessonService;

    @Autowired
    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping
    public ResponseEntity<List<LessonDTO>> getAllLessons() {
        return ResponseEntity.ok(lessonService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonDTO> getLessonById(@PathVariable Long id) {
        return ResponseEntity.ok(lessonService.findById(id));
    }

    @PostMapping
    public ResponseEntity<LessonDTO> createLesson(@Valid @RequestBody LessonCreateDTO lessonCreateDTO) {
        LessonDTO createdLesson = lessonService.create(lessonCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLesson);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LessonDTO> updateLesson(@PathVariable Long id,
                                                  @Valid @RequestBody LessonUpdateDTO lessonUpdateDTO) {
        return ResponseEntity.ok(lessonService.update(id, lessonUpdateDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        lessonService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}/purchased-by-parent")
    public ResponseEntity<List<LessonDTO>> getLessonsPurchasedByParent(@PathVariable Long studentId) {
        List<LessonDTO> lessons = lessonService.getLessonsPurchasedByStudentParent(studentId);
        return ResponseEntity.ok(lessons);
    }
}