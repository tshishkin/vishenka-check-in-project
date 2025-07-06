package com.checkin.dao;

import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

public abstract class AbstractDAO {

    protected final NamedParameterJdbcTemplate jdbcTemplate;

    public AbstractDAO(DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
        JdbcOperations operations = jdbcTemplate.getJdbcOperations();
        if (operations instanceof JdbcTemplate) {
            ((JdbcTemplate) operations).setFetchSize(1000);
        }
    }

    protected static Map<String, Object> map(Object ... keysAndValues) {
        Map<String, Object> result = new HashMap<>();
        for (int i=0; i<keysAndValues.length; i+=2) {
            result.put((String) keysAndValues[i], keysAndValues[i+1]);
        }
        return result;
    }
}