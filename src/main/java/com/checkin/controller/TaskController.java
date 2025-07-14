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
    public List<TaskDTOList> getActualTasks() {
        return taskService.getActualTasks();
    }

    @GetMapping("/{id}")
    public TaskDTO getById(@PathVariable Long id) {
        return taskService.getById(id);
    }

    @PostMapping
    public void create(@RequestBody Task task) {
        taskService.create(task);
    }

    @PostMapping("/{id}/update-status")
    public void updateTaskStatus(@PathVariable  Long id, @RequestParam TaskStatus status) {
        taskService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }
}
