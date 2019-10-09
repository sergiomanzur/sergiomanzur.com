import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import classes from './HomepageCard.module.css';
import Moment from 'react-moment';


const homepageCard = (props) => {

    return (
        <Col sm={6}>
            <Card className={classes.HomepageCard}>
                <a href={"/blog/"+props.slug}>
                    <Card.Img className={classes.Image} variant="top" src={props.image} />
                </a>
                <Card.Subtitle className={classes.Subtitle}>
                    {props.author} - <Moment format="DD/MM/YYYY">{props.fecha}</Moment>
                </Card.Subtitle>
                <Card.Body>
                    <a href={"/blog/"+props.slug}>
                        <Card.Title>{props.title}</Card.Title>
                    </a>
                    <Card.Text>
                        {props.summary}
                    </Card.Text>
                    <Button variant="link"
                        href={"/blog/"+props.slug}
                    >
                        {'Leer más'}
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default homepageCard;