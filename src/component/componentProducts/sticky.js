import { Button, Card, Col, Container, Row } from 'reactstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalLogin from './ModalLogin';
import SweetAlert from "sweetalert2";
import { canceleCart } from '../../redux/actions/cart.actions';
import { useNavigate, useParams } from 'react-router-dom';

const Sticky = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { evento } = useParams();
  const productosCart = useSelector(state => state.Cartdata)
  const [ cantProduct, setCantProduct ] = useState(0);
  const [ total, setTotal ] = useState(0);
  const [modal, setModal] = useState(false);
  const userF = useSelector((state) => state.login.user)

useEffect(() => {
  let cant = 0;
  let suma = 0;
  if (productosCart !== undefined && productosCart.cart !== undefined) {
    const prod = productosCart.cart;
    if (prod.length > 0) {
      prod.forEach((item) => {
        cant += item.qty;
        suma += item.sum;
      });
      setCantProduct(cant);
      setTotal(suma);
    }else{
      setCantProduct(0);
      setTotal(0);
    }
  }
}, [productosCart]);

  const toggle = () => setModal(!modal);

  const buyProduct = () => {
    history(`/checkout/${evento}`);
  };

  const cancelarCompra = () =>{
    dispatch(canceleCart())
    history(`../../bebidas/${evento}`)
  }

  const Displayalert = () => {
    SweetAlert.fire({
      title: "Estás seguro de vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        cancelarCompra()
        SweetAlert.fire("Carrito vaciado!");
      } else {
        SweetAlert.fire("No se realizaron los cambios!");
      }
    });
  }
  
  return (
    <div className="fixed-bottom">
      <Container>
        <Row>
          <Col>
            <Card 
              style={{
                  minHeight: 50,
                  marginBottom: 0,
                  paddingTop: 15,
                  maxWidth: 400,
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'center',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: 0,
                  backgroundColor: '#6f42c1' 
                }} >
              <Container>
                <Row>
                  <Col sm='12'>
                    <Container>
                      <Row>
                        <Col style={{textAlign: 'center', color: 'white'}}>
                          <h6 >{cantProduct} productos</h6>
                        </Col>
                        <Col style={{textAlign: 'center', color: 'white'}}>
                          <h6 >Total $ {total}</h6>
                        </Col>
                      </Row>
                    </Container>
                    
                  </Col>
                  <Col className='text-end' style={{marginTop:10, marginBottom:10}}>
                  <Button
                          color="primary"
                          className="m-l-10"
                          onClick={Displayalert}
                          style={{marginTop: -8}}
                        >
                          Vaciar
                      </Button>
                  </Col>
                   <Col className='text-start' style={{marginTop:10, marginBottom:10}}>
                    <Button
                        color="primary"
                        className="m-r-10"
                        onClick={ userF.name ? buyProduct : toggle}
                        disabled={ total !== 0 ? false : true }
                        style={{marginTop: -8}}
                      >
                        Comprar
                      </Button>
                    </Col>
                </Row>
              </Container>

            </Card>
          </Col>
        </Row>
        <ModalLogin modal={modal} toggle={toggle} header={''} />
      </Container>
    </div>
  )
}

export default Sticky
