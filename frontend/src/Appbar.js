import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { PersonCircle, BoxArrowRight, Cart } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useUser } from './components/useUser';

export default function Appbar() {
  const { user, updateUser } = useUser();
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-primary"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/">KitchenStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/cart">
              <Cart />
            </Nav.Link>
            {user?._id ? (
              <NavDropdown title="Account">
                <NavDropdown.Item>
                  <PersonCircle /> {user?.email}
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    updateUser(null);
                    window.location = '/signin';
                  }}
                >
                  <BoxArrowRight /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/signin">Sign in</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
