package com.example.mindbuilderbackend.service;

import com.example.mindbuilderbackend.dto.ParentPurchasesDto;
import com.example.mindbuilderbackend.dto.PurchaseLessonRequest;
import com.example.mindbuilderbackend.dto.PurchaseLessonResponse;
import com.example.mindbuilderbackend.exception.ResourceNotFoundException;
import com.example.mindbuilderbackend.model.Lesson;
import com.example.mindbuilderbackend.model.Parent;
import com.example.mindbuilderbackend.model.ParentLessonPurchase;
import com.example.mindbuilderbackend.model.Student;
import com.example.mindbuilderbackend.repository.LessonRepository;
import com.example.mindbuilderbackend.repository.ParentLessonPurchaseRepository;
import com.example.mindbuilderbackend.repository.ParentRepository;
import com.example.mindbuilderbackend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParentLessonPurchaseService {

    private final ParentLessonPurchaseRepository purchaseRepository;
    private final ParentRepository parentRepository;
    private final LessonRepository lessonRepository;

    @Transactional
    public PurchaseLessonResponse purchaseLesson(PurchaseLessonRequest request) {
        // Validate parent and lesson exist
        Parent parent = parentRepository.findById(request.getParentId())
                .orElseThrow(() -> new ResourceNotFoundException("Parent not found with id: " + request.getParentId()));

        Lesson lesson = lessonRepository.findById(request.getLessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + request.getLessonId()));

        // Check if already purchased
        if (purchaseRepository.existsByParentIdAndLesson_LessonId(
                parent.getId(), lesson.getLessonId())) {
            throw new IllegalArgumentException("This lesson has already been purchased by this parent");
        }

        // Create and save purchase record
        ParentLessonPurchase purchase = ParentLessonPurchase.builder()
                .parent(parent)
                .lesson(lesson)
                .purchaseDate(LocalDateTime.now())
                .purchasePrice(lesson.getPrice())
                .currency(lesson.getCurrency())
                .isActive(true)
                .build();

        ParentLessonPurchase savedPurchase = purchaseRepository.save(purchase);

        // Update lesson purchase count
        lesson.setPurchaseCount(lesson.getPurchaseCount() + 1);
        lessonRepository.save(lesson);

        return mapToPurchaseResponse(savedPurchase);
    }

    public List<ParentPurchasesDto> getPurchasesByParent(Long parentId) {
        List<ParentLessonPurchase> purchases = purchaseRepository.findByParentId(parentId);
        return purchases.stream()
                .map(this::mapToParentPurchasesDto)
                .collect(Collectors.toList());
    }

    private PurchaseLessonResponse mapToPurchaseResponse(ParentLessonPurchase purchase) {
        PurchaseLessonResponse response = new PurchaseLessonResponse();
        response.setPurchaseId(purchase.getId());
        response.setParentId(purchase.getParent().getId());
        response.setLessonId(purchase.getLesson().getLessonId());
        response.setLessonTitle(purchase.getLesson().getTitle());
        response.setPurchaseDate(purchase.getPurchaseDate());
        response.setPurchasePrice(purchase.getPurchasePrice());
        response.setCurrency(purchase.getCurrency());
        return response;
    }

    private ParentPurchasesDto mapToParentPurchasesDto(ParentLessonPurchase purchase) {
        ParentPurchasesDto dto = new ParentPurchasesDto();
        dto.setPurchaseId(purchase.getId());
        dto.setLessonId(purchase.getLesson().getLessonId());
        dto.setLessonTitle(purchase.getLesson().getTitle());
        dto.setLessonDescription(purchase.getLesson().getDescription());
        dto.setPurchasePrice(purchase.getPurchasePrice());
        dto.setCurrency(purchase.getCurrency());
        dto.setPurchaseDate(purchase.getPurchaseDate());
        return dto;
    }

    public List<Long> getPurchasedLessonIdsByParent(Long parentId) {
        return purchaseRepository.findByParentId(parentId)
                .stream()
                .map(purchase -> purchase.getLesson().getLessonId())
                .distinct() // Optional: if you want unique lesson IDs
                .collect(Collectors.toList());
    }
}