package com.example.mindbuilderbackend.dto;

import lombok.Data;

@Data
public class PurchaseLessonRequest {
    private Long parentId;
    private Long lessonId;
}