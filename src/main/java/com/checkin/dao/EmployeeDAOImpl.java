package com.checkin.dao;

import com.checkin.common.ExtendedBeanPropertySqlParameterSource;
import com.checkin.model.Employee;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
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
    public List<Employee> findAll() {
        return jdbcTemplate.query("select * from employee", ROW_MAPPER);
    }

    @Override
    public Long create(Employee employee) {
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        ExtendedBeanPropertySqlParameterSource params = new ExtendedBeanPropertySqlParameterSource(employee);
        String sql = "insert into employee (id, employee_name, create_ts, color_code) values (nextval('employee_seq'), :employeeName, now(), :colorCode)";
        jdbcTemplate.update(sql, params, keyHolder, new String[]{"id"} );
        return keyHolder.getKey().longValue();
    }
}
