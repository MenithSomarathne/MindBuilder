package com.example.mindbuilderbackend.model;

import jakarta.persistence.*;
import lombok.*;



@Getter
@Setter
@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends User {
}