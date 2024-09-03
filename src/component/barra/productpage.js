import { Button, Card, Col, Container, Media, Row } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { addToCart } from "../../redux/actions/products.actions";
import { getDrink } from "../../redux/actions/drinks.actions";

const Productpage = () => {
  const history = useNavigate();
  const { id } = useParams();
  // eslint-disable-next-line
  const [quantity, Setquantity] = useState(1);

  const dispatch = useDispatch();

  const drinks = useSelector((content) => content.drinks.drinks);

  const singleItem = drinks.filter( i => i.id === id);

  useEffect(()=>{
    dispatch(getDrink());
  },[])
  
  const addcart = (product, qty) => {
    history(`${process.env.PUBLIC_URL}/carrito`);
    dispatch(addToCart(product, qty));
  };
  const buyProduct = (product, qty) => {
    history(`${process.env.PUBLIC_URL}/ecommerce-app/checkout`);
    dispatch(addToCart(product, qty));
  };
  return (
    <Fragment>
      <div style={{width: '100%', height: 10}}></div>
      <Breadcrumb parent="Detalle de Bebidas" title="Detalle de Bebidas" />
      <Container fluid={true}>
        <Row>
          <Col>
            <Card>
              <div className="product-page-main">
                <Row>
                  <Col xl="4">
                        <Media
                          src={singleItem[0].image}
                          alt=""
                          className="img-fluid"
                        />

                    
                  </Col>
                  <Col xl="8">
                    <div className="product-page-details">
                      <h5 className="fw-bold">{singleItem[0].title}</h5>
                    </div>
                    <hr />
                    <p>{singleItem[0].description}</p>
                    <div className="product-price digits">
                      $ {singleItem[0].price}
                    </div>
                    <hr />
                    <div className="m-t-15">
                      <Button
                        color="primary-gradien"
                        className="m-r-10"
                        onClick={() => addcart(singleItem[0], quantity)}
                      >
                        Add To Cart
                      </Button>
                      <Button
                        color="success-gradien"
                        className="m-r-10"
                        onClick={() => buyProduct(singleItem[0], quantity)}
                      >
                        Buy Now
                      </Button>
                      <Link
                        to={`${process.env.PUBLIC_URL}/bebidas/bebidas`}
                        className="secondary-gradien"
                      >
                        <Button color="secondary-gradien">
                          continue shopping{" "}
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Productpage;
