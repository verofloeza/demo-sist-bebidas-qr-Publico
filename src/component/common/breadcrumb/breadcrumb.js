import {Breadcrumb, BreadcrumbItem, Col, Container, Row} from 'reactstrap'

import {Link} from 'react-router-dom'
import React from 'react';

const Breadcrumbs = (props) => {
    return (
        <Container fluid={true}>
            <div className="page-header">
              <Row>
                <Col lg="6" className="main-header">
                  <h2>{props.title}<span></span></h2>
                </Col>
              </Row>
            </div>
        </Container>
    );
}

export default Breadcrumbs;