import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from "../../data/firebase/firebase";
import { getUser, signup } from "../../redux/actions/login.actions";
import { useDispatch, useSelector } from "react-redux";
import ModalRegistroHead from '../componentProducts/ModalRegistroHead';

import { Container } from 'react-trello';
import { ModalTitle } from 'react-bootstrap';
import SweetAlert from "sweetalert2";

const ModalLoginHead = ({modalIn, toggleIn, header}) => {
    const dispatch = useDispatch();
    const userF = useSelector((state) => state.login.user)
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ name, setName ] = useState('');
    const [ cartId, setCartId] = useState(null);
    const [ recoverPass, setRecoverPass ] = useState(false)
    const [ message, setMessage ] = useState('');
    const [emailRecorve, setEmailRecorve] = useState('');
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        
           const checkFirebaseAuth = () => {
            const unsubscribe = auth.onAuthStateChanged((user) => {

                if (user) {
                dispatch(getUser(auth.currentUser.email));
                }
            });
            
            return () => unsubscribe();
            };
            
            checkFirebaseAuth();
     
                
      },[])

      const toggle = () => { 
        setModal(!modal)
      };

      function handleSignIn() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            setUser(result.user);
    
            dispatch(signup(result.user.displayName, result.user.phoneNumber, result.user.email))
            getCarts(result.user.displayName, result.user.phoneNumber, result.user.email)
            
              toggleIn()
            
          })
          .catch((error) => {
            console.error(error);
          });
      }

      const handleSignInPass = async () => {
        const data = {
          name: name,
          email: email,
          phone: phone,
          role: 'cliente',
          isActive: true
        }

        try {
          await signInWithEmailAndPassword(auth, email, password);
          dispatch(signup(name, phone, email))
          getCarts(name, phone, email)


            toggleIn()

        } catch (error) {
          

          console.log('Error al iniciar sesión', error);
        }
      }

      const getCarts = async (nombre, tel, email) => {
        const userRef = collection(db, 'carts');
        const orderData = {
          user :{
            name: nombre,
            email: email,
            phone: tel
          },
          date: new Date(),
          isActive: true,
          event: 'Evento 1',
          dateEvent: new Date('2023-05-27'),
          qr: null
        }
        const q = query(userRef, where('user.email', '==', email), orderBy('date', 'desc'), limit(1));
        try {
                    const querySnapshot = await getDocs(q);
                    if (querySnapshot.empty) {
                      const docRef = await addDoc(userRef, orderData);
                      setCartId(docRef.id)
                      
                    } else {
                      const lastOrder = querySnapshot.docs[0];
                      const lastOrderData = lastOrder.data();
                      
                      setCartId(lastOrder.id)
                      
                      
                    }
                  } catch (error) {
                    console.error('Error al consultar los documentos:', error);
                    
                  }
      
        
      }
    const recover = () => setRecoverPass(!recoverPass)
    const volver =  () => setRecoverPass(!recoverPass)
    
    const recuperar = async () => {
      const userRef = collection(db, 'Users');
      const q = query(userRef, where('email', '==', emailRecorve));
      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          
          setMessage('El usuario no existe!')
          
        } else {
          await sendPasswordResetEmail(auth, emailRecorve)
          .then(() => {
            // Email de restablecimiento de contraseña enviado correctamente
            console.log("Se ha enviado un correo electrónico para restablecer la contraseña.");
          })
          .catch((error) => {
            // Error al enviar el correo electrónico de restablecimiento de contraseña
            console.log(error);
  });
          
          
          
        }
      } catch (error) {
        console.error('Error al consultar los documentos:', error);
        
      }
    }
  return (
    <Modal isOpen={modalIn} toggle={toggleIn}>
      <ModalHeader toggle={toggleIn}>
        <ModalTitle>Login requerido</ModalTitle>
      </ModalHeader>
      <ModalBody  style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
        <Container>
          <Row>
          
            <Col sm='12' >
                {userF.name ? (
                <p>{userF.name}</p>
                ) : (
                <button onClick={handleSignIn} className="pull-left btn btn-primary">Iniciar sesión con Google</button>
              )}
            </Col>
            <hr className="mt-4 mb-4" />
            {
              recoverPass === false
              ? <Col sm='12'>
                  <Form className="theme-form">
                        <FormGroup className="row">
                          <Col sm="12">
                            <Input
                              className="form-control btn-pill"
                              type="email"
                              placeholder="Email"
                              onChange={(e) => { setEmail(e.target.value) }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup className="row">
                          <Col sm="12">
                            <Input
                              className="form-control btn-pill"
                              type="password"
                              placeholder="Contraseña"
                              onChange={(e) => { setPassword(e.target.value) }}
                            />
                          </Col>
                        </FormGroup>
                      </Form>
                      <Row>
                        <Col>
                          <button onClick={handleSignInPass} className="pull-left btn btn-primary">Iniciar</button>
                        </Col>
                        <Col>
                          <button onClick={recover} className="pull-left btn btn-primary ">Olvidé mi contraseña</button>
                        </Col>
                      </Row>
                      
                      
                  </Col>
               : <Col sm='12'>
                  <Form className="theme-form">
                        <FormGroup className="row">
                          <Col sm="12">
                            <Input
                              className="form-control btn-pill"
                              type="email"
                              placeholder="Email"
                              onChange={(e) => { setEmailRecorve(e.target.value) }}
                            />
                          </Col>
                        </FormGroup>
                        
                      </Form>
                      <Row>
                        <Col>
                          <button onClick={recuperar} className="pull-left btn btn-primary">Enviar contraseña</button>
                        </Col>
                        <Col>
                          <button onClick={volver} className="pull-left btn btn-primary ">Volver</button>
                        </Col>
                      </Row>
                      
                      
                  </Col>
            }
            
           
          </Row>
        </Container>
                    
                 
          
      </ModalBody>
      <ModalFooter style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
        <p>No estas registrado?</p>
        <Button color="primary btn-pill" onClick={toggle}>Registrarse</Button>
        <Button color="primary btn-pill" onClick={toggleIn}>Cerrar</Button>
      </ModalFooter>
      <ModalRegistroHead  modal={modal} toggle={toggle} header={'header'} toggleIn={toggleIn}/>
    </Modal>
  )

}

export default ModalLoginHead
