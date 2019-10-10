import React, {useEffect, useState} from 'react';
import classes from './Latest.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import axios from 'axios';


const Latest = () => {

    const [posts,setPost] = useState([]);

    useEffect(() => {

        axios.get('http://www.dev.sergiomanzur.com/api/pages/')
            .then(res => {
                setPost(res.data.data);
            })
    }, []);


    const latestPosts = posts.filter((x,i)=> i < 5 ).map(
        x =>
            <Row key={x.id} className={classes.latestRow}>
            <Col sm={4}>
                <a href={x.slug}><Image src={x.main_image} rounded style={{maxWidth: "100%"}} /> </a>
            </Col>
            <Col sm={8}>
                <a href={x.slug}> {x.title}</a>
            </Col>
        </Row>
    );

    return (
        <Container className={classes.latest}>
            <Row style={{display:"flex", justifyContent:"center", alignItems: "center"}}><strong>Más Nuevos</strong></Row>
            <br/>
            {latestPosts}
        </Container>
    )
}

export default Latest;