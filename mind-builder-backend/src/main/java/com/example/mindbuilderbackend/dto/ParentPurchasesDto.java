package com.example.mindbuilderbackend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ParentPurchasesDto {
    private Long purchaseId;
    private Long lessonId;
    private String lessonTitle;
    private String lessonDescription;
    private Double purchasePrice;
    private String currency;
    private LocalDateTime purchaseDate;
}
