import { Navbar, Container, Nav } from 'react-bootstrap';
import {useSelector} from "react-redux";
import UserNavigation from "./UserNavigation";
import AuthNavigation from "./AuthNavigation";
import {Link} from "react-router-dom";

function Navigation() {

    const authData = useSelector(state => state.user);
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to={"/"}>ESP32</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarColor01" />
                <Navbar.Collapse id="navbarColor01">
                    <Nav className="me-auto">
                        <AuthNavigation authData={authData}/>
                    </Nav>
                    <Nav>
                        <UserNavigation authData={authData}/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;