import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";


//css
import "./TotalCard.css";
import { getName, numberWithCommas } from "Helpers/Utils/Common";



function TotalCard({type, value, icon}) {

  return (
    <div className="total-card-cont card-cont mt-3">
        <div className="row">
            <div className="col-sm-12">
                <div className="total-card-details">
                 <Row>
                    <Col md={5}>
                        {icon}
                    </Col>
                    <Col md={7}>
                    <span className="value-detail">{numberWithCommas(value)}</span>
                    <p className="total-label">Total {type}</p>
                    </Col>
                 </Row>
                </div>
            </div>
        </div>
    </div>
  )
}

TotalCard.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.any
};

export default TotalCard