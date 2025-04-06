package com.example.mindbuilderbackend.repository;

import com.example.mindbuilderbackend.model.Student;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByParentId(Long parentId);
    Optional<Student> findByEmail(String email);
    boolean existsByEmail(String email);

    @EntityGraph(attributePaths = {"parent"})
    List<Student> findAll();

    @EntityGraph(attributePaths = {"parent"})
    Optional<Student> findById(Long id);
}