package com.checkin.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Employee {
    private Long id;
    private String employeeName;
    private LocalDate createTs;
    private String colorCode;
}
