package com.taskmanager.service;

import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import com.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    
    public Task createTask(Task task) {
        if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Task title cannot be null or empty");
        }
        
        List<Task> existingTasks = taskRepository.findByDeleteFalse();
        for (Task existingTask : existingTasks) {
            if (existingTask.getTitle().equals(task.getTitle()) && 
                Objects.equals(existingTask.getCreatedBy(), task.getCreatedBy()) &&
                Objects.equals(existingTask.getExpectedEndDateTime(), task.getExpectedEndDateTime())) {
                throw new IllegalArgumentException("A task with the same title, creator and deadline already exists");
            }
        }
        
        LocalDateTime now = LocalDateTime.now();
        task.setCreatedAt(now);
        task.setUpdatedAt(now);
        task.setDelete(false);
        
        if (task.getStatus() == null || task.getStatus().trim().isEmpty()) {
            task.setStatus(TaskStatus.PENDING.getDisplayName());
        } else if (!isValidStatus(task.getStatus())) {
            throw new IllegalArgumentException("Invalid task status. Must be 'Pending', 'In Progress', or 'Completed'");
        }
        
        if (TaskStatus.IN_PROGRESS.getDisplayName().equals(task.getStatus())) {
            if (task.getExpectedStartDateTime() == null) {
                throw new IllegalArgumentException("Expected Start Date Time is mandatory for tasks in 'In Progress' status");
            }
            if (task.getExpectedEndDateTime() == null) {
                throw new IllegalArgumentException("Expected End Date Time is mandatory for tasks in 'In Progress' status");
            }
            if (task.getAssignedTo() == null || task.getAssignedTo().trim().isEmpty()) {
                throw new IllegalArgumentException("Assigned To is mandatory for tasks in 'In Progress' status");
            }
        }
        
        return taskRepository.save(task);
    }
    
    public List<Task> getAllTasks() {
        return taskRepository.findByDeleteFalse();
    }
    
    public Task getTaskById(Long id) {
        Task task = taskRepository.findByIdAndDeleteFalse(id);
        if (task == null) {
            throw new IllegalArgumentException("Task not found with ID: " + id);
        }
        return task;
    }
    
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findByIdAndDeleteFalse(id);
        if (task == null) {
            throw new IllegalArgumentException("Task not found with ID: " + id);
        }
        
        if (task.isDelete()) {
            throw new IllegalArgumentException("Cannot update a deleted task");
        }
        
        if (taskDetails.getTitle() != null && !taskDetails.getTitle().trim().isEmpty()) {
            task.setTitle(taskDetails.getTitle());
        }
        
        if (taskDetails.getDescription() != null) {
            task.setDescription(taskDetails.getDescription());
        }
        
        if (taskDetails.getStatus() != null && !taskDetails.getStatus().trim().isEmpty()) {
            if (!isValidStatus(taskDetails.getStatus())) {
                throw new IllegalArgumentException("Invalid task status. Must be 'Pending', 'In Progress', or 'Completed'");
            }
            task.setStatus(taskDetails.getStatus());
            
            if (TaskStatus.IN_PROGRESS.getDisplayName().equals(taskDetails.getStatus())) {
                if ((taskDetails.getExpectedStartDateTime() != null) || 
                    (task.getExpectedStartDateTime() == null)) {
                    if (taskDetails.getExpectedStartDateTime() == null) {
                        throw new IllegalArgumentException("Expected Start Date Time is mandatory for tasks in 'In Progress' status");
                    }
                    task.setExpectedStartDateTime(taskDetails.getExpectedStartDateTime());
                }
                
                if ((taskDetails.getExpectedEndDateTime() != null) || 
                    (task.getExpectedEndDateTime() == null)) {
                    if (taskDetails.getExpectedEndDateTime() == null) {
                        throw new IllegalArgumentException("Expected End Date Time is mandatory for tasks in 'In Progress' status");
                    }
                    task.setExpectedEndDateTime(taskDetails.getExpectedEndDateTime());
                }
                
                if ((taskDetails.getAssignedTo() != null) || 
                    (task.getAssignedTo() == null || task.getAssignedTo().trim().isEmpty())) {
                    if (taskDetails.getAssignedTo() == null || taskDetails.getAssignedTo().trim().isEmpty()) {
                        throw new IllegalArgumentException("Assigned To is mandatory for tasks in 'In Progress' status");
                    }
                    task.setAssignedTo(taskDetails.getAssignedTo());
                }
            }
        }
        
        if (taskDetails.getExpectedStartDateTime() != null) {
            task.setExpectedStartDateTime(taskDetails.getExpectedStartDateTime());
        }
        
        if (taskDetails.getExpectedEndDateTime() != null) {
            task.setExpectedEndDateTime(taskDetails.getExpectedEndDateTime());
        }
        
        if (taskDetails.getAssignedTo() != null) {
            task.setAssignedTo(taskDetails.getAssignedTo());
        }
        
        task.setUpdatedAt(LocalDateTime.now());
        
        return taskRepository.save(task);
    }
    
    public boolean deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found with ID: " + id));
        
        task.setDelete(true);
        task.setUpdatedAt(LocalDateTime.now());
        taskRepository.save(task);
        
        return true;
    }
    
    public List<Task> getAllDeletedTasks() {
        return taskRepository.findAll().stream()
                .filter(Task::isDelete)
                .toList();
    }
    
    private boolean isValidStatus(String status) {
        return TaskStatus.isValidStatus(status);
    }
} 