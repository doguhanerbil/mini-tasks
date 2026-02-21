package com.doguhanerbil.mini_tasks.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.doguhanerbil.mini_tasks.dto.TaskCreateRequest;
import com.doguhanerbil.mini_tasks.dto.TaskResponse;
import com.doguhanerbil.mini_tasks.dto.TaskUpdateRequest;
import com.doguhanerbil.mini_tasks.entity.Task;
import com.doguhanerbil.mini_tasks.repository.TaskRepository;
import com.doguhanerbil.mini_tasks.common.exception.NotFoundException;


@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public TaskResponse createTask(TaskCreateRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setCompleted(false);

        return toResponse(taskRepository.save(task));
    }

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll().stream()
        .map(this::toResponse)
        .collect(Collectors.toList());
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getCompleted(),
                task.getCreatedAt(),
                task.getUpdatedAt());
    }

    public TaskResponse getTaskById(Long id) {
        Task task = taskRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Task not found with id: " + id));

        return toResponse(task);
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Task not found with id: " + id));

        taskRepository.delete(task);
    }

    public TaskResponse updateTask(Long id, TaskUpdateRequest request) {
        Task task = taskRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Task not found with id: " + id));

        if (request.getTitle() != null) {
            task.setTitle(request.getTitle());
        }

        if (request.getDescription() != null) {
            task.setDescription(request.getDescription());
        }

        if (request.getCompleted() != null) {
            task.setCompleted(request.getCompleted());
        }

        Task savedTask = taskRepository.save(task);
        return toResponse(savedTask);

    }
}
    
