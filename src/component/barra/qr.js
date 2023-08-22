import { Card, CardHeader, Col, Container, Row, Table } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from "react-redux";

import ProductsQr from '../componentProducts/ProductsQr';
import { db } from '../../data/firebase/firebase';
import { getOrder } from '../../redux/actions/order.actions';
import { useParams } from 'react-router-dom';

const Qr = () => {
    const dispatch = useDispatch();
    const { evento, email } = useParams();
    const [ ordenes, setOrdenes ] = useState( [])
    const [ qr, setQr ] = useState(null)
    useEffect(()=>{
      
      const obtenerOrdenes = async () =>{
        const userRefCartGet = collection(db, "orders");
        const q = query(userRefCartGet, where('user.email', '==', email), orderBy('date', 'desc'));
          
        try {
          const querySnapshot = await getDocs(q);
          const datos = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setOrdenes(datos);
        }catch (error) {
          console.error('Error al consultar los documentos:', error);
                  
        }

        const userRefCart = collection(db, "carts");
        const r = query(userRefCart, where('user.email', '==', email), orderBy('date', 'desc'), limit(1));
        
        try {
          const querySnapshot2 = await getDocs(r);
          const datos2 = querySnapshot2.docs[0];
          if (!querySnapshot2.empty) {
            
            setQr(datos2.data().qr);
          } else {
            setQr(null);
          }
        } catch (error) {
          console.error('Error al consultar los documentos:', error);
        }
      }
        
      obtenerOrdenes()
    },[])
  return (
    <Container fluid={true} className="tables-wrapper">
        <Row>
          <Col sm="12">
          <div style={{width: '100%', height: 50}}></div>
          </Col>
          <Col sm="12">
             {ordenes.length > 0
                ?<Card>
              <CardHeader>
                  <h4>{ ordenes[0].user.name }</h4>
                  <span className='mb-5'>
                    Tel: {ordenes[0].user.phone}<br></br>
                    emal: {ordenes[0].user.email}
                  </span>
               
                  <img
                    className="files-gallery-item img-fluid"
                    alt="img"
                    src={qr || ''}
                    width={350}
                    />  
              </CardHeader>
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th scope="col" style={{color: 'black'}}>Imagen</th>
                      <th scope="col" style={{color: 'black'}}>Bebida</th>
                      <th scope="col" style={{color: 'black'}}>Cantidad</th>
                      <th scope="col" style={{color: 'black'}}>Estado</th>
                      <th scope="col" style={{color: 'black'}}># Orden</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    ordenes.map(x => {
                      return x.product.map((i, index) => (
                        <ProductsQr key={index} id={x.id} image={i.image} title={i.title} qty={i.qty} discount={i.discount} status={x.status} />
                      ));
                    })
                  }
                  </tbody>
                </Table>
              </div>
            </Card>
            : <p></p>
            }

          </Col>
        </Row>
    </Container>
  )
}

export default Qr
