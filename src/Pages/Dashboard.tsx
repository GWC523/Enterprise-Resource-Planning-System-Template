import Header from "Components/Header/Header";
import Navbar from "Components/Navbar/Navbar";
import WelcomeCard from "Components/WelcomeCard/WelcomeCard";
import { getUser } from "Helpers/Utils/Common";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataVisualization from "Components/DataVisualization/DataVisualization";
import TotalCard from "Components/TotalCard/TotalCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DoughnutChart } from "Components/DoughnutChart/DoughnutChart";


function Dashboard({setIsChecked, isChecked}) {
  const [inactive, setInactive] = useState(false);
  const user = getUser()

  const revenueIcon = () => {
    return (
      <div className="icon-card d-flex justify-content-center">
        <span className="dollar-sign">$</span>
      </div>
    )
  }

  const expensesIcon = () => {
    return (
      <div className="icon-card card-bg-1 d-flex justify-content-center">
        <span className="dollar-sign-2">$</span>
      </div>
    )
  }

  const projectIcon = () => {
    return (
      <div className="icon-card card-bg-2 d-flex justify-content-center">
        <span className="project-sign">
          <FontAwesomeIcon
              icon={"folder"}
              title={"project"}
              aria-hidden="true"
              className="project-icon"
          />
        </span>
      </div>
    )
  }

  const employeeIcon = () => {
    return (
      <div className="icon-card card-bg-3 d-flex justify-content-center">
        <span className="employee-sign">
          <FontAwesomeIcon
              icon={"user"}
              title={"employee"}
              aria-hidden="true"
              className="employee-icon"
          />
        </span>
      </div>
    )
  }

  return (
    <div className="page">
      <Navbar
        onCollapse={(e) => {
          setInactive(e);
        }}
        active={"DASHBOARD"}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
      />
      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <Header
          type={"users"}
          title="Dashboard"
        />
        <Row>
          <WelcomeCard user={user} />
        </Row>
        <Row>
          <Col>
            <TotalCard 
              type="revenue"
              value="$525600.00"
              icon={revenueIcon()}
            />
          </Col>
          <Col>
            <TotalCard 
              type="projects"
              value="150"
              icon={projectIcon()}
            />
          </Col>
          <Col>
            <TotalCard 
              type="head count"
              value="487"
              icon={employeeIcon()}
            />
          </Col>
          <Col>
            <TotalCard 
              type="expenses"
              value="$96532.00"
              icon={expensesIcon()}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-1">
            <DataVisualization />
          </Col>
          <Col md={6}>
            <DoughnutChart/>  
          </Col>
        </Row>

      </div>
    </div>
  );
}

Dashboard.propTypes = {
  setIsChecked: PropTypes.any,
  isChecked: PropTypes.bool,
};


export default Dashboard;
