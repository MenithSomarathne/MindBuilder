package com.example.mindbuilderbackend.controller;

import com.example.mindbuilderbackend.dto.ParentPurchasesDto;
import com.example.mindbuilderbackend.dto.PurchaseLessonRequest;
import com.example.mindbuilderbackend.dto.PurchaseLessonResponse;
import com.example.mindbuilderbackend.service.ParentLessonPurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parent-lesson-purchases")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ParentLessonPurchaseController {

    private final ParentLessonPurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<PurchaseLessonResponse> purchaseLesson(@RequestBody PurchaseLessonRequest request) {
        PurchaseLessonResponse response = purchaseService.purchaseLesson(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<ParentPurchasesDto>> getPurchasesByParent(@PathVariable Long parentId) {
        List<ParentPurchasesDto> purchases = purchaseService.getPurchasesByParent(parentId);
        return ResponseEntity.ok(purchases);
    }

    @GetMapping("/parent/{parentId}/lesson-ids")
    public ResponseEntity<List<Long>> getPurchasedLessonIdsByParent(@PathVariable Long parentId) {
        List<Long> lessonIds = purchaseService.getPurchasedLessonIdsByParent(parentId);
        return ResponseEntity.ok(lessonIds);
    }
}