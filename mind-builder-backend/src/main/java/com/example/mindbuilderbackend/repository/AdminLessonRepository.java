package com.example.mindbuilderbackend.repository;

import com.example.mindbuilderbackend.model.AdminLesson;
import com.example.mindbuilderbackend.model.enums.LessonStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminLessonRepository extends JpaRepository<AdminLesson, Long> {
    List<AdminLesson> findByIsActive(Boolean isActive);
    List<AdminLesson> findByStatus(LessonStatus status);
    List<AdminLesson> findByDifficultyLevel(String difficultyLevel);
    List<AdminLesson> findByMinRecommendedAgeLessThanEqualAndMaxRecommendedAgeGreaterThanEqual(Integer age, Integer age2);
}
