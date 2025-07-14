package com.checkin.service;

import com.checkin.dto.TaskDTO;
import com.checkin.dto.TaskDTOList;
import com.checkin.enums.TaskStatus;
import com.checkin.model.Task;

import java.util.List;

public interface TaskService {
    List<TaskDTOList> getActualTasks();

    TaskDTO getById(Long id);

    void create(Task task);

    void updateStatus(Long taskId, TaskStatus taskStatus);

    void delete(Long id);
}
