package com.example.mindbuilderbackend.repository;

import com.example.mindbuilderbackend.model.Parent;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {
    List<Parent> findAllByOrderByNameAsc();
    boolean existsByEmail(String email);

    @EntityGraph(attributePaths = {"children"})
    Optional<Parent> findById(Long id);

    @EntityGraph(attributePaths = {"children"})
    List<Parent> findAll();
}