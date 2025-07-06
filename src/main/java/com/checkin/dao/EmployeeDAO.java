package com.checkin.dao;

import com.checkin.model.Employee;

import java.util.List;

public interface EmployeeDAO {
    List<Employee> findAll();

    Long create(Employee employee);

    void delete(long id);
}
