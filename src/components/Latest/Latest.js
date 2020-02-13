import React, {useEffect, useState, useReducer} from 'react';
import classes from './Latest.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import axios from 'axios';
import Spinner from "react-bootstrap/Spinner";


function reducer(state, action) {
    switch (action.type) {
        case 'data_received':
            return {
                ...state,
                posts: action.payload,
                isLoading: false,
                isError: false
            };
        case 'getting_data':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'getting_data_error' :
            return {
                ...state,
                isError: true,
                isLoading: false,
            };

        default:
            throw new Error();
    }
}

const Latest = () => {

    const [state, dispatch] = useReducer(reducer,{
        posts: [],
        isLoading: false,
        isError: false
    });

    useEffect(() => {
        dispatch({type:'getting_data'});
        axios.get('http://www.dev.sergiomanzur.com/api/pages/')
            .then(res => {
                dispatch({type:'data_received',payload: res.data.data});
            })
    }, []);


    const latestPosts = state.posts.filter((x,i)=> i < 5 ).map(
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

    const loadingMessage = state.isLoading ? (
        <Spinner style={{flex: 1, alignSelf: 'center' }} animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    ) : null;

    const error = state.isError ? (console.log("error loading most read.")) : null;

    return (
        <Container className={classes.latest}>
            <Row style={{display:"flex", justifyContent:"center", alignItems: "center"}}><strong>Más Nuevos</strong></Row>
            <br/>
            {latestPosts}
            {loadingMessage}
            {error}
        </Container>
    )
}

export default Latest;