package com.checkin.controller;

import com.checkin.dto.TaskDTO;
import com.checkin.dto.TaskDTOList;
import com.checkin.enums.TaskStatus;
import com.checkin.model.Task;
import com.checkin.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskDTOList> getAll() {
        return taskService.getAll();
    }

    @GetMapping("/{id}")
    public TaskDTO getById(@PathVariable Long id) {
        return taskService.getById(id);
    }

    @PostMapping
    public void create(@RequestBody Task task) {
        taskService.create(task);
    }

    @PostMapping("/update-status")
    public void updateTaskStatus(Long id, TaskStatus status) {
        taskService.updateStatus(id, status);
    }
}
