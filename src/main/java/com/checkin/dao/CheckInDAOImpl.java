package com.checkin.dao;

import com.checkin.common.ExtendedBeanPropertySqlParameterSource;
import com.checkin.enums.Span;
import com.checkin.model.CheckIn;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class CheckInDAOImpl extends AbstractDAO<CheckIn> implements CheckInDAO{

    private static final RowMapper<CheckIn> ROW_MAPPER = new BeanPropertyRowMapper<>(CheckIn.class);

    public CheckInDAOImpl(DataSource dataSource) {
        super(dataSource,"check_in", CheckIn.class);
    }

    @Override
    public void create(CheckIn checkIn) {
        ExtendedBeanPropertySqlParameterSource params = new ExtendedBeanPropertySqlParameterSource(checkIn);
        String sql = "insert into check_in (id, employee_id, check_in_date, comment) values (nextval('check_in_seq'), :employeeId, :checkInDate, :comment)";
        jdbcTemplate.update(sql, params );
    }

    @Override
    public List<CheckIn> getAllForTimespan(Span span) {
        String sql = "";

        switch (span) {
            case CURRENT_WEEK -> sql = """
                SELECT *
                FROM check_in
                WHERE check_in_date >= DATE_TRUNC('week', CURRENT_DATE)
                AND check_in_date < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 week'
                ORDER BY check_in_date
                """;
            case NEXT_WEEK -> sql = """
                SELECT *
                FROM check_in
                WHERE check_in_date >= DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 week'
                AND check_in_date < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '2 week'
                ORDER BY check_in_date
                """;
            default -> throw new IllegalArgumentException("Unknown span: " + span);
        }

        return jdbcTemplate.query(sql, ROW_MAPPER);
    }

    @Override
    public void delete(long id) {
        jdbcTemplate.update("delete from check_in where id = :id", Map.of("id", id));
    }
}
