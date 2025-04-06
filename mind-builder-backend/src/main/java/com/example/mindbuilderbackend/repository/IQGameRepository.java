package com.example.mindbuilderbackend.repository;

import com.example.mindbuilderbackend.model.IQGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IQGameRepository extends JpaRepository<IQGame, Long> {
    List<IQGame> findByTeacherId(Long teacherId);
    List<IQGame> findByDifficultyLevel(String difficultyLevel);
    List<IQGame> findByTitleContainingIgnoreCase(String title);
}