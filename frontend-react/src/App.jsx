import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Navbar from './components/Navbar'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskDetail from './components/TaskDetail'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import './App.css'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  
  const refreshData = () => {
    setRefreshKey(oldKey => oldKey + 1)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container className="py-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<TaskList refreshKey={refreshKey} />} />
          <Route path="/tasks/new" element={<TaskForm onTaskSaved={refreshData} />} />
          <Route path="/tasks/edit/:id" element={<TaskForm onTaskSaved={refreshData} />} />
          <Route path="/tasks/:id" element={<TaskDetail onTaskDeleted={refreshData} />} />
          
          <Route path="/users" element={<UserList refreshKey={refreshKey} />} />
          <Route path="/users/new" element={<UserForm onUserSaved={refreshData} />} />
          <Route path="/users/edit/:id" element={<UserForm onUserSaved={refreshData} />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App 