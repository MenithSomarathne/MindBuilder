package com.example.mindbuilderbackend.repository;

import com.example.mindbuilderbackend.model.ParentLessonPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParentLessonPurchaseRepository extends JpaRepository<ParentLessonPurchase, Long> {
    List<ParentLessonPurchase> findByParentId(Long parentId);
    List<ParentLessonPurchase> findByLesson_LessonId(Long lessonId);
    boolean existsByParentIdAndLesson_LessonId(Long parentId, Long lessonId);

    @Query("SELECT DISTINCT plp.lesson.lessonId FROM ParentLessonPurchase plp WHERE plp.parent.id = :parentId")
    List<Long> findPurchasedLessonIdsByParentId(@Param("parentId") Long parentId);

}