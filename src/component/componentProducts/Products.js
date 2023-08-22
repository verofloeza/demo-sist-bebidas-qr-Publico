import '../../assets/scss/stylesClub.scss'

import { ADD_TO_CART, DECREMENT_QTY, REMOVE_FROM_CART } from '../../redux/actionType';
import { Button, Card, Input, InputGroup } from 'reactstrap'
import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

const Products = ({item, i}) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const [stock, setStock] = useState("");
    const [open, setOpen] = useState(false);

    const addcart = (product, qty) => {
        dispatch({ type: ADD_TO_CART, payload: { product, qty } });
      };

    const minusQty = (product) => {
        if (quantity > 1) {
          setStock("InStock");
          setQuantity(quantity - 1);
            dispatch({ type: DECREMENT_QTY, payload: { product , quantity}})
          
        }else if(quantity === 1){
            setQuantity(quantity - 1);
            dispatch({ type: REMOVE_FROM_CART, payload: { product , quantity}})
        }else{
            
        }
      };
    
      const changeQty = (e) => {
        setQuantity(parseInt(e.target.value));
      };
    
      const plusQty = () => {
        if (quantity >= 0) {
            if(quantity === 0){
                setQuantity(1);
                addcart(item, (1))
            }else{
                setQuantity(quantity + 1);
                addcart(item, (quantity))
            }
          
        } else {
          setStock("Out of Stock !");
        }
      };
  return (
    <div className="col-xl-2 col-xs-6 xl-2 col-grid-box box-col-33 col-6" key={i}>
        <Card>
            <div className="product-box">
                <div className="product-img">+
                    <img className="img-fluid" src={item.image} alt="" />
                </div>
                <div className="product-details">
                    <h5>
                        <Link to={`${process.env.PUBLIC_URL}/ecommerce-app/product-page`}>{item.title}</Link>
                    </h5>
                    <div className="product-price">
                        $ {item.price}
                    </div>
                    <div className="product-qnty">
                        <div>
                            <InputGroup className="bootstrap-touchspin cienPorCiento">
                                <Button color="primary btn-square" className="bootstrap-touchspin-down" onClick={() => minusQty(item)}>
                                    <i className="fa fa-minus"></i>
                                </Button>
                                <Input className="touchspin text-center" type="text" name="quantity" value={quantity} onChange={(e) => changeQty(e)} style={{ display: "block" }} />
                                <Button color="primary btn-square" className="bootstrap-touchspin-up" onClick={plusQty}>
                                    <i className="fa fa-plus"></i>
                                </Button>
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
  )
}

export default Products
