// LessonService.java
package com.example.mindbuilderbackend.service;

import com.example.mindbuilderbackend.model.IQGame;
import com.example.mindbuilderbackend.model.Lesson;
import com.example.mindbuilderbackend.dto.LessonCreateDTO;
import com.example.mindbuilderbackend.dto.LessonDTO;
import com.example.mindbuilderbackend.dto.LessonUpdateDTO;
import com.example.mindbuilderbackend.model.Teacher;
import com.example.mindbuilderbackend.model.enums.LessonStatus;
import com.example.mindbuilderbackend.repository.IQGameRepository;
import com.example.mindbuilderbackend.repository.LessonRepository;
import com.example.mindbuilderbackend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final TeacherRepository teacherRepository;
    private final IQGameRepository iqGameRepository;

    @Autowired
    public LessonService(LessonRepository lessonRepository,
                         TeacherRepository teacherRepository,
                         IQGameRepository iqGameRepository) {
        this.lessonRepository = lessonRepository;
        this.teacherRepository = teacherRepository;
        this.iqGameRepository = iqGameRepository;
    }

    @Transactional(readOnly = true)
    public List<LessonDTO> findAll() {
        return lessonRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LessonDTO findById(Long id) {
        return lessonRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Lesson not found with id: " + id));
    }

    @Transactional
    public LessonDTO create(LessonCreateDTO lessonCreateDTO) {
        Teacher teacher = teacherRepository.findById(lessonCreateDTO.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + lessonCreateDTO.getTeacherId()));

        IQGame iqGame = iqGameRepository.findById(lessonCreateDTO.getGameId())
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + lessonCreateDTO.getGameId()));

        Lesson lesson = new Lesson();
        lesson.setTeacher(teacher);
        lesson.setIqGame(iqGame);
        mapCreateDTOToEntity(lessonCreateDTO, lesson);

        Lesson savedLesson = lessonRepository.save(lesson);
        return convertToDTO(savedLesson);
    }

    @Transactional
    public LessonDTO update(Long id, LessonUpdateDTO lessonUpdateDTO) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found with id: " + id));

        if (lessonUpdateDTO.getTeacherId() != null) {
            Teacher teacher = teacherRepository.findById(lessonUpdateDTO.getTeacherId())
                    .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + lessonUpdateDTO.getTeacherId()));
            lesson.setTeacher(teacher);
        }

        if (lessonUpdateDTO.getGameId() != null) {
            IQGame iqGame = iqGameRepository.findById(lessonUpdateDTO.getGameId())
                    .orElseThrow(() -> new RuntimeException("Game not found with id: " + lessonUpdateDTO.getGameId()));
            lesson.setIqGame(iqGame);
        }

        mapUpdateDTOToEntity(lessonUpdateDTO, lesson);
        Lesson updatedLesson = lessonRepository.save(lesson);
        return convertToDTO(updatedLesson);
    }

    @Transactional
    public void delete(Long id) {
        if (!lessonRepository.existsById(id)) {
            throw new RuntimeException("Lesson not found with id: " + id);
        }
        lessonRepository.deleteById(id);
    }

    private LessonDTO convertToDTO(Lesson lesson) {
        LessonDTO dto = new LessonDTO();
        dto.setLessonId(lesson.getLessonId());
        dto.setTeacherId(lesson.getTeacher().getId());
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
        dto.setVideoUrl(lesson.getVideoUrl());
        dto.setThumbnailUrl(lesson.getThumbnailUrl());
        dto.setIsActive(lesson.getIsActive());
        dto.setCreatedDate(lesson.getCreatedDate());
        dto.setIsPurchasable(lesson.getIsPurchasable());
        dto.setViewCount(lesson.getViewCount());
        dto.setPurchaseCount(lesson.getPurchaseCount());
        dto.setVersion(lesson.getVersion());
        dto.setStatus(lesson.getStatus());
        return dto;
    }

    private void mapCreateDTOToEntity(LessonCreateDTO dto, Lesson lesson) {
        lesson.setTitle(dto.getTitle());
        lesson.setDescription(dto.getDescription());
        lesson.setPrice(dto.getPrice());
        lesson.setCurrency(dto.getCurrency());
        lesson.setIsFree(dto.getIsFree());
        lesson.setDurationMinutes(dto.getDurationMinutes());
        lesson.setDifficultyLevel(dto.getDifficultyLevel());
        lesson.setMinRecommendedAge(dto.getMinRecommendedAge());
        lesson.setMaxRecommendedAge(dto.getMaxRecommendedAge());
        lesson.setVideoUrl(dto.getVideoUrl());
        lesson.setThumbnailUrl(dto.getThumbnailUrl());
    }

    private void mapUpdateDTOToEntity(LessonUpdateDTO dto, Lesson lesson) {
        if (dto.getTitle() != null) {
            lesson.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            lesson.setDescription(dto.getDescription());
        }
        if (dto.getPrice() != null) {
            lesson.setPrice(dto.getPrice());
        }
        if (dto.getCurrency() != null) {
            lesson.setCurrency(dto.getCurrency());
        }
        if (dto.getIsFree() != null) {
            lesson.setIsFree(dto.getIsFree());
        }
        if (dto.getDurationMinutes() != null) {
            lesson.setDurationMinutes(dto.getDurationMinutes());
        }
        if (dto.getDifficultyLevel() != null) {
            lesson.setDifficultyLevel(dto.getDifficultyLevel());
        }
        if (dto.getMinRecommendedAge() != null) {
            lesson.setMinRecommendedAge(dto.getMinRecommendedAge());
        }
        if (dto.getMaxRecommendedAge() != null) {
            lesson.setMaxRecommendedAge(dto.getMaxRecommendedAge());
        }
        if (dto.getIsActive() != null) {
            lesson.setIsActive(dto.getIsActive());
        }
        if (dto.getIsPurchasable() != null) {
            lesson.setIsPurchasable(dto.getIsPurchasable());
        }
        if (dto.getVideoUrl() != null) {
            lesson.setVideoUrl(dto.getVideoUrl());
        }
        if (dto.getThumbnailUrl() != null) {
            lesson.setThumbnailUrl(dto.getThumbnailUrl());
        }
        if (dto.getStatus() != null) {
            lesson.setStatus(dto.getStatus());
        }
    }
}