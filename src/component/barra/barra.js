import '../../assets/scss/stylesClub.scss';

import { Button, Col, Container, Row } from 'reactstrap';
import React, { Fragment, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '../common/breadcrumb/breadcrumb';
import Products from '../componentProducts/Products';
import Sticky from '../componentProducts/sticky';
import { db } from '../../data/firebase/firebase';
import {getDrink} from '../../redux/actions/drinks.actions';
import { useNavigate } from 'react-router-dom';

const Barra = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((content) => content.drinks.drinks);
  const [ evento, setEvento ] = useState(true)
  
  useEffect(() => {
     dispatch(getDrink());
     getEventos()
  }, []);

  const getEventos = async () => {
    
    const querySnapshot = await getDocs(query(collection(db, "events"), where( "event", "==", "Evento 1" )));
    querySnapshot.forEach((doc) => {
      console.log(doc.data().isActive)
      setEvento(doc.data().isActive)
    });
    
  }
  console.log(evento)
    return (
        <Fragment>
          <div style={{width: '100%', height: 50}}></div>
          <Breadcrumb parent="Bebidas" title="Bebidas" />

          {
            evento === true
            ? <div>
              <Container fluid={true} className="product-wrapper" style={{marginBottom: 80}}>
                <div className="product-grid">
    
                  <div className="product-wrapper-grid" >
                      <Row className="gridRow">
                        {data
                          ? data.map((item, i) => (
                              <Products item={item} i={i} key={i} />
                            ))
                          : ""}
                      </Row>
                    
                  </div>
                </div>
              </Container>
              <Sticky />
            </div>
            : <Container>
              <Row>
                <Col>
                    <h6> La compra de bebidas para este evento ha sido finalizada! </h6>
                    <h6> Podés ver tus compras realizadas en el Menú - Pedidos, con inicio de sesión realizado </h6>
                    
                    <Button color="primary" size="sm" onClick={() => history('../../pedidos')} style={{marginTop: 15}}>
                      Ver Pedidos
                    </Button>
                    <h6 style={{marginTop: 15}}>En caso de olvidar su contraseña, podrá cambiarla desde la sección Inicio de Sesión</h6>

                </Col>
              </Row>
            </Container>
          }
          
        </Fragment>
      );
}

export default Barra
