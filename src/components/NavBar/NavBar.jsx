import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate()
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" bg="secondary" variant="dark" className="custom-bar">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/allposts">All Posts</Nav.Link>
              <Nav.Link as={Link} to="/myposts">My Posts</Nav.Link>
              <Nav.Link as={Link} to="/likedposts">Liked Posts</Nav.Link>
              <Nav.Link as={Link} to="/createpost">Create Post</Nav.Link>
              <Nav.Link onClick={() => {
                localStorage.removeItem("bible_user")
                navigate('/')
                }}>Logout</Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/aboutus">About Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/faq">FAQ</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
