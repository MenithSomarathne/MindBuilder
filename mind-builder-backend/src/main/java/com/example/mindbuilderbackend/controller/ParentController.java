package com.example.mindbuilderbackend.controller;

import com.example.mindbuilderbackend.dto.ParentDTO;
import com.example.mindbuilderbackend.dto.RegisterParentRequest;
import com.example.mindbuilderbackend.dto.StudentDTO;
import com.example.mindbuilderbackend.service.ParentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parents")
@CrossOrigin("*")
public class ParentController {

    private final ParentService parentService;

    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }

    @PostMapping("/register")
    public ResponseEntity<ParentDTO> registerParent(@RequestBody RegisterParentRequest request) {
        ParentDTO parentDTO = parentService.registerParent(request);
        return new ResponseEntity<>(parentDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ParentDTO>> getAllParents() {
        List<ParentDTO> parents = parentService.getAllParents();
        return ResponseEntity.ok(parents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParentDTO> getParentById(@PathVariable Long id) {
        ParentDTO parentDTO = parentService.getParentById(id);
        return ResponseEntity.ok(parentDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParentDTO> updateParent(@PathVariable Long id, @RequestBody ParentDTO parentDTO) {
        parentDTO.setId(id);
        ParentDTO updatedParent = parentService.updateParent(id, parentDTO);
        return ResponseEntity.ok(updatedParent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParent(@PathVariable Long id) {
        parentService.deleteParent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{parentId}/students")
    public ResponseEntity<List<StudentDTO>> getStudentsByParent(@PathVariable Long parentId) {
        ParentDTO parentDTO = parentService.getParentById(parentId);
        return ResponseEntity.ok(parentDTO.getChildren());
    }
}
