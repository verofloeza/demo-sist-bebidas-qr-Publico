import { Col, Media, Row } from 'reactstrap'

import React from 'react';
import Slider from 'react-slick';
import one from '../../../assets/images/ecommerce/01.jpg';
import three from '../../../assets/images/ecommerce/03.jpg';
import two from '../../../assets/images/ecommerce/02.jpg';

const Carousal = (props) => {

    var settings = {
        slidesToShow: 1,
        swipeToSlide: false,
        arrows: false,
        dots: false,
    };
    return (
        <div>
            <hr />

            <h6 className="f-w-600">New Products</h6>
            <div className="product-filter pb-0 new-products">
                <div className="owl-carousel owl-theme" id="testimonial">
                    <Slider {...settings}>
                        <div className="item">
                            <Row className="product-box">
                                <Col md="6" className="product-img">
                                    <Media className="img-fluid" src={one} alt="" data-original-title="" title="" />
                                </Col>
                                <Col md="6" className="product-details text-start">
                                    <span>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning"></i>
                                    </span>
                                    <p className="mb-0">Fancy Shirt</p>
                                    <div className="product-price">$100.00</div>
                                </Col>
                            </Row>
                            <Row className="product-box mt-2">
                                <Col md="6" className="product-img">
                                    <Media className="img-fluid" src={two} alt="" data-original-title="" title="" />
                                </Col>
                                <Col md="6" className="product-details text-start">
                                    <span>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning"></i>
                                    </span>
                                    <p className="mb-0">Fancy Shirt</p>
                                    <div className="product-price">$100.00</div>
                                </Col>
                            </Row>
                            <Row className="product-box mt-2">
                                <Col md="6" className="product-img">
                                    <img className="img-fluid" src={three} alt="" data-original-title="" title="" />
                                </Col>
                                <Col md="6" className="product-details text-start">
                                    <span>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning"></i>
                                    </span>
                                    <p className="mb-0">Fancy Shirt</p>
                                    <div className="product-price">$100.00</div>
                                </Col>
                            </Row>
                        </div>
                        <div className="item">
                            <Row className="product-box">
                                <Col md="6" className="product-img">
                                    <Media className="img-fluid" src={one} alt="" />
                                </Col>
                                <Col md="6" className="product-details text-start">
                                    <span>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning"></i>
                                    </span>
                                    <p className="mb-0">Fancy Shirt</p>
                                    <div className="product-price">$100.00</div>
                                </Col>
                            </Row>
                            <Row className="product-box mt-2">
                                <Col md="6" className="product-img">
                                    <Media className="img-fluid" src={two} alt="" />
                                </Col>
                                <Col md="6" className="product-details text-start">
                                    <span>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning"></i>
                                    </span>
                                    <p className="mb-0">Fancy Shirt</p>
                                    <div className="product-price">$100.00</div>
                                </Col>
                            </Row>
                            <Row className="product-box mt-2">
                                <Col md="6" className="product-img">
                                    <img className="img-fluid" src={three} alt="" />
                                </Col>
                                <Col md="6" className="product-details text-start">
                                    <span>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning me-1"></i>
                                        <i className="fa fa-star font-warning"></i>
                                    </span>
                                    <p className="mb-0">Fancy Shirt</p>
                                    <div className="product-price">$100.00  </div>
                                </Col>
                            </Row>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Carousal;