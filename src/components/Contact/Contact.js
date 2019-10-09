import React, {useEffect,useState} from 'react';
import classes from './Contact.module.css';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import ReactGA from "react-ga";

class Contact extends React.Component {


    formData = new FormData();

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            message: '',
            formStatus : 1, //1: new form, 2: form error, 3: form sent correctly
            validateEmail : false,
            validateName : false,
            validateMessage: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(name === 'name'){
            if(value.length > 3) {
                this.setState({validateName: true});
            }
        }

        if(name === 'email'){
            if(this.validateEmail(value)) {
                this.setState({validateEmail: true});
            }
        }

        if(name === 'message'){
            if(value.length > 3) {
                this.setState({validateMessage: true});
            }
        }

        this.setState({
            [name]: value
        });

    }


    handleSubmit(event) {
        console.log(this.state.name + ' ' + this.state.email+ ' ' + this.state.phone + ' ' + this.state.message);
        event.preventDefault();

        if(this.state.validateName === true) {
            this.formData.set('Nombre', this.state.name);
        }

        if(this.state.validateEmail === true) {
            this.formData.set('Email', this.state.email);
        }

        this.formData.set('Telefono', this.state.phone);

        if(this.state.validateMessage === true) {
            this.formData.set('Mensaje', this.state.message);
        }

        console.log(this.formData);
        console.log(this.state.validateName + this.state.validateEmail == true + this.state.validateMessage == true);

        if(this.state.validateEmail == true & this.state.validateName == true && this.state.validateMessage == true) {
            axios({
                method: 'post',
                url: 'http://www.dev.sergiomanzur.com/api/contacto/',
                data: this.formData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
            this.setState({formStatus: 3});
        } else {
            this.setState({formStatus: 2});
        }

    }


    render() {

        ReactGA.initialize('UA-65003463-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        const formStatus = this.state.formStatus;

        const nothing = (<Alert variant="danger"> You need to fill all required fields (*). <br/>
        All fields need to have 3 or more characters. </Alert>);

        const successful = (<Col>
            <h2>El correo ha sido enviado con éxito</h2>
            <br/>
            <p>Recibirás una respuesta en las próximas 24 horas.</p>
        </Col>)

        let formDisplay;


        const mainForm = (
            <Row>
            <Col xs={12} md={12} lg={{span: 6, offset: 3}} >
                {formStatus == 2 ? nothing : ''}
           <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>* Nombre Completo</Form.Label>
                    <Form.Control type="text" placeholder="Introduce tu nombre completo" name="name" value={this.state.name} onChange={this.handleInputChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>* Email</Form.Label>
                    <Form.Control type="email" placeholder="email@dominio.com" name="email" value={this.state.email} onChange={this.handleInputChange} required />
                    <Form.Text className="text-muted">
                        Tu correo electrónico jamás será compartido.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" placeholder="(833)2171717" name="phone"  value={this.state.phone} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>* Mensaje</Form.Label>
                    <Form.Control as="textarea" rows="3" name="message" value={this.state.message} onChange={this.handleInputChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
           </div>
            </Col>
            </Row>);

        if(formStatus == 1) {
            formDisplay = mainForm;
        } else if(formStatus == 2) {
            formDisplay =  mainForm;
        } else {
            formDisplay = successful;
        }


        return (
            <Row>
                <Container>
                    <h1>Contacto</h1>
                    <Image style={{marginBottom: "10px"}} src="http://www.dev.sergiomanzur.com/site/assets/files/1019/contacto_1.jpg?nc=1568222763" fluid/>

                    {formDisplay}

                </Container>
            </Row>
        )

    }

}


export default Contact;
