package com.checkin.dao;

import com.checkin.common.ExtendedBeanPropertySqlParameterSource;
import com.checkin.model.Employee;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class EmployeeDAOImpl extends AbstractDAO<Employee> implements EmployeeDAO {

    public EmployeeDAOImpl(DataSource dataSource) {
        super(dataSource, "employee", Employee.class);
    }

    private static final RowMapper<Employee> ROW_MAPPER = new BeanPropertyRowMapper<>(Employee.class);

    @Override
    public Long create(Employee employee) {
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        ExtendedBeanPropertySqlParameterSource params = new ExtendedBeanPropertySqlParameterSource(employee);
        String sql = "insert into employee (id, employee_name, create_ts, color_code) values (nextval('employee_seq'), :employeeName, now(), :colorCode)";
        jdbcTemplate.update(sql, params, keyHolder, new String[]{"id"} );
        return keyHolder.getKey().longValue();
    }

    @Override
    public void delete(long id) {
        jdbcTemplate.update("delete from check_in where employee_id = :id", Map.of("id", id));
        jdbcTemplate.update("delete from employee where id = :id", Map.of("id", id));
    }
}
