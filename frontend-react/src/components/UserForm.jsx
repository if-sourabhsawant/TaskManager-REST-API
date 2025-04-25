import { useState, useEffect } from 'react'
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserForm({ onUserSaved }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = id !== undefined
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    timezone: '',
    active: true
  })
  
  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/api/users/${id}`)
          setFormData(response.data)
          setError(null)
        } catch (err) {
          console.error('Error fetching user:', err)
          setError('Failed to load user data. Please try again later.')
        } finally {
          setLoading(false)
        }
      }
      
      fetchUser()
    }
  }, [id, isEditMode])
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      if (isEditMode) {
        await axios.put(`/api/users/${id}`, formData)
      } else {
        await axios.post('/api/users', formData)
      }
      
      if (onUserSaved) onUserSaved()
      navigate('/users')
    } catch (err) {
      console.error('Error saving user:', err)
      
      if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError('Failed to save user. Please try again later.')
      }
    } finally {
      setSaving(false)
    }
  }
  
  if (loading) return (
    <div className="text-center my-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )

  return (
    <div>
      <h1 className="mb-4">{isEditMode ? 'Edit User' : 'Create New User'}</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter last name"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Timezone</Form.Label>
              <Form.Control
                type="text"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                placeholder="Enter timezone (e.g. UTC, IST)"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="active"
                label="Active"
                checked={formData.active}
                onChange={handleChange}
              />
            </Form.Group>
            
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save User'}
              </Button>
              <Button variant="secondary" onClick={() => navigate('/users')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default UserForm 