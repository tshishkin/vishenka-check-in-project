package com.checkin.dao;

import com.checkin.common.ExtendedBeanPropertySqlParameterSource;
import com.checkin.enums.TaskStatus;
import com.checkin.model.Task;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Map;

@Repository
public class TaskDAOImpl extends AbstractDAO<Task> implements TaskDAO {
    public TaskDAOImpl(DataSource dataSource) {
        super(dataSource, "task", Task.class);
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
        jdbcTemplate.update("update task set status = :status where id = :id", Map.of("status", status.name(), "id", taskId));
    }
}
