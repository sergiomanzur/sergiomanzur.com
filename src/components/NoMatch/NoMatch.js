import React, {useEffect, useState} from 'react';
import classes from './NoMatch.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import HomepageCard from "../HomepageCard/HomepageCard";
import Image from "react-bootstrap/Image";


const NoMatch = () => {

    const [posts,setPost] = useState([]);

    useEffect(() => {

        axios.get('http://www.dev.sergiomanzur.com/api/most-read/')
            .then(res => {
                setPost(res.data.data);
            })
    }, []);


    const homePosts = posts.filter((x,i)=> i < 6 ).map(
        x => <HomepageCard key={x.id} title={x.title}
                           image={x.images[0].data} summary={x.summary} slug={x.slug} author={x.author} fecha={x.fecha}/>);

    return (
        <Container>
            <h1 style={{textAlign:"center"}}>La página que buscas no existe</h1>
            <br/>
            <div style={{display:"flex", justifyContent:"center"}}>
                <Image src="http://www.dev.sergiomanzur.com/site/assets/files/27/pngtree-neon-error-404-page-png-image_943920.jpg?nc=10" fluid style={{maxWidth:"400px"}}/>
            </div>
            <br/>
            <br/>
            <h3>Aquí te dejamos otros artículos muy interesantes que no te puedes perder</h3>
            <br/>
            <br/>
            <Row>
                <Col sm={12}>
                    <Row>{homePosts}</Row>
                </Col>
            </Row>
        </Container>
    )
}

export default NoMatch;