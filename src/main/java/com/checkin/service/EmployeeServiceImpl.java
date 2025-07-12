package com.checkin.service;

import com.checkin.dao.EmployeeDAO;
import com.checkin.model.Employee;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    private final EmployeeDAO employeeDAO;

    public EmployeeServiceImpl(EmployeeDAO employeeDAO) {
        this.employeeDAO = employeeDAO;
    }

    @Override
    public Long create(Employee employee) {
        return employeeDAO.create(employee);
    }

    @Override
    public List<Employee> getAll() {
        return employeeDAO.getAll();
    }

    @Override
    public Employee getById(Long id) {
        return employeeDAO.getById(id);
    }

    @Override
    public void delete(Long id) {
        employeeDAO.delete(id);
    }
}
