package com.checkin.dto;

import com.checkin.enums.TaskStatus;
import com.checkin.model.Employee;

import java.time.LocalDate;

public class TaskDTOList {
    private Long id;
    private LocalDate deadlineTs;
    private Employee employee;
    private TaskStatus status;
    private String title;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDeadlineTs() {
        return deadlineTs;
    }

    public void setDeadlineTs(LocalDate deadlineTs) {
        this.deadlineTs = deadlineTs;
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
