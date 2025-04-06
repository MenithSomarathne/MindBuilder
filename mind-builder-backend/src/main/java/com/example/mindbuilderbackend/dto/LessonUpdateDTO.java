package com.example.mindbuilderbackend.dto;

import com.example.mindbuilderbackend.model.enums.LessonStatus;
import lombok.Data;

@Data
public class LessonUpdateDTO {
    private Long teacherId;
    private Long gameId;
    private String title;
    private String description;
    private Double price;
    private String currency;
    private Boolean isFree;
    private Integer durationMinutes;
    private String difficultyLevel;
    private Integer minRecommendedAge;
    private Integer maxRecommendedAge;
    private Boolean isActive;
    private Boolean isPurchasable;
    private String videoUrl;
    private String thumbnailUrl;
    private LessonStatus status;
}
