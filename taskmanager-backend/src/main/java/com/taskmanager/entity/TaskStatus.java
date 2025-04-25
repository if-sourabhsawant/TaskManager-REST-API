package com.taskmanager.entity;

public enum TaskStatus {
    PENDING("Pending"),
    IN_PROGRESS("In Progress"),
    COMPLETED("Completed");
    
    private final String displayName;
    
    TaskStatus(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    public static TaskStatus fromDisplayName(String displayName) {
        for (TaskStatus status : TaskStatus.values()) {
            if (status.getDisplayName().equalsIgnoreCase(displayName)) {
                return status;
            }
        }
        return null;
    }
    
    public static boolean isValidStatus(String status) {
        return fromDisplayName(status) != null;
    }
}