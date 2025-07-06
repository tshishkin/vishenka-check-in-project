package com.checkin.dao;

import com.checkin.common.ExtendedBeanPropertySqlParameterSource;
import com.checkin.model.Employee;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class EmployeeDAOImpl extends AbstractDAO implements EmployeeDAO {

    public EmployeeDAOImpl(DataSource dataSource) {
        super(dataSource);
    }

    private static final RowMapper<Employee> ROW_MAPPER = new BeanPropertyRowMapper<>(Employee.class);

    @Override
    public List<Employee> getAllEmployees() {
        return jdbcTemplate.query("select * from employee", ROW_MAPPER);
    }

    @Override
    public void addNewEmployee(Employee employee) {
        ExtendedBeanPropertySqlParameterSource params = new ExtendedBeanPropertySqlParameterSource(employee);
        jdbcTemplate.update("insert into employee (id, employee_name, create_ts) values (nextval('employee_seq'), :employeeName, now())", params );
    }
}
