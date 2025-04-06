package com.example.mindbuilderbackend.dto;

import com.example.mindbuilderbackend.model.enums.LessonStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LessonDTO {
    private Long lessonId;
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
    private LocalDateTime createdDate;
    private Boolean isPurchasable;
    private String videoUrl;
    private String thumbnailUrl;
    private Integer viewCount;
    private Integer purchaseCount;
    private Long version;
    private LessonStatus status;
}
