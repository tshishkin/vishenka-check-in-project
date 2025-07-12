package com.checkin.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class AbstractDAO<T>  {

    protected final NamedParameterJdbcTemplate jdbcTemplate;

    protected final String tableName;
    protected final RowMapper<T> ROW_MAPPER;

    public AbstractDAO(DataSource dataSource, String tableName, Class<T> entity) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
        JdbcOperations operations = jdbcTemplate.getJdbcOperations();
        if (operations instanceof JdbcTemplate) {
            ((JdbcTemplate) operations).setFetchSize(1000);
        }

        this.tableName = tableName;
        this.ROW_MAPPER = new BeanPropertyRowMapper<>(entity);
    }

    protected static Map<String, Object> map(Object ... keysAndValues) {
        Map<String, Object> result = new HashMap<>();
        for (int i=0; i<keysAndValues.length; i+=2) {
            result.put((String) keysAndValues[i], keysAndValues[i+1]);
        }
        return result;
    }

     public List<T> getAll() {
        return jdbcTemplate.query("select * from " + tableName, ROW_MAPPER);
     }

     public T getById(Long id) {
        return jdbcTemplate.queryForObject("select * from " + tableName + " where id = :id", map("id", id), ROW_MAPPER);
     }
}