import React, {useEffect, useState} from 'react';
import classes from './MostRead.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import axios from 'axios';


const MostRead = () => {

    const [posts,setPost] = useState([]);

    useEffect(() => {

        axios.get('http://www.dev.sergiomanzur.com/api/most-read/')
            .then(res => {
                setPost(res.data.data);
            })
    }, []);


    const mostReadPosts = posts.filter((x,i)=> i < 5 ).map(
        x =>
            <Row key={x.id} className={classes.mostReadRow}>
            <Col sm={4}>
                <a href={x.slug}><Image src={x.main_image} rounded style={{maxWidth: "100%"}} /></a>
            </Col>
            <Col sm={8}>
                <a href={x.slug}> {x.title}</a>
            </Col>
        </Row>
    );

    return (
        <Container className={classes.mostRead}>
            <Row style={{display:"flex", justifyContent:"center", alignItems: "center"}}><strong>Más Populares</strong></Row>
            <br/>
            {mostReadPosts}
        </Container>
    )
}

export default MostRead;