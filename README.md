# TaskManager-REST-API

A Spring Boot RESTful API for managing tasks and users. This application allows users to perform CRUD operations on tasks and user profiles.

## Technologies Used

- Java 21
- Spring Boot 3.4.4
- Spring Data JPA
- PostgreSQL
- Maven

## Prerequisites

- JDK 11 or later
- Maven
- PostgreSQL

## Implementation Note: Entity Accessor Pattern

This project initially attempted to use Lombok's `@Data` annotation to automatically generate accessor methods (getters/setters) for entity classes. However, due to potential IDE integration issues with Lombok's annotation processor, i opted for a more reliable approach by:

1. Manually implementing all accessor methods in entity classes


## Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database named `taskmanager`
   ```sql
   CREATE DATABASE taskmanager;
   ```
3. Make sure the PostgreSQL server is running on port 5432

## Configuration

The application is configured to connect to a PostgreSQL database. You can modify the database connection settings in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskmanager
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Running the Application

1. Clone the repository
2. Navigate to the project directory
3. Build the project:
   ```
   mvn clean install
   ```
4. Run the application:
   ```
   mvn spring-boot:run
   ```
   
The application will start on port 8080.

## API Endpoints

### Task Endpoints

- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Retrieve all tasks
- `GET /api/tasks/{id}` - Retrieve a task by ID
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task (soft delete)
- `GET /api/tasks/deleted` - Show all deleted tasks

### User Endpoints

- `POST /api/users` - Create a new user
- `GET /api/users` - Retrieve all users
- `GET /api/users/active` - Retrieve all active users
- `GET /api/users/{id}` - Retrieve a user by ID
- `PUT /api/users/{id}` - Update a user
- `DELETE /api/users/{id}` - Delete a user

## Data Format

### Task Example

```json
{
  "title": "Complete assignment",
  "description": "Finish the Spring Boot assignment by the deadline",
  "status": "In Progress",
  "expectedStartDateTime": "2023-04-25T10:00:00",
  "expectedEndDateTime": "2023-04-26T14:00:00",
  "createdBy": "sourabh",
  "assignedTo": "shivraj"
}
```

### User Example

```json
{
  "firstName": "sourabh",
  "lastName": "sawant",
  "timezone": "UTC+5:30",
  "active": true
}
```

## Important Notes

- All date/time fields are stored in UTC
- Task status can only be "Pending", "In Progress", or "Completed"
- Tasks with "In Progress" status require expectedStartDateTime, expectedEndDateTime, and assignedTo fields
- Tasks are soft deleted (marked as deleted but not removed from the database) 
