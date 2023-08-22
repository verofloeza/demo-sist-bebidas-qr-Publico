import { Button, Col, Input, InputGroup, Media, Modal, ModalHeader } from 'reactstrap'

import { Link } from 'react-router-dom'
import React from 'react'

const ModalView = ({ singleProduct, open, onCloseModal, quantity, minusQty, changeQty, plusQty, addcart }) => {
  return (
    <Modal className="modal-dialog modal-lg modal-dialog-centered product-modal" isOpen={open}>
        <ModalHeader toggle={onCloseModal}>
            <div className="product-box row align-items-center">
                <Col md="6" className="product-img">
                    <Media className="img-fluid" src={singleProduct.image} alt="" />
                </Col>
                <Col md="6" className="product-details  text-start">
                    {/* <h4>{singleProduct.category}</h4> */}
                    <div className="product-price font-primary" style={{ fontSize: "22px", marginBottom: "10px" }}>
                        $ {singleProduct.price}
                    </div>
                    <div
                        className="product-view"
                        style={{
                            padding: "20px 0",
                            borderTop: "1px dotted #aaaaaa",
                            borderBottom: "1px dotted #aaaaaa",
                            }}>
                        <h6 className="f-w-600">Product Details</h6>
                        <p className="mb-0">{singleProduct.description}</p>
                    </div>
                    <div className="product-qnty">
                        <h6 className="f-w-600">Cantidad</h6>
                        <div>
                            <InputGroup className="bootstrap-touchspin">
                                <Button color="primary btn-square" className="bootstrap-touchspin-down" onClick={minusQty}>
                                    <i className="fa fa-minus"></i>
                                </Button>
                                <Input className="touchspin text-center" type="text" name="quantity" value={quantity} onChange={(e) => changeQty(e)} style={{ display: "block" }} />
                                <Button color="primary btn-square" className="bootstrap-touchspin-up" onClick={plusQty}>
                                    <i className="fa fa-plus"></i>
                                </Button>
                            </InputGroup>
                        </div>
                        <div className="addcart-btn">
                            <Link to={`/ecommerce-app/cart`}>
                                <Button color="primary" className="me-2 mt-2" onClick={() => addcart(singleProduct, quantity)}>
                                    Add to Cart
                                </Button>
                            </Link>
                            <Link to={`/bebidas/bebidasDetalle/${singleProduct.id}`}>
                                <Button color="primary" className="me-2 mt-2">
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Col>
            </div>
        </ModalHeader>
    </Modal>
  )
}

export default ModalView
