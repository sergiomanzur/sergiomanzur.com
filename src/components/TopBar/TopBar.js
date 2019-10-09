import React, {useEffect,useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";



const TopBar = (props) => {

    const categories = props.categories;
    const cats = categories.map(x => <NavDropdown.Item key={x.id} href={"/categorias/"+x.slug}>{x.title}</NavDropdown.Item>);


    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">Sergio Manzur v3.0</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Inicio</Nav.Link>
                    <NavDropdown title="Categorías" id="collasible-nav-dropdown">
                        {cats}
                    </NavDropdown>
                    <Nav.Link href="/contacto">Contacto</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;