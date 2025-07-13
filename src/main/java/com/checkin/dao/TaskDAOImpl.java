package com.checkin.dao;

import com.checkin.common.ExtendedBeanPropertySqlParameterSource;
import com.checkin.enums.TaskStatus;
import com.checkin.model.Task;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;

@Repository
public class TaskDAOImpl extends AbstractDAO<Task> implements TaskDAO {
    public static final String TABLE_NAME = "task";
    public TaskDAOImpl(DataSource dataSource) {
        super(dataSource, TABLE_NAME, Task.class);
    }

    @Override
    public List<Task> getAll() {
        return jdbcTemplate.query("select * from task order by create_ts", ROW_MAPPER);
    }

    @Override
    public void create(Task task) {
        ExtendedBeanPropertySqlParameterSource params = new ExtendedBeanPropertySqlParameterSource(task);
        String sql = "insert into task (id, complete_ts, create_ts, deadline_ts, description, employee_id, status, title)" +
                " values (nextval('task_seq'), :completeTs, :createTs, :deadlineTs, :description, :employeeId, :status, :title)";
        jdbcTemplate.update(sql, params );
    }

    @Override
    public void updateTaskStatus(Long taskId, TaskStatus status) {
        String sql = "update task set status = :status";

        if (status == TaskStatus.COMPLETED) {
            sql += ", complete_ts = now()";
        } else {
            sql += ", complete_ts = null";
        }
        sql += " where id = :id";

        jdbcTemplate.update(sql, Map.of("status", status.name(), "id", taskId));
    }
}
