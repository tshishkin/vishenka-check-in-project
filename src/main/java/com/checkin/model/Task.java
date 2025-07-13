package com.checkin.model;

import com.checkin.enums.TaskStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;


public class Task {
    private Long id;
    private LocalDate completeTs;
    private LocalDateTime createTs;
    private LocalDate deadlineTs;
    private String description;
    private Long employeeId;
    private TaskStatus status;
    private String title;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCompleteTs() {
        return completeTs;
    }

    public void setCompleteTs(LocalDate completeTs) {
        this.completeTs = completeTs;
    }

    public LocalDateTime getCreateTs() {
        return createTs;
    }

    public void setCreateTs(LocalDateTime createTs) {
        this.createTs = createTs;
    }

    public LocalDate getDeadlineTs() {
        return deadlineTs;
    }

    public void setDeadlineTs(LocalDate deadlineTs) {
        this.deadlineTs = deadlineTs;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
