package com.example.mindbuilderbackend.service;

import com.example.mindbuilderbackend.dto.ParentDTO;
import com.example.mindbuilderbackend.dto.RegisterParentRequest;
import com.example.mindbuilderbackend.exception.ResourceNotFoundException;
import com.example.mindbuilderbackend.model.Parent;
import com.example.mindbuilderbackend.repository.ParentRepository;
import com.example.mindbuilderbackend.util.ParentMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParentService {

    private final ParentRepository parentRepository;
    private final PasswordEncoder passwordEncoder;

    public ParentService(ParentRepository parentRepository, PasswordEncoder passwordEncoder) {
        this.parentRepository = parentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ParentDTO registerParent(RegisterParentRequest request) {
        if (parentRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        Parent parent = new Parent();
        parent.setName(request.getName());
        parent.setEmail(request.getEmail());
        parent.setPassword(passwordEncoder.encode(request.getPassword()));

        Parent savedParent = parentRepository.save(parent);
        return ParentMapper.toDTO(savedParent);
    }

    public List<ParentDTO> getAllParents() {
        return parentRepository.findAllByOrderByNameAsc().stream()
                .map(ParentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ParentDTO getParentById(Long id) {
        Parent parent = parentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parent not found with id: " + id));
        return ParentMapper.toDTO(parent);
    }

    public Parent getParentEntityById(Long id) {
        Parent parent = parentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parent not found with id: " + id));
        return parent;
    }

    public ParentDTO updateParent(Long id, ParentDTO parentDTO) {
        Parent existingParent = parentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Parent not found with id: " + id));

        existingParent.setName(parentDTO.getName());
        existingParent.setEmail(parentDTO.getEmail());
        if (parentDTO.getPassword() != null && !parentDTO.getPassword().isEmpty()) {
            existingParent.setPassword(passwordEncoder.encode(parentDTO.getPassword()));
        }

        Parent updatedParent = parentRepository.save(existingParent);
        return ParentMapper.toDTO(updatedParent);
    }

    public void deleteParent(Long id) {
        if (!parentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Parent not found with id: " + id);
        }
        parentRepository.deleteById(id);
    }
}
