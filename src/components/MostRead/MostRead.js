import React, {useEffect, useState, useReducer} from 'react';
import classes from './MostRead.module.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import axios from 'axios';


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


const MostRead = () => {

    const [state, dispatch] = useReducer(reducer,{
        posts: [],
        isLoading: false,
        isError: false
    });


    useEffect(() => {
        dispatch({type:'getting_data'});
        axios.get('http://www.dev.sergiomanzur.com/api/most-read/')
            .then(res => {
                dispatch({type:'data_received',payload: res.data.data});
            }). catch( () => {
                dispatch({type:'getting_data_error'});
        })
    }, []);


    const mostReadPosts = state.posts.filter((x,i)=> i < 5 ).map(
        x =>
            <Row key={x.id} className={classes.mostReadRow}>
            <Col sm={4}>
                <a href={"/blog/" + x.slug}><Image src={x.main_image} rounded style={{maxWidth: "100%"}} /></a>
            </Col>
            <Col sm={8}>
                <a href={"/blog/" + x.slug}> {x.title}</a>
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
        <Container className={classes.mostRead}>
            <Row style={{display:"flex", justifyContent:"center", alignItems: "center"}}><strong>Más Populares</strong></Row>
            <br/>
            {loadingMessage}
            {mostReadPosts}
            {error}
        </Container>
    )
}

export default MostRead;

