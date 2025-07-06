package com.checkin.dto;

import com.checkin.model.Employee;

import java.time.LocalDate;

public class CheckInDTO {
    private Long id;
    private Employee employee;
    private LocalDate checkInDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }
}
