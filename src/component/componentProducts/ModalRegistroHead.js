import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from "../../data/firebase/firebase";
import { getUser, signup } from "../../redux/actions/login.actions";
import { useDispatch, useSelector } from "react-redux";

import { Container } from 'react-trello';
import { ModalTitle } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ModalLoginHead = ({modal, toggle, header}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userF = useSelector((state) => state.login.user)
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ name, setName ] = useState('');
    const [ cartId, setCartId] = useState(null);

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

      function handleSignIn() {
        const provider = new GoogleAuthProvider();
    
        signInWithPopup(auth, provider)
          .then((result) => {
            setUser(result.user);
    
            dispatch(signup(result.user.displayName, result.user.phoneNumber, result.user.email))
            getCarts(result.user.displayName, result.user.phoneNumber, result.user.email)
            
              toggle()
            
          })
          .catch((error) => {
            console.error(error);
          });
      }
      
      const buyProduct = () => {
        history(`/checkout`);
      };

      const handleSignInPass = async () => {
        const data = {
          name: name,
          email: email,
          phone: phone,
          role: 'cliente',
          isActive: true
        }

        try {
          await createUserWithEmailAndPassword(auth, email, password);
           dispatch(signup(name, phone, email))
           getCarts(name, phone, email)

            toggle()

        } catch (error) {
          await signInWithEmailAndPassword(auth, email, password);
          dispatch(signup(name, phone, email))
          getCarts(name, phone, email)


            toggle()

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
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <ModalTitle>Registro</ModalTitle>
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
            <Col sm='12'>
                <Form className="theme-form">
                      <FormGroup className="row">
                        <Col sm="12">
                          <Input
                            className="form-control btn-pill"
                            type="text"
                            placeholder="Nombre completo"
                            onChange={(e) => { setName(e.target.value) }}
                          />
                        </Col>
                      </FormGroup>
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
                      <FormGroup className="row">
                        <Col sm="12">
                          <Input
                            className="form-control btn-pill"
                            type="number"
                            placeholder="Teléfono"
                            onChange={(e) => { setPhone(e.target.value) }}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                    <button onClick={handleSignInPass} className="pull-left btn btn-primary">Registrarme</button>
            </Col>
           
          </Row>
        </Container>
                    
                 
          
      </ModalBody>
      <ModalFooter style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
        <Button color="primary btn-pill" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  )

}

export default ModalLoginHead
