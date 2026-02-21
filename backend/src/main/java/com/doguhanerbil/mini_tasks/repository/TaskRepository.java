package com.doguhanerbil.mini_tasks.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doguhanerbil.mini_tasks.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
