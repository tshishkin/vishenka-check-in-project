package com.checkin.model;

import java.time.LocalDate;

public class Employee {
    private Long id;
    private String employeeName;
    private LocalDate createTs;
    private String colorCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public LocalDate getCreateTs() {
        return createTs;
    }

    public void setCreateTs(LocalDate createTs) {
        this.createTs = createTs;
    }

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }
}
