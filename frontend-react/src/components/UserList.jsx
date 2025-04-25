import { useState, useEffect } from 'react'
import { Row, Col, Card, Badge, Button, Spinner, Alert, Form, InputGroup } from 'react-bootstrap'
import axios from 'axios'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterName, setFilterName] = useState("")
  const [showActive, setShowActive] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/users')
        setUsers(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching users:', err)
        setError('Failed to load users. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${userId}`)
        setUsers(users.filter(user => user.id !== userId))
      } catch (err) {
        console.error('Error deleting user:', err)
        setError('Failed to delete user. Please try again later.')
      }
    }
  }

  const filteredUsers = users.filter(user => {
    const nameMatch = (user.firstName + " " + user.lastName)
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const activeMatch = showActive ? user.active : true;
    return nameMatch && activeMatch;
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
      <h1 className="mb-4">User Management</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>Filter by name</InputGroup.Text>
            <Form.Control
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Enter name"
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Check
            type="switch"
            id="show-active-switch"
            label="Show only active users"
            checked={showActive}
            onChange={(e) => setShowActive(e.target.checked)}
          />
        </Col>
        <Col md={3} className="text-end">
          <Button href="/users/new" variant="primary">
            Add New User
          </Button>
        </Col>
      </Row>
      
      {filteredUsers.length === 0 ? (
        <Card className="text-center p-5 border-dashed">
          <Card.Body>
            <p className="text-muted mb-4">No users found with the current filters.</p>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredUsers.map(user => (
            <Col key={user.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                  <Badge bg={user.active ? "success" : "secondary"}>
                    {user.active ? "Active" : "Inactive"}
                  </Badge>
                  <p className="mt-2 mb-0 text-muted">
                    Timezone: {user.timezone || "Not set"}
                  </p>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    href={`/users/edit/${user.id}`}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default UserList 