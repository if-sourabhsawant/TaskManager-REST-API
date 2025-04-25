import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, Row, Col, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import axios from 'axios'

function TaskDetail({ onTaskDeleted }) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/tasks/${id}`)
        setTask(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching task details:', err)
        setError('Failed to load task details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchTaskDetails()
  }, [id])

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not set'
    
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }
    
    try {
      setIsDeleting(true)
      await axios.delete(`/api/tasks/${id}`)
      
      if (onTaskDeleted) onTaskDeleted()
      navigate('/')
    } catch (err) {
      console.error('Error deleting task:', err)
      setError('Failed to delete the task. Please try again.')
      setIsDeleting(false)
    }
  }

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

  if (loading) return (
    <div className="text-center my-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading task details...</span>
      </Spinner>
    </div>
  )
  
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!task) return <Alert variant="warning">Task not found</Alert>

  return (
    <div className="mx-auto" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{task.title}</h1>
        <Badge bg={getStatusVariant(task.status)} className={`status-${task.status?.toLowerCase().replace(/\s+/g, '-')} fs-6 py-2 px-3`}>
          {task.status}
        </Badge>
      </div>
      
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="mb-4 pb-4 border-bottom">
            <Col>
              <h4>Description</h4>
              <p className="text-secondary mb-0">{task.description || 'No description provided'}</p>
            </Col>
          </Row>
          
          <Row className="mb-4 pb-4 border-bottom">
            <Col>
              <h4>Assignment</h4>
              <p className="mb-1">
                <strong>Created by:</strong> {task.createdBy || 'Unknown'}
              </p>
              <p className="mb-0">
                <strong>Assigned to:</strong> {task.assignedTo || 'Unassigned'}
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <h4>Timeline</h4>
              <Row>
                <Col md={6}>
                  <p className="mb-1">
                    <strong>Created:</strong> {formatDate(task.createdAt)}
                  </p>
                  <p className="mb-3">
                    <strong>Last updated:</strong> {formatDate(task.updatedAt)}
                  </p>
                </Col>
                <Col md={6}>
                  <p className="mb-1">
                    <strong>Expected start:</strong> {formatDate(task.expectedStartDateTime)}
                  </p>
                  <p className="mb-0">
                    <strong>Expected completion:</strong> {formatDate(task.expectedEndDateTime)}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <div className="d-flex gap-2">
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete Task'}
        </Button>
        <Button as={Link} to={`/tasks/edit/${id}`} variant="primary">
          Edit Task
        </Button>
        <Button as={Link} to="/" variant="outline-secondary" className="ms-auto">
          Back to Tasks
        </Button>
      </div>
    </div>
  )
}

export default TaskDetail 