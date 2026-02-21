package com.doguhanerbil.mini_tasks.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doguhanerbil.mini_tasks.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

}
