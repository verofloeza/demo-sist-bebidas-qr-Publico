import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import {Link, useParams, useSearchParams} from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react'
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

import { db } from '../../data/firebase/firebase';

const Pagos = () => {
    const { condition, id, email } = useParams();
    const [searchParams] = useSearchParams();
    const collectorId = searchParams.get('collection_id');
    const PaymentId = searchParams.get('payment_id');
    const [ qr, setQr ] = useState(null)

    console.log(email)
    useEffect(()=>{
      let status = 0;

      if( condition === 'pago-exitoso' ){
        status = 1
      }else if( condition === 'pago-pendiente' ){
        status = 2
      }else{
        status = 0
      }
      

      const updateOrder = async () =>{
        const userRefOrderGet = doc(db, "orders", id);
        try {
          await updateDoc(userRefOrderGet, { nroCollection:  collectorId, paymentId: PaymentId });
          } catch (e) {
              console.error("Error al agregar usuario a Firestore:", e);
          }

        const userRefCartGet = collection(db, "carts");
        const q = query(userRefCartGet, where('user.email', '==', email), orderBy('date', 'desc'), limit(1));
        
        try {
          const querySnapshot = await getDocs(q);
          const datos = querySnapshot.docs[0]
          if(datos.data().qr !== null){
            setQr(datos.data().qr)
            const userRefCart = doc(db, "carts", datos.id);
            const cart = {
                order: [ ...datos.data().order,  id ]
                
                };
            try {
                await updateDoc(userRefCart, cart);
            } catch (e) {
                console.error("Error al actualizar una orden a Firestore:", e);
            }
          }else{
            // Obtén una referencia al almacenamiento
            const storage = getStorage();

            // Especifica la ruta de la imagen en el almacenamiento
            const imagePath = `qr/Evento5/${email}.png`;

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
        
        if(qr !== null){
           const userRef = doc(db, "orders", id);
            const order = {
                status: status,
                qr: qr
                };
            try {
                await updateDoc(userRef, order);
            } catch (e) {
                console.error("Error al actualizar una orden a Firestore:", e);
            }

            // fetch('https://clubmasiva.com.ar/sistema/mails/enviarCorreo.php?qr=' + encodeURIComponent(qr) + '&email='+ email)
            // .then(() =>{
            //     console.log('correo enviado')
            // })
            // .catch(error => {
            //   console.error('Error al obtener la imagen del código QR:', error);
            // });
        }
        
       
        
      }
      updateOrder()
    }, [qr]);

    const changeStock = () => {
      
    }

  return (
    <Fragment>
      <div style={{width: '100%', height: 10}}></div>
      <Container>
        <Row>
            <Col>
              <Card>
                <CardBody>
                  {
                    condition !== 'pago-fallido'
                    ? 
                      condition === 'pago-exitoso'
                       ? 
                        <Container>
                          <Row>
                            <Col sm='12'><p style={{color: 'white', padding: '30px'}}>Gracias por su compra! Tu Qr de pedidos, queda guardado en tus pedidos, para que puedas utilizarlo cuando retiras tus bebidas durante el evento!</p> </Col>
                            <Col sm='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                              <img className='files-gallery-item img-fluid' alt="img" src={qr} width={200} />
                            </Col>
                            <Col sm='12' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px',}} >
                              <Link 
                                className="cart-btn-transform btn btn-primary"
                                to={`https://demo-sist-bebidas-qr-publico.vercel.app/qr/Evento5/${email}`}
                              >
                                Ver bebidas compradas
                              </Link>
                            </Col>
                          </Row>

                        </Container>
                    
                      : <div>
                          <p style={{color: 'white', padding: '30px'}}>Gracias por su compra! su pago queda pendiente, podráutilizar el qr una vez que se regularice su pago!</p>
                          <img className='files-gallery-item img-fluid' alt="img" src={qr} width={200} />
                        </div>
                    : <div>
                        <p style={{color: 'white', padding: '30px',  }}>Su pago fue rechazado, corrobore disponibilidad en su tarjeta y vuelva intentarlo, en su defecto contáctenos!</p>
                    </div>
                      
                  }
                  
                </CardBody>
              </Card>
            </Col>
        </Row>
    </Container>
    </Fragment>
    
  )
}

export default Pagos
