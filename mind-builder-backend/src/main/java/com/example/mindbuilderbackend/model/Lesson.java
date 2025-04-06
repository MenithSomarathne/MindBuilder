package com.example.mindbuilderbackend.model;

import com.example.mindbuilderbackend.model.enums.LessonStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lessonId;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private IQGame iqGame;

    private String title;

    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String currency = "USD";

    @Column(nullable = false)
    private Boolean isFree = false;

    @Column(nullable = false)
    private Integer durationMinutes;

    @Column(nullable = false)
    private String difficultyLevel;

    @Column(nullable = false)
    private Integer minRecommendedAge;

    @Column(nullable = false)
    private Integer maxRecommendedAge;

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean isPurchasable = true;

    private String videoUrl;
    private String thumbnailUrl;

    @Column(nullable = false)
    private Integer viewCount = 0;

    @Column(nullable = false)
    private Integer purchaseCount = 0;

    @Version
    private Long version;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LessonStatus status = LessonStatus.PENDING;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ParentLessonPurchase> purchases = new ArrayList<>();
}