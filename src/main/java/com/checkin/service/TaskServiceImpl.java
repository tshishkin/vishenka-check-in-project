package com.checkin.service;

import com.checkin.dao.EmployeeDAO;
import com.checkin.dao.TaskDAO;
import com.checkin.dto.TaskDTO;
import com.checkin.dto.TaskDTOList;
import com.checkin.enums.TaskStatus;
import com.checkin.model.Employee;
import com.checkin.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService{

    private final EmployeeDAO employeeDAO;
    private final TaskDAO taskDAO;

    public TaskServiceImpl(EmployeeDAO employeeDAO, TaskDAO taskDAO) {
        this.employeeDAO = employeeDAO;
        this.taskDAO = taskDAO;
    }

    @Override
    public List<TaskDTOList> getActualTasks() {
        List<Task> tasks = taskDAO.getActualTasks();
        Map<Long, Employee> employees = employeeDAO.getAll().stream().collect(Collectors.toMap(Employee::getId, Function.identity()));
        List<TaskDTOList> tasksDTO= new ArrayList<>();
        for (Task task : tasks) {
            TaskDTOList taskDTO = new TaskDTOList();
            taskDTO.setId(task.getId());
            taskDTO.setTitle(task.getTitle());
            taskDTO.setDeadlineTs(task.getDeadlineTs());
            taskDTO.setStatus(task.getStatus());
            taskDTO.setEmployee(employees.get(task.getEmployeeId()));
            tasksDTO.add(taskDTO);
        }
        return tasksDTO;
    }

    @Override
    public TaskDTO getById(Long id) {
        Task task = taskDAO.getById(id);
        Employee employee = employeeDAO.getById(task.getEmployeeId());
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setCreateTs(task.getCreateTs());
        taskDTO.setTitle(task.getTitle());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setDeadlineTs(task.getDeadlineTs());
        taskDTO.setCompleteTs(task.getCompleteTs());
        taskDTO.setStatus(task.getStatus());
        taskDTO.setEmployee(employee);
        return taskDTO;
    }

    @Override
    public void create(Task task) {
        taskDAO.create(task);
    }

    @Override
    public void updateStatus(Long taskId, TaskStatus taskStatus) {
        taskDAO.updateTaskStatus(taskId, taskStatus);
    }

    @Override
    public void delete(Long id) {
        taskDAO.delete(id);
    }


}
