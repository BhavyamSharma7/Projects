import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


const BobbleNavbar = () => {
    return (
        <Navbar className="p-3 mb-3" bg="light" expand="sm">
            <Navbar.Brand className="h1" as={Link} to="/">
                Bobble Drive
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/user">
                    Profile
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default BobbleNavbar;
