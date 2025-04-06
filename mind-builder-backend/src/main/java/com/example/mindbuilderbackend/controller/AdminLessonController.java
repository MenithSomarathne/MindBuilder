package com.example.mindbuilderbackend.controller;

import com.example.mindbuilderbackend.dto.AdminLessonDTO;
import com.example.mindbuilderbackend.dto.AdminLessonRequest;
import com.example.mindbuilderbackend.service.AdminLessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/lessons")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AdminLessonController {

    private final AdminLessonService adminLessonService;

    @PostMapping
    public ResponseEntity<AdminLessonDTO> createLesson(@RequestBody AdminLessonRequest request) {
        AdminLessonDTO lesson = adminLessonService.createLesson(request);
        return new ResponseEntity<>(lesson, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminLessonDTO> getLessonById(@PathVariable Long id) {
        AdminLessonDTO lesson = adminLessonService.getLessonById(id);
        return ResponseEntity.ok(lesson);
    }

    @GetMapping
    public ResponseEntity<List<AdminLessonDTO>> getAllLessons() {
        List<AdminLessonDTO> lessons = adminLessonService.getAllLessons();
        return ResponseEntity.ok(lessons);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminLessonDTO> updateLesson(
            @PathVariable Long id,
            @RequestBody AdminLessonRequest request) {
        AdminLessonDTO updatedLesson = adminLessonService.updateLesson(id, request);
        return ResponseEntity.ok(updatedLesson);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        adminLessonService.deleteLesson(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status/{status}")
    public ResponseEntity<AdminLessonDTO> changeLessonStatus(
            @PathVariable Long id,
            @PathVariable String status) {
        AdminLessonDTO lesson = adminLessonService.changeLessonStatus(id, status);
        return ResponseEntity.ok(lesson);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AdminLessonDTO>> getLessonsByStatus(@PathVariable String status) {
        List<AdminLessonDTO> lessons = adminLessonService.getLessonsByStatus(status);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/active")
    public ResponseEntity<List<AdminLessonDTO>> getActiveLessons() {
        List<AdminLessonDTO> lessons = adminLessonService.getActiveLessons();
        return ResponseEntity.ok(lessons);
    }

    @PatchMapping("/{id}/view")
    public ResponseEntity<AdminLessonDTO> incrementViewCount(@PathVariable Long id) {
        AdminLessonDTO lesson = adminLessonService.incrementViewCount(id);
        return ResponseEntity.ok(lesson);
    }

    @PatchMapping("/{id}/purchase")
    public ResponseEntity<AdminLessonDTO> incrementPurchaseCount(@PathVariable Long id) {
        AdminLessonDTO lesson = adminLessonService.incrementPurchaseCount(id);
        return ResponseEntity.ok(lesson);
    }
}
