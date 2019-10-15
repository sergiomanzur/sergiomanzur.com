import React from 'react';
import classes from './Footer.modules.css';
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";


const footer = (props) => {

    const categories = props.categories;
    const cats = categories.map( x => <li key={x.id}><a href={"/categorias/" + x.slug}>{x.title}</a></li>)

    return (
        <footer className={"Footer"}>
            <Row style={{backgroundColor: '#343a40', width: "100%",padding:"15px"}}>
                <Col sm={12} >
                    <Container>
                        <Row>
                            <Col xs={12} sm={3}>
                                <h4>Blog de Sergio Manzur</h4>
                                <br/>
                                <p style={{color:"floralwhite"}}>Mi nombre es Sergio Manzur, actualmente trabajo como Web Developer para una empresa
                                    privada. Soy un apasionado del futbol y la
                                    tecnología, las Chivas y los videojuegos.</p>
                            </Col>
                            <Col xs={12} sm={3}>
                                <h4>Categorías</h4>
                                <br/>
                                {cats}
                            </Col>
                            <Col xs={12} sm={3}>
                                <h4>Enlaces</h4>
                                <br/>
                                <li><a target="_blank" href="https://www.siteground.com/index.htm?afcode=c5fcf639e810adad47f8ec325f269508">El Mejor Hosting del Mundo</a></li>
                                <li><a target="_blank" href="http://transportesleroy.com">Transportes Leroy Tampico</a></li>

                            </Col>
                            <Col xs={12} sm={3}>
                                <h4>Contacto</h4>
                                <br/>
                                <a href="/contacto">Contáctanos</a>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </footer>
    )
}

export default footer;