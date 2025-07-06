package com.checkin.controller;

import com.checkin.model.Employee;
import com.checkin.service.EmployeeService;
import com.checkin.service.EmployeeServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @GetMapping
    public List<Employee> getAll() {
        return employeeService.getAll();
    }

    @PostMapping
    public Long createNewEmployee(@RequestBody Employee employee) {
        return employeeService.create(employee);
    }
}
