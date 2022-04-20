import { Component } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { ReactComponent as Logo} from "../logo.svg";

//Class Component
export default class NavBarClass extends Component {
    render() {
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Logo
                        width = {75}
                    />
                    <Navbar.Brand>Pokemons</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}