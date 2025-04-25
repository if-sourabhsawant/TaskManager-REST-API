package com.taskmanager.repository;

import com.taskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Task entity
 * Extends JpaRepository to inherit basic CRUD operations
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    /**
     * Find all tasks that are not marked as deleted
     * @return List of non-deleted tasks
     */
    List<Task> findByDeleteFalse();
    
    /**
     * Find a task by ID that is not marked as deleted
     * @param id The task ID
     * @return The task if found and not deleted
     */
    Task findByIdAndDeleteFalse(Long id);
    
    /**
     * Find tasks by status that are not marked as deleted
     * @param status The status to filter by
     * @return List of matching tasks
     */
    List<Task> findByStatusAndDeleteFalse(String status);
    
    /**
     * Find tasks created by a specific user that are not marked as deleted
     * @param createdBy The user who created the task
     * @return List of matching tasks
     */
    List<Task> findByCreatedByAndDeleteFalse(String createdBy);
    
    /**
     * Find tasks assigned to a specific user that are not marked as deleted
     * @param assignedTo The user the task is assigned to
     * @return List of matching tasks
     */
    List<Task> findByAssignedToAndDeleteFalse(String assignedTo);
} 