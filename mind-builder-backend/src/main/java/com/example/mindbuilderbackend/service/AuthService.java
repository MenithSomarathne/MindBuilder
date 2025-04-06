package com.example.mindbuilderbackend.service;

import com.example.mindbuilderbackend.dto.AuthenticationRequest;
import com.example.mindbuilderbackend.dto.AuthenticationResponse;
import com.example.mindbuilderbackend.model.User;
import com.example.mindbuilderbackend.repository.StudentRepository;
import com.example.mindbuilderbackend.repository.UserRepository;
import com.fasterxml.jackson.databind.annotation.JacksonStdImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,StudentRepository studentRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
    }

    @Transactional
    public AuthenticationResponse authenticateUser(AuthenticationRequest authenticationRequest) {
        try {
            System.out.println("Authenticating user");
            System.out.println(authenticationRequest.getEmail());
            System.out.println(authenticationRequest.getPassword());

            System.out.println("User authenticated");
            User user = userRepository.findByEmail(authenticationRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found after authentication"));


            System.out.println("User found: " + user.getEmail());
            return new AuthenticationResponse(
                    user,
                    "Login successful",
                    true
            );



        } catch (Exception e) {
            return new AuthenticationResponse(
                    null,
                    "Invalid email or password",
                    false
            );
        }
    }
}
