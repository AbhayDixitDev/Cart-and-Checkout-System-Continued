import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaHome, FaLaptop, FaMobileAlt, FaShoppingCart, FaBook, FaPowerOff } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.data);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/login");
      window.location.reload();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaHome style={{ marginRight: 5 }} />
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/desktop">
              <FaLaptop style={{ marginRight: 5 }} />
              Desktop
            </Nav.Link>
            <Nav.Link as={Link} to="/laptop">
              <FaLaptop style={{ marginRight: 5 }} />
              Laptop
            </Nav.Link>
            <Nav.Link as={Link} to="/mobile">
              <FaMobileAlt style={{ marginRight: 5 }} />
              Mobile
            </Nav.Link>
            <Nav.Link
              onClick={(e) => {
                e.preventDefault();
                if (
                  window.confirm(
                    "Are you sure you want to go to Magnet Brains?"
                  )
                ) {
                  window.open("https://www.magnetbrains.com/", "_blank");
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <FaMobileAlt style={{ marginRight: 5, display: "none" }} />
              <FaBook style={{ marginRight: 5 }} />
              Magnet Brains
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={() => navigate("/cart")}
              style={{ cursor: "pointer" }}
            >
              <FaShoppingCart style={{ marginRight: 5 }} />
              <Badge bg="light" text="dark">
                {cartData.length}
              </Badge>
            </Nav.Link>
            <Nav.Link
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <FaPowerOff style={{ marginRight: 5 }} />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
