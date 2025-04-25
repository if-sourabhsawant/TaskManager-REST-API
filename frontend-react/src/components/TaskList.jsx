import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Badge, Button, Spinner, Alert, Form, InputGroup, Dropdown } from 'react-bootstrap'
import axios from 'axios'

function TaskList({ refreshKey }) {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Filter states
  const [filterTitle, setFilterTitle] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterAssignedTo, setFilterAssignedTo] = useState("")
  const [filterCreatedBy, setFilterCreatedBy] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [tasksResponse, usersResponse] = await Promise.all([
          axios.get('/api/tasks'),
          axios.get('/api/users')
        ])
        setTasks(tasksResponse.data)
        setUsers(usersResponse.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshKey])

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'In Progress':
        return 'warning'
      default:
        return 'secondary'
    }
  }
  
  const handleClearFilters = () => {
    setFilterTitle("")
    setFilterStatus("")
    setFilterAssignedTo("")
    setFilterCreatedBy("")
  }

  const filteredTasks = tasks.filter(task => {
    const titleMatch = task.title?.toLowerCase().includes(filterTitle.toLowerCase()) || filterTitle === "";
    const statusMatch = task.status === filterStatus || filterStatus === "";
    const assignedToMatch = task.assignedTo === filterAssignedTo || filterAssignedTo === "";
    const createdByMatch = task.createdBy === filterCreatedBy || filterCreatedBy === "";
    
    return titleMatch && statusMatch && assignedToMatch && createdByMatch;
  });

  if (loading) return (
    <div className="text-center my-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
  
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <h1 className="mb-4">My Tasks</h1>
      
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Filter by Title</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Search by title" 
                  value={filterTitle}
                  onChange={(e) => setFilterTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Filter by Status</Form.Label>
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Filter by Assigned To</Form.Label>
                <Form.Select
                  value={filterAssignedTo}
                  onChange={(e) => setFilterAssignedTo(e.target.value)}
                >
                  <option value="">All Users</option>
                  {users.map(user => (
                    <option key={user.id} value={user.firstName + " " + user.lastName}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Filter by Created By</Form.Label>
                <Form.Select
                  value={filterCreatedBy}
                  onChange={(e) => setFilterCreatedBy(e.target.value)}
                >
                  <option value="">All Users</option>
                  {users.map(user => (
                    <option key={user.id} value={user.firstName + " " + user.lastName}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </Card.Body>
      </Card>
      
      {filteredTasks.length === 0 ? (
        <Card className="text-center p-5 border-dashed">
          <Card.Body>
            <p className="text-muted mb-4">No tasks found with the current filters.</p>
            <Button as={Link} to="/tasks/new" variant="primary">
              Create Task
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredTasks.map(task => (
            <Col key={task.id}>
              <Card as={Link} 
                to={`/tasks/${task.id}`} 
                className="h-100 text-decoration-none task-card shadow-sm"
              >
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text className="text-muted task-description">
                    {task.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <Badge bg={getStatusVariant(task.status)} className={`status-${task.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                      {task.status}
                    </Badge>
                    <small className="text-muted">
                      {task.assignedTo ? `Assigned to: ${task.assignedTo}` : 'Unassigned'}
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default TaskList 