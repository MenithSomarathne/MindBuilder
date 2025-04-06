package com.example.mindbuilderbackend.model;

import com.example.mindbuilderbackend.model.IQGame;
import com.example.mindbuilderbackend.model.Student;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "student_game_results")
public class StudentGameResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private IQGame game;

    private Integer score;

    private LocalDateTime datePlayed;
}