# TaskManager Frontend

This is a React frontend for the TaskManager Spring Boot application. It provides a user interface for managing tasks.

## Features

- View all tasks in a responsive grid layout
- Create new tasks with relevant details
- View task details
- Update existing tasks
- Delete tasks
- Responsive design with Bootstrap

## Getting Started

### Prerequisites

- Node.js and npm installed
- TaskManager Spring Boot application running on http://localhost:8080

### Installation

1. Navigate to the frontend-react directory:
   ```
   cd frontend-react
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (usually http://localhost:5173)

## Technical Details

- Built with React + Vite
- Uses React Router for navigation
- Bootstrap for UI components and responsive design
- React Bootstrap for component integration
- Axios for API communication
- Proxies API requests to the Spring Boot backend

## API Endpoints Used

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task 