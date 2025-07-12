package com.checkin.dao;

import com.checkin.model.Employee;

import java.util.List;

public interface EmployeeDAO {
    List<Employee> getAll();

    Employee getById(Long id);

    Long create(Employee employee);

    void delete(long id);
}
