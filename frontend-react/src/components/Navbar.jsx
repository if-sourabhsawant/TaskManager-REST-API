import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Task Manager</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Tasks</Nav.Link>
            <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/tasks/new">
              <Button variant="primary" size="sm">Create Task</Button>
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar 