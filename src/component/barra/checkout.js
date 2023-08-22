import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Timestamp, addDoc, collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../data/firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../common/breadcrumb/breadcrumb";
import GenerateQr from "../componentProducts/generateQr";
import { QRCodeCanvas } from "qrcode.react"
import SweetAlert from "sweetalert2";
import { canceleCart } from "../../redux/actions/cart.actions";
import { updateUser } from "../../redux/actions/login.actions";

const Checkout = () => {
  const history = useNavigate()
  const dispatch = useDispatch();
  const userF = useSelector((state) => state.login.user)
  const [ nombre, setNombre ] = useState("");
  const [ tel, setTel ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ qr, setQr] = useState(null)

  useEffect(()=>{
    setNombre(userF.name)
    setTel(userF.phone)
    setEmail(userF.email)

 
  },[userF])
  useEffect(()=>{
        
    const checkFirebaseAuth = () => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            console.log(user.email)
          }
        });
      
        return () => unsubscribe();
      };
      
      checkFirebaseAuth();
},[auth])

  const updateTel = (tel) => {
    dispatch(updateUser(nombre, tel, email));
  };
  
  const updateNombre = (name) => {
    dispatch(updateUser(name, tel, email));
  };

  const cart = useSelector((content) => content.Cartdata.cart);
  const getCartTotal = (cartItems) => {
    var total = 0;
    var items = 0;
    for (var i = 0; i < cartItems.length; i++) {
      items = cartItems[i].qty * cartItems[i].price;
      total = total + items;
    }
    return total;
  };

 

  const crearPago = async () => {
    if (nombre !== "" && tel  !== "" && email !== "" ) {

      
      const userRef = collection(db, "orders");
            const order = {
                user: {
                  name: nombre,
                  email: email,
                  phone: tel,
                },
                product: cart,
                total: getCartTotal(cart),
                date: new Date(),
                isActive: true,
                event: 'Evento 1',
                dateEvent: new Date('2023-05-27'),
                qr: null
              };
              const productList = cart || [];
              const productText = productList.length > 0 ? productList.map((x) => x.qty + ' - ' + x.title).join(', ') : '';
              try {
                const docRef = await addDoc(userRef, order);
          
                const accessToken = "TEST-4572302144899635-081021-9c25a8bcb9688b76b0456fbf4483c03f-99911975";
                const url = "https://api.mercadopago.com/checkout/preferences";
                const data = {
                  "items": [
                    {
                      "title": `Sistema de Bebidas - ${productText}`,
                      "quantity": 1,
                      "unit_price": order.total
                    }
                  ],
                  "back_urls": {
                    "success": `http://localhost:3001/pagos/pago-exitoso/${email}/${docRef.id}`,
                    "failure": `http://localhost:3001/pagos/pago-fallido/${email}/${docRef.id}`,
                    "pending": `http://localhost:3001/pagos/pago-pendiente/${email}/${docRef.id}`
                  },
                  "auto_return": "approved"
                };
          
                const response = await fetch(url, {
                  method: "POST",
                  headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
                });
          
                const result = await response.json();
                const paymentUrl = result.init_point;
                window.location.href = paymentUrl;
              } catch (e) {
                console.error("Error al agregar la orden a Firestore:", e);
              }
    } else {
      alert('Debe completar el login');
    }
  };

  const Displayalert = () => {
    SweetAlert.fire({
      title: "Estás seguro de cancelar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        cancelarCompra()
        SweetAlert.fire("Carrito cancelado!");
      } else {
        SweetAlert.fire("No se realizaron los cambios!");
      }
    });
  }

    const cancelarCompra = () =>{
      dispatch(canceleCart())
      history('../bebidas/bebidas')
    }

    

  return (
    <Fragment>
      <div style={{width: '100%', height: 50}}></div>
      <Breadcrumb parent="Apps / ECommerce" title="Checkout" />
      <Container fluid={true}>
        <Row>
          <Col>
            <Card className="checkout">
              <CardHeader>
                <h5>Detalle de compra</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xl="6" sm="12">
                  <Form className="needs-validation">
                    <Row>
                      <FormGroup className="mb-6 col-sm-12">
                        <Label className="form-label">Nombre y apellido</Label>
                        <input
                          className="form-control"
                          type="text"
                          value={nombre}
                          name="firstName"
                          onChange={(e) => setNombre(e.target.value)}
                          onBlur={() => updateNombre(nombre)}
                        />
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup className="mb-3 col-sm-6">
                        <Label className="form-label">Teléfono</Label>
                        <input
                          className="form-control"
                          type="number"
                          name="phone"
                          value={tel}
                          onChange={(e) => setTel(e.target.value)}
                          onBlur={() => updateTel(tel)}
                        />
                      </FormGroup>
                      <FormGroup className="mb-3 col-sm-6">
                        <Label className="form-label">Email</Label>
                        <input
                          className="form-control"
                          type="text"
                          name="email"
                          value={email}
                          readOnly
                          disabled={true}
                        />
                      </FormGroup>
                    </Row>
                  </Form>
                  
                  
                  </Col>
                  <Col xl="6" sm="12">
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div className="checkbox-title">
                            <h4>Bebidas</h4>
                            <span>Total</span>
                          </div>
                        </div>
                        <ul className="qty">
                          {cart.map((item, index) => {
                            return (
                              <li key={index}>
                                {item.title} × {item.qty}{" "}
                                <span>
                                  $ {item.sum}
                                </span>
                              </li>
                            );
                          })}
                        </ul> 
                        <ul className="sub-total total">
                          <li>
                            Total{" "}
                            <span className="count">
                              $ {getCartTotal(cart)}
                            </span>
                          </li>
                        </ul>
                        
                        <div className="text-start mt-2">
                          <Button 
                            onClick={Displayalert} 
                            className="cart-btn-transform btn btn-primary"
                          >
                            Cancelar
                          </Button>
                          <Button 
                            onClick={crearPago} 
                            className="cart-btn-transform btn btn-primary"
                            style={{marginLeft: 5}}
                          >
                            Comprar
                          </Button>
                        </div>
                        
                        <div style={{ visibility: 'hidden'}}>
                          {
                            email
                            ?
                            qr 
                              ? <img className='files-gallery-item img-fluid' alt="img" src={qr} width={50} />
                              : <GenerateQr email={email}/> 
                            : <p></p>
                          }
                        </div>

                        
                          
                        
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Checkout;
