package com.taskmanager.repository;

import com.taskmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for User entity
 * Extends JpaRepository to inherit basic CRUD operations
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find all active users
     * @return List of active users
     */
    List<User> findByActiveTrue();
    
    /**
     * Find a user by their first name
     * @param firstName The first name to search for
     * @return List of users matching the first name
     */
    List<User> findByFirstName(String firstName);
    
    /**
     * Find a user by their first name and last name
     * @param firstName The first name to search for
     * @param lastName The last name to search for
     * @return The user if found
     */
    User findByFirstNameAndLastName(String firstName, String lastName);
} 