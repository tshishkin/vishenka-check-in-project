package com.checkin.service;

import com.checkin.model.Employee;

import java.util.List;

public interface EmployeeService {


    Long create(Employee employee);

    List<Employee> getAll();

    void delete(Long id);
}
