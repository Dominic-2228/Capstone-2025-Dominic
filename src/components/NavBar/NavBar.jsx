import { useEffect, useState } from "react";
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";
import { getProfileUsersById } from "../services/userService.jsx";

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getProfileUsersById(currentUser.id).then(setUser);
  }, [currentUser]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" bg="secondary" variant="dark" className="custom-bar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <div className="button-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/allposts">
                All Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/myposts">
                My Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/likedposts">
                Liked Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/createpost">
                Create Post
              </Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/aboutus">
                  About Us
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/faq">
                  FAQ
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/bible">
                  Read The Bible
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Nav.Link
            onClick={() => {
              localStorage.removeItem("bible_user");
              navigate("/");
            }}
          >
            <div className="button-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </div>
          </Nav.Link>
          <Nav.Link>
            <Button onClick={handleShow}>
              {user?.profilePhoto ? (
                user?.profilePhoto
              ) : (
                <div className="button-icon-edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
              )}
            </Button>
              <Offcanvas show={show} onHide={handleClose} className="offcanvas-profile">
                <Offcanvas.Header closeButton className="offcanvas-details">
                  <Offcanvas.Title>Profile Details</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="offcanvas-details">
                  {user.map((obj) => {
                    return (
                      <>
                        <img
                          className="profile-photo"
                          src={obj.profilePhoto}
                        ></img>
                        <h2>Name: </h2>
                        <p>{obj.fullName}</p>
                        <h2>Email Address: </h2>
                        <p>{obj.email}</p>
                        <h2>Admin: </h2>
                        {obj.isStaff ? <p>Yes</p> : <p>No</p>}
                      </>
                    );
                  })}
                </Offcanvas.Body>
              </Offcanvas>
          </Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
};
