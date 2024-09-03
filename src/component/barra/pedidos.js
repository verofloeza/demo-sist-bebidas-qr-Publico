import { Card, CardHeader, Col, Container, Row, Table } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react'
import { auth, db } from '../../data/firebase/firebase';
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useDispatch, useSelector } from "react-redux";

import SweetAlert from "sweetalert2";
import { getordenes } from '../../redux/actions/order.actions';

const Pedidos = () => {
    const history = useNavigate();
    const dispatch = useDispatch()
    const listado = useSelector((state) => state.order.cart)
    const [ qr, setQr ] = useState(null )
    useEffect(()=>{
        
        const checkFirebaseAuth = () => {
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
              if (user) {
                
                dispatch(getordenes(user.email))
                
                const userRefCartGet = collection(db, "carts");
                const q = query(userRefCartGet, where('user.email', '==', user.email), orderBy('date', 'desc'), limit(1));
                
                try {
                  const querySnapshot = await getDocs(q);
                  const datos = querySnapshot.docs[0]
                  if(datos.data().qr !== null){
                    setQr(datos.data().qr)
                  }else{
                    // Obtén una referencia al almacenamiento
                  const storage = getStorage();

                  // Especifica la ruta de la imagen en el almacenamiento
                  const imagePath = `qr/JR-Recital/${user.email}.png`;

                  // Crea una referencia a la imagen en el almacenamiento
                  const imageRef = ref(storage, imagePath);

                  // Obtén la URL de descarga de la imagen
                  getDownloadURL(imageRef)
                    .then(async (url) => {
                      const userRefCart = doc(db, "carts", datos.id);
                      const cart = {
                          qr: url
                          };
                      try {
                          await updateDoc(userRefCart, cart);
                          setQr(url)
                      } catch (e) {
                          console.error("Error al actualizar una orden a Firestore:", e);
                      }
                      setQr(url)
                      console.log('URL de descarga:', url);
                      // Utiliza la URL para mostrar la imagen o realizar otras acciones
                    })
                    .catch((error) => {
                      console.error('Error al obtener la URL de descarga:', error);
                    });
                  }
                  
                  
                }catch (error) {
                  console.error('Error al consultar los documentos:', error);
                  
                }
              }else{
                Displayalert()
                history(`${process.env.PUBLIC_URL}/bebidas/bebidas`);
              }
            });
          
            return () => unsubscribe();
          };
          
          checkFirebaseAuth();
    },[auth])
    const Displayalert = () => {
    SweetAlert.fire({
      title: "Login",
      text: "Se necesita estar logueado para poder ver tus pedidos",
      icon: "error",
    });
  }
  return (
    <Fragment>
      <div style={{width: '100%', height: 10}}></div>
      <Container fluid={true} className="tables-wrapper">
        <Row>
          <Col sm="12">
            {
                listado.length > 0
                ?<Card>
              <CardHeader>
                <h5>{listado[0].data.user.name}</h5>
                <span>
                  Tel: {listado[0].data.user.phone}<br></br>
                  emal: {listado[0].data.user.email}
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th scope="col" style={{color: 'black'}}></th>
                      <th scope="col" style={{color: 'black'}}>Qr</th>
                      <th scope="col" style={{color: 'black'}}>Fecha</th>
                      <th scope="col" style={{color: 'black'}}>Evento</th>
                      <th scope="col" style={{color: 'black'}}>Fecha del evento</th>
                      <th scope="col" style={{color: 'black'}}>Estado</th>
                      <th scope="col" style={{color: 'black'}}># Orden</th>
                    </tr>
                  </thead>
                  <tbody>
                  {listado.map((item, index) => {
                    const date = item.data.date?.toDate?.();
                    const formattedDate = date ? date.toLocaleDateString() : ''; 

                    const dateEvent = item.data.dateEvent?.toDate?.();
                    const formattedDateEvent = dateEvent ? dateEvent.toLocaleDateString() : ''; 

                    return (
                        <tr key={(index + 1)}>
                        <td style={{color: 'black'}}>
                          <Link to={`/qr/Evento1/${listado[0].data.user.email}`}>
                            Ir al pedido
                          </Link>
                        </td>
                        <td style={{color: 'black'}}>
                            <Link to={`/qr/Evento1/${listado[0].data.user.email}`}>
                             <img
                                className="files-gallery-item img-fluid"
                                alt="img"
                                src={qr || ''}
                                width={150}
                                />   
                            </Link>
                            
                        </td>
                        <td style={{color: 'black'}}>{formattedDate}</td>
                        <td style={{color: 'black'}}>{item.data.event}</td>
                        <td style={{color: 'black'}}>{formattedDateEvent}</td>
                        <td style={{color: 'black'}}>
                        {
                                item.data.status
                                ? 
                                  item.data.status === 1
                                  ? <div>
                                        <i className="fa fa-circle font-success f-12" />{ ' ' }
                                        Pago realizado
                                      </div>
                                  : item.data.status === 2
                                    ? <div>
                                        <i className="fa fa-circle font-warning f-12" />{ ' ' }
                                        Pago pendiente
                                      </div>
                                    : <div>
                                        <i className="fa fa-circle font-danger f-12" />{ ' ' }
                                        Pago cancelado
                                      </div>
                                : !item.data.qr
                                  ?
                                  <div>
                                    <i className="fa fa-circle font-danger f-12" />{ ' ' }
                                    Pago cancelado
                                  </div>
                                  : <div>
                                      <i className="fa fa-circle font-success f-12" />{ ' ' }
                                        Pago realizado
                                    </div>
                              }
                        </td>
                        <td style={{color: 'black'}}>{(index + 1)}</td>
                        </tr>
                    );
                    })}

                  </tbody>
                </Table>
              </div>
            </Card>
            :
            <div></div>
            }
            
            

          </Col>
        </Row>
    </Container>
    </Fragment>
    
  )
}

export default Pedidos
