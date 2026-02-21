package com.doguhanerbil.mini_tasks.service;

import org.springframework.stereotype.Service;

import com.doguhanerbil.mini_tasks.common.exception.ConflictException;
import com.doguhanerbil.mini_tasks.common.exception.UnauthorizedException;
import com.doguhanerbil.mini_tasks.dto.AuthResponse;
import com.doguhanerbil.mini_tasks.dto.LoginRequest;
import com.doguhanerbil.mini_tasks.dto.RegisterRequest;
import com.doguhanerbil.mini_tasks.entity.User;
import com.doguhanerbil.mini_tasks.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("User already exists: " + request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        boolean matches = passwordEncoder.matches(request.getPassword(),user.getPassword());

        if(!matches) {
            throw new UnauthorizedException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole());
        return new AuthResponse(token);
    }


}
