import React from 'react'
import { Spinner, Row, Col } from 'react-bootstrap';

const Loader = () => {
  return (
    <div 
        className="d-flex justify-content-center mt-5" 
        style={{height: '100vh'}}
    >
        <Row>
            <Col>
                <Spinner
                      className="spinner-border spinner-border-lg"
                      role="status"
                      style={{ height: '15vh', width: '15vh' }} 
                      animation={'border'}                >
                </Spinner>
                <div className="">
                <h2>Loading...</h2>
                </div>
            </Col>
        </Row>

    </div>
  )
}

export default Loader