package com.doguhanerbil.mini_tasks.dto;

public class TaskUpdateRequest {
    private String title;
    private String description;
    private Boolean completed;

    public TaskUpdateRequest() {
    }

    public TaskUpdateRequest(String title, String description, Boolean completed) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
