package com.example.mindbuilderbackend.dto;

import lombok.Data;

import java.util.List;

@Data
public class IQGameResponseDTO {
    private Long gameId;
    private Long teacherId;
    private String teacherName;
    private String title;
    private String difficultyLevel;
    private List<Long> lessonIds;
    private List<Long> resultIds;
}