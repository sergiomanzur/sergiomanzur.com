import React, {useReducer} from 'react';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";


function reducer(state,action) {
    switch(action.type){

        case 'nameChanged':
            return {
                ...state,
                name: action.payload,
                isNameValid: action.payload.length > 3,
                isNameInvalid: action.payload.length <= 3
            };
        case 'emailChanged':{
            const valid= /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(action.payload);
            return {
                ...state,
                email: action.payload,
                isEmailValid: valid,
                isEmailInvalid: !valid
            };
        }
        case 'phoneChanged':
            return {
                ...state,
                phone: action.payload,
                isPhoneValid: action.payload.length === 10,
                isPhoneInvalid: action.payload.length !== 10
            };
        case 'messageChanged':
            return {
                ...state,
                message: action.payload,
                isMessageValid: action.payload.length > 3,
                isMessageInvalid: action.payload.length <= 3
            };
        case 'reset':
            return {
                ...state,
                name: '',
                email: '',
                phone: '',
                message: '',
                showForm: true,
                isLoading: false,
                isButtonActive: true
            };
        case 'sendingForm':
            return {
                ...state,
                showForm: false,
                isLoading: true,
                isButtonActive: false
            };
        case 'gotFormError':
            return {
                ...state,
                showForm: true,
                isLoading: false,
                isButtonActive: true,
                theError: action.payload
            };
        case 'formSuccess':
            return {
                ...state,
                showForm: false,
                isLoading: false,
                isButtonActive: false,
                isFormSuccess: true
            }
    }
}


const Contact = () => {

    const [state, dispatch] = useReducer(reducer,{
        name: '',
        isNameValid: false,
        isNameInvalid: false,
        isEmailValid: false,
        isEmailInvalid : false,
        isPhoneValid: false,
        isPhoneInvalid: false,
        isMessageValid: false,
        isMessageInvalid: false,
        validateForm : false,
        email: '',
        phone: '',
        message: '',
        isValid: false,
        showForm: true,
        isLoading: false,
        isButtonActive: true,
        isFormSuccess: false,
        theError: null
    });

    function handleSubmit(e) {
        e.preventDefault();

        if(state.isNameValid && state.isEmailValid &&  state.isPhoneValid && state.isMessageValid){
            const formData = new FormData();
            formData.set('Nombre', state.name);
            formData.set('Email', state.email);
            formData.set('Telefono', state.phone);
            formData.set('Mensaje', state.message);


            dispatch({type:'sendingForm'});
            axios({
                method: 'post',
                url: 'http://www.dev.sergiomanzur.com/api/contacto/',
                data: formData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    dispatch({type:'formSuccess'});
                })
                .catch(function (response) {
                    console.log(JSON.stringify(response.message));
                    dispatch({type: 'gotFormError', payload:JSON.stringify(response.message)});
                });

        } else {
            dispatch({type:'gotFormError', payload:'Datos inválidos'});
        }

    }


    function handleNameChange(event) {
        dispatch({type:'nameChanged', payload: event.target.value});
    }

    function handleEmailChange(event) {
        dispatch({type:'emailChanged', payload: event.target.value});
    }

    function handlePhoneChange(event) {
        dispatch({type:'phoneChanged', payload: event.target.value});
    }

    function handleMessageChange(event) {
        dispatch({type:'messageChanged', payload: event.target.value});
    }

    console.dir(state);

    const loading = state.isLoading ?<div style={{textAlign:"center"}}> <Spinner animation="border" /> </div> : null;


    const {isNameValid, isNameInvalid, isEmailValid, isEmailInvalid, isPhoneValid, isPhoneInvalid, validateForm,
        isMessageValid, isMessageInvalid, name, message, phone, email, isButtonActive} = state;

    const theForm = (
        <Row>
            <Col xs={12} md={12} lg={{span: 6, offset: 3}} >
                <div>
                    <Form validated={validateForm} onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>* Nombre Completo</Form.Label>
                            <Form.Control type="text" placeholder="Introduce tu nombre completo" name="name" isValid={isNameValid} isInvalid={isNameInvalid} value={name} onChange={handleNameChange} required />
                            <Form.Control.Feedback type="invalid">
                                Your name should be more than three characters.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>* Email</Form.Label>
                            <Form.Control type="email" placeholder="email@dominio.com" name="email" isValid={isEmailValid} isInvalid={isEmailInvalid} value={email} onChange={handleEmailChange} required />
                            <Form.Text className="text-muted">
                                Tu correo electrónico jamás será compartido.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>* Teléfono (10 dígitos)</Form.Label>
                            <Form.Control type="text" placeholder="(833)2171717" name="phone"  isValid={isPhoneValid} isInvalid={isPhoneInvalid} value={phone} onChange={handlePhoneChange} required />
                        </Form.Group>

                        <Form.Group controlId="formControlTextarea1">
                            <Form.Label>* Mensaje</Form.Label>
                            <Form.Control as="textarea" rows="3" name="message" value={message} isValid={isMessageValid} isInvalid={isMessageInvalid} onChange={handleMessageChange} required/>
                        </Form.Group>

                        <Button disabled={!isButtonActive} variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </div>
            </Col>
        </Row>
    );

    const successful = (<Col>
        <h2>El correo ha sido enviado con éxito</h2>
        <br/>
        <p>Recibirás una respuesta en las próximas 24 horas.</p>
    </Col>);

    const errorAlert = (
        <Alert variant='danger' >
            {state.theError}
        </Alert>
    );


    return(
        <div>
            <Container>
                <h1>Contacto</h1>
                <Image style={{marginBottom: "10px"}} src="http://www.dev.sergiomanzur.com/site/assets/files/1019/contacto_1.jpg?nc=1568222763" fluid/>

                {loading}
                {state.theError != null ? errorAlert : null}
                {state.showForm && !state.isFormSuccess ? theForm : null}
                {state.isFormSuccess ? successful : null}

            </Container>
        </div>
    );
}
export default Contact;
