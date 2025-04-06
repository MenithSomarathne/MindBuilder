package com.example.mindbuilderbackend.service;

import com.example.mindbuilderbackend.dto.AdminLessonDTO;
import com.example.mindbuilderbackend.dto.AdminLessonRequest;
import com.example.mindbuilderbackend.exception.ResourceNotFoundException;
import com.example.mindbuilderbackend.model.AdminLesson;
import com.example.mindbuilderbackend.model.IQGame;
import com.example.mindbuilderbackend.model.enums.LessonStatus;
import com.example.mindbuilderbackend.repository.AdminLessonRepository;
import com.example.mindbuilderbackend.repository.IQGameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminLessonService {

    private final AdminLessonRepository adminLessonRepository;
    private final IQGameRepository iqGameRepository;

    @Transactional
    public AdminLessonDTO createLesson(AdminLessonRequest request) {
        IQGame game = iqGameRepository.findById(request.getGameId())
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id: " + request.getGameId()));

        AdminLesson lesson = mapRequestToEntity(request);
        lesson.setIqGame(game);
        AdminLesson savedLesson = adminLessonRepository.save(lesson);

        return mapEntityToDTO(savedLesson);
    }

    public AdminLessonDTO getLessonById(Long id) {
        AdminLesson lesson = adminLessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));
        return mapEntityToDTO(lesson);
    }

    public List<AdminLessonDTO> getAllLessons() {
        return adminLessonRepository.findAll().stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public AdminLessonDTO updateLesson(Long id, AdminLessonRequest request) {
        AdminLesson existingLesson = adminLessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));

        IQGame game = iqGameRepository.findById(request.getGameId())
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id: " + request.getGameId()));

        updateEntityFromRequest(request, existingLesson);
        existingLesson.setIqGame(game);
        AdminLesson updatedLesson = adminLessonRepository.save(existingLesson);

        return mapEntityToDTO(updatedLesson);
    }

    @Transactional
    public void deleteLesson(Long id) {
        AdminLesson lesson = adminLessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));
        adminLessonRepository.delete(lesson);
    }

    @Transactional
    public AdminLessonDTO changeLessonStatus(Long id, String status) {
        AdminLesson lesson = adminLessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));

        lesson.setStatus(LessonStatus.valueOf(status.toUpperCase()));
        AdminLesson updatedLesson = adminLessonRepository.save(lesson);

        return mapEntityToDTO(updatedLesson);
    }

    public List<AdminLessonDTO> getLessonsByStatus(String status) {
        return adminLessonRepository.findByStatus(LessonStatus.valueOf(status.toUpperCase())).stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public List<AdminLessonDTO> getActiveLessons() {
        return adminLessonRepository.findByIsActive(true).stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public AdminLessonDTO incrementViewCount(Long id) {
        AdminLesson lesson = adminLessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));

        lesson.setViewCount(lesson.getViewCount() + 1);
        AdminLesson updatedLesson = adminLessonRepository.save(lesson);

        return mapEntityToDTO(updatedLesson);
    }

    @Transactional
    public AdminLessonDTO incrementPurchaseCount(Long id) {
        AdminLesson lesson = adminLessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found with id: " + id));

        lesson.setPurchaseCount(lesson.getPurchaseCount() + 1);
        AdminLesson updatedLesson = adminLessonRepository.save(lesson);

        return mapEntityToDTO(updatedLesson);
    }

    // Helper methods for manual mapping
    private AdminLesson mapRequestToEntity(AdminLessonRequest request) {
        AdminLesson lesson = new AdminLesson();
        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        lesson.setPrice(request.getPrice());
        lesson.setCurrency(request.getCurrency());
        lesson.setIsFree(request.getIsFree());
        lesson.setDurationMinutes(request.getDurationMinutes());
        lesson.setDifficultyLevel(request.getDifficultyLevel());
        lesson.setMinRecommendedAge(request.getMinRecommendedAge());
        lesson.setMaxRecommendedAge(request.getMaxRecommendedAge());
        lesson.setIsActive(request.getIsActive());
        lesson.setIsPurchasable(request.getIsPurchasable());
        lesson.setVideoUrl(request.getVideoUrl());
        lesson.setThumbnailUrl(request.getThumbnailUrl());
        lesson.setStatus(request.getStatus());
        return lesson;
    }

    private AdminLessonDTO mapEntityToDTO(AdminLesson lesson) {
        AdminLessonDTO dto = new AdminLessonDTO();
        dto.setLessonId(lesson.getLessonId());
        dto.setGameId(lesson.getIqGame().getGameId());
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setPrice(lesson.getPrice());
        dto.setCurrency(lesson.getCurrency());
        dto.setIsFree(lesson.getIsFree());
        dto.setDurationMinutes(lesson.getDurationMinutes());
        dto.setDifficultyLevel(lesson.getDifficultyLevel());
        dto.setMinRecommendedAge(lesson.getMinRecommendedAge());
        dto.setMaxRecommendedAge(lesson.getMaxRecommendedAge());
        dto.setIsActive(lesson.getIsActive());
        dto.setCreatedDate(lesson.getCreatedDate());
        dto.setIsPurchasable(lesson.getIsPurchasable());
        dto.setVideoUrl(lesson.getVideoUrl());
        dto.setThumbnailUrl(lesson.getThumbnailUrl());
        dto.setViewCount(lesson.getViewCount());
        dto.setPurchaseCount(lesson.getPurchaseCount());
        dto.setStatus(lesson.getStatus());
        return dto;
    }

    private void updateEntityFromRequest(AdminLessonRequest request, AdminLesson lesson) {
        if (request.getTitle() != null) {
            lesson.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            lesson.setDescription(request.getDescription());
        }
        if (request.getPrice() != null) {
            lesson.setPrice(request.getPrice());
        }
        if (request.getCurrency() != null) {
            lesson.setCurrency(request.getCurrency());
        }
        if (request.getIsFree() != null) {
            lesson.setIsFree(request.getIsFree());
        }
        if (request.getDurationMinutes() != null) {
            lesson.setDurationMinutes(request.getDurationMinutes());
        }
        if (request.getDifficultyLevel() != null) {
            lesson.setDifficultyLevel(request.getDifficultyLevel());
        }
        if (request.getMinRecommendedAge() != null) {
            lesson.setMinRecommendedAge(request.getMinRecommendedAge());
        }
        if (request.getMaxRecommendedAge() != null) {
            lesson.setMaxRecommendedAge(request.getMaxRecommendedAge());
        }
        if (request.getIsActive() != null) {
            lesson.setIsActive(request.getIsActive());
        }
        if (request.getIsPurchasable() != null) {
            lesson.setIsPurchasable(request.getIsPurchasable());
        }
        if (request.getVideoUrl() != null) {
            lesson.setVideoUrl(request.getVideoUrl());
        }
        if (request.getThumbnailUrl() != null) {
            lesson.setThumbnailUrl(request.getThumbnailUrl());
        }
        if (request.getStatus() != null) {
            lesson.setStatus(request.getStatus());
        }
    }
}