package com.checkin.service;

import com.checkin.dao.CheckInDAO;
import com.checkin.dao.EmployeeDAO;
import com.checkin.dto.CheckInDTO;
import com.checkin.enums.Span;
import com.checkin.model.CheckIn;
import com.checkin.model.Employee;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CheckInServiceImpl implements CheckInService {

    private final CheckInDAO checkInDAO;
    private final EmployeeDAO employeeDAO;

    public CheckInServiceImpl(CheckInDAO checkInDAO, EmployeeDAO employeeDAO) {
        this.checkInDAO = checkInDAO;
        this.employeeDAO = employeeDAO;
    }

    @Override
    public void create(CheckIn checkIn) {
        checkInDAO.create(checkIn);
    }

    @Override
    public List<CheckIn> getAll() {
        return checkInDAO.getAll();
    }

    @Override
    public List<CheckInDTO> getAllForSpan(Span span) {
        List<CheckIn>  models = checkInDAO.getAllForTimespan(span);

        List<CheckInDTO> dtos = new ArrayList<>();
        Map<Long, Employee> employees = employeeDAO.findAll().stream().collect(Collectors.toMap(Employee::getId, Function.identity()));

        for (CheckIn model : models) {
            CheckInDTO check = new CheckInDTO();
            check.setId(model.getId());
            check.setEmployee(employees.get(model.getEmployeeId()));
            check.setCheckInDate(model.getCheckInDate());
            check.setComment(model.getComment());
            dtos.add(check);
        }

        return dtos;
    }

    @Override
    public void delete(Long id) {
        checkInDAO.delete(id);
    }
}
