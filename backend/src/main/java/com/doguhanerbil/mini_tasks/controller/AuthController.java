package com.doguhanerbil.mini_tasks.controller;

import org.springframework.web.bind.annotation.RestController;

import com.doguhanerbil.mini_tasks.dto.AuthResponse;
import com.doguhanerbil.mini_tasks.dto.LoginRequest;
import com.doguhanerbil.mini_tasks.dto.RegisterRequest;
import com.doguhanerbil.mini_tasks.service.AuthService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

}
