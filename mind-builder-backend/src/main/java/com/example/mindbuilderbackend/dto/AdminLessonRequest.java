package com.example.mindbuilderbackend.dto;

import com.example.mindbuilderbackend.model.enums.LessonStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class AdminLessonRequest {
    @NotNull
    private Long gameId;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @PositiveOrZero
    private Double price;

    private String currency = "USD";

    private Boolean isFree = false;

    @Positive
    private Integer durationMinutes;

    @NotBlank
    private String difficultyLevel;

    @Positive
    private Integer minRecommendedAge;

    @Positive
    private Integer maxRecommendedAge;

    private Boolean isActive = true;

    private Boolean isPurchasable = true;

    private String videoUrl;

    private String thumbnailUrl;

    private LessonStatus status = LessonStatus.PENDING;
}
