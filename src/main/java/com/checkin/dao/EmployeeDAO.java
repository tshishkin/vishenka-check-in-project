package com.checkin.dao;

import com.checkin.model.Employee;

import java.util.List;

public interface EmployeeDAO {
    List<Employee> getAllEmployees();

    void addNewEmployee(Employee employee);
}
