package com.example.mindbuilderbackend.model;

import com.example.mindbuilderbackend.model.Student;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("PARENT")
public class Parent extends User {

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Student> children = new ArrayList<>();

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ParentLessonPurchase> lessonPurchases = new ArrayList<>();
}