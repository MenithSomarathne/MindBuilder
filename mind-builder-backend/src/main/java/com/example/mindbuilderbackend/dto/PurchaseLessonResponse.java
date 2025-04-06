package com.example.mindbuilderbackend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PurchaseLessonResponse {
    private Long purchaseId;
    private Long parentId;
    private Long lessonId;
    private String lessonTitle;
    private LocalDateTime purchaseDate;
    private Double purchasePrice;
    private String currency;
}