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
import { useNavigate, useParams } from 'react-router-dom';

const Barra = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { evento } = useParams();
  const data = useSelector((content) => content.drinks.drinks);
  const [ event, setEvent ] = useState(true)
  const [ drinks, setDrinks ] =  useState([])
  
  useEffect(() => {
     dispatch(getDrink());
     if(data.lenght !== 0){
        getEventos();
     }

  }, [dispatch, data]);

  const getEventos = async () => {
    
    const querySnapshot = await getDocs(query(collection(db, "events"), where( "slug", "==", evento )));
    querySnapshot.forEach((doc) => {
      
      setEvent(doc.data().active)
      const prevDrinks = doc.data().drinks;
      setDrinks(() => {
        const updatedDrinks = prevDrinks.map((drink) => {
          const firebaseData = data.find((item) => item.id === drink.id);
  
          if (firebaseData) {
            return {
              ...drink,
              image: firebaseData.image,
              title: firebaseData.title,
            };
          }
          return drink;
        });
  
        return updatedDrinks;
      });
      
    });
    
    
  }
    return (
        <Fragment>
          <div style={{width: '100%', height: 10}}></div>
          <Breadcrumb parent="Bebidas" title="Bebidas" />

          {
            event === true
            ? <div>
              <Container fluid={true} className="product-wrapper" style={{marginBottom: 80}}>
                <div className="product-grid">
    
                  <div className="product-wrapper-grid" >
                      <Row className="gridRow">
                        {drinks
                          ? drinks.map((item, i) => (
                              item.active === true ?
                                <Products item={item} i={i} key={i} />
                                : ''
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
