package com.checkin.dto;

import com.checkin.enums.TaskStatus;
import com.checkin.model.Employee;

import java.time.LocalDate;

public class TaskDTO {
    private Long id;
    private LocalDate completeTs;
    private LocalDate createTs;
    private LocalDate deadlineTs;
    private String description;
    private Employee employee;
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

    public LocalDate getCreateTs() {
        return createTs;
    }

    public void setCreateTs(LocalDate createTs) {
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

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
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
