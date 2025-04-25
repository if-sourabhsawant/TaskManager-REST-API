package com.taskmanager.service;

import com.taskmanager.entity.User;
import com.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    public User createUser(User user) {
        if (user.getFirstName() == null || user.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("User first name cannot be null or empty");
        }
        
        if (!user.isActive()) {
            user.setActive(true);
        }
        
        return userRepository.save(user);
    }
    
    public List<User> getAllActiveUsers() {
        return userRepository.findByActiveTrue();
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
    }
    
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
        
        if (userDetails.getFirstName() != null && !userDetails.getFirstName().trim().isEmpty()) {
            user.setFirstName(userDetails.getFirstName());
        }
        
        if (userDetails.getLastName() != null) {
            user.setLastName(userDetails.getLastName());
        }
        
        if (userDetails.getTimezone() != null) {
            user.setTimezone(userDetails.getTimezone());
        }
        
        return userRepository.save(user);
    }
    
    public boolean deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
        
        userRepository.delete(user);
        return true;
    }
} 