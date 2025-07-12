package com.checkin.dao;

import com.checkin.enums.TaskStatus;
import com.checkin.model.Task;

import java.util.List;

public interface TaskDAO  {

    List<Task> getAll();
    Task getById(Long id);

    void create(Task task);

    void updateTaskStatus(Long taskId, TaskStatus status);
}
