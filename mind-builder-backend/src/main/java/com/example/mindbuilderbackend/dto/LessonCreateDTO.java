package com.example.mindbuilderbackend.dto;

import lombok.Data;

@Data
public class LessonCreateDTO {
    private Long teacherId;
    private Long gameId;
    private String title;
    private String description;
    private Double price;
    private String currency = "USD";
    private Boolean isFree = false;
    private Integer durationMinutes;
    private String difficultyLevel;
    private Integer minRecommendedAge;
    private Integer maxRecommendedAge;
    private String videoUrl;
    private String thumbnailUrl;
}