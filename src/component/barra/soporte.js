import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";
import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import SweetAlert from "sweetalert2";

const  Soporte = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ message, setMessage ] = useState('');

    const enviar = ()=>{
        fetch('https://fusionapps.com.ar/SistBeb/mail/enviarSoporte.php?name=' + name + '&email='+ email + '&phone='+ phone + '&message=' + message )
            .then((mensaje) =>{
                console.log(mensaje)
                console.log('correo enviado')
            })
            .catch(error => {
            
              console.error('Error al obtener la imagen del código QR:', error);
            });
        setTimeout(() => {
                SweetAlert.fire({
                  title: "Correo enviado",
                  icon: "success",
                });
        }, 2000);
    }

  return (
    <div>
      
      <Container>
        <Row>
            <Col sm="12">
            <div style={{width: '100%', height: 10}}></div>
            </Col>
            <Col>
                <h6>Si tuvistes algun problema, envianos un email a <Link to={`mailto:info@fusionapps.com.ar`}>info@fusionapps.com.ar</Link></h6>
            </Col>
            
        </Row>
      </Container>
      <Container fluid={true}>
                <Row>
                <Col sm="12">
                    <Card>
                    <CardHeader>
                        <h5>Formulario de soporte</h5>
                    </CardHeader>
                    <Form className="form theme-form">
                        <CardBody>
                        <Row>
                            <Col>
                            <FormGroup>
                                <Label className="form-label" htmlFor="exampleFormControlInput1">
                                Nombre Completo
                                </Label>
                                <Input
                                className="form-control"
                                type="text"
                                placeholder="Nombre Completo"
                                onChange={(e) => setName(e.target.value)}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <FormGroup>
                                <Label className="form-label" htmlFor="exampleFormControlInput1">
                                Email
                                </Label>
                                <Input
                                className="form-control"
                                type="email"
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <FormGroup>
                                <Label className="form-label" htmlFor="exampleFormControlInput1">
                                Telefono
                                </Label>
                                <Input
                                className="form-control"
                                type="text"
                                placeholder="11-1111-1111"
                                onChange={(e) => setPhone(e.target.value)}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <FormGroup className="mb-0">
                                <Label className="form-label">Mensaje</Label>
                                <Input
                                type="textarea"
                                className="form-control"
                                rows="3"
                                onChange={(e) => setMessage(e.target.value)}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" className="me-3" type='button' onClick={enviar}>
                                Enviar
                            </Button>
                            <Button className="btn btn-light" type="reset">
                                Cancel
                            </Button>
                        </CardFooter>
                    </Form>
                    </Card>
                </Col>
                </Row>
            </Container>
    </div>
  )
}

export default Soporte;
