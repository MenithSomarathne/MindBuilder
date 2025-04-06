package com.example.mindbuilderbackend.repository;

import com.example.mindbuilderbackend.model.StudentGameResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentGameResultRepository extends JpaRepository<StudentGameResult, Long> {
    List<StudentGameResult> findByStudentId(Long studentId);
    List<StudentGameResult> findByGame_GameId(Long gameId);
}