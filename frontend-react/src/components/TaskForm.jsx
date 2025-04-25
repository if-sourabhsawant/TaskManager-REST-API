import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap'
import axios from 'axios'

function TaskForm({ onTaskSaved }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    assignedTo: '',
    expectedStartDateTime: '',
    expectedEndDateTime: ''
  })
  
  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTask = async () => {
      if (!isEditMode) return
      
      try {
        const response = await axios.get(`/api/tasks/${id}`)
        const task = response.data
        
        const formatDate = (dateStr) => {
          if (!dateStr) return ''
          const date = new Date(dateStr)
          return date.toISOString().slice(0, 16)
        }
        
        setFormData({
          title: task.title || '',
          description: task.description || '',
          status: task.status || 'Pending',
          assignedTo: task.assignedTo || '',
          expectedStartDateTime: formatDate(task.expectedStartDateTime),
          expectedEndDateTime: formatDate(task.expectedEndDateTime)
        })
      } catch (err) {
        console.error('Error fetching task:', err)
        setError('Failed to load task details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id, isEditMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      
      if (isEditMode) {
        await axios.put(`/api/tasks/${id}`, formData)
      } else {
        await axios.post('/api/tasks', formData)
      }
      
      if (onTaskSaved) onTaskSaved()
      
      navigate('/')
    } catch (err) {
      console.error('Error saving task:', err)
      setError('Failed to save task. Please try again.')
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="text-center my-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading task details...</span>
      </Spinner>
    </div>
  )

  return (
    <div className="mx-auto" style={{ maxWidth: '750px' }}>
      <h1 className="mb-4">{isEditMode ? 'Edit Task' : 'Create New Task'}</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Task title"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task description"
                rows={4}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                placeholder="User name"
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expected Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="expectedStartDateTime"
                    value={formData.expectedStartDateTime}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expected End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="expectedEndDateTime"
                    value={formData.expectedEndDateTime}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-flex gap-2 mt-4">
              <Button variant="outline-secondary" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={saving} className="ms-auto">
                {saving ? 'Saving...' : 'Save Task'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default TaskForm 