import React from "react";
import PropTypes from "prop-types";
import { CSVLink, CSVDownload } from "react-csv";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "Components/Button/Button";

//css
import "./Header.css";


const Header = ({ type, title, subtitle, withSearch, withExport, setSearch, setEndDate, setStartDate, endDate, startDate, exportData, extraButtons, className }) => {
  if (withSearch) {
    return (
      <>
        <Row className="util-btn-cont">
          <Col sm={8}>
            <h1 className="page-title">{title}</h1>
            <h1 className={"page-subtitle " + className }>{subtitle}</h1>
          </Col>
          <Col>
            {/** Insert Buttons here **/}
            {withExport && (
              <Button
                type="export-csv"
                title="EXPORT TO CSV"
                role="export"
                className="export-btn"
                exportData={exportData}
                exportFileName={subtitle}
              />
            )}

            {extraButtons?.map((data: any) => {
              return data();
            })}
          </Col>
          <hr />
        </Row>
        <Row>
          {/** Insert Filter Dropdowns here **/}
          <Col sm={8} className="filters-input">
            {(type === "users" || type === "customers") && (
              <>
                <span className="filter-label">From:</span>
                <input type="date" className="filter-input" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                <span className="filter-label to-label">To:</span>
                <input type="date" className="filter-input"  value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
              </>
            )}
          </Col>
          <Col sm={4}>
            <div className="search-wrapper">
              <input
                id="name"
                type="text"
                name="name"
                placeholder={"Search " + subtitle}
                className="search-input"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="search-icon">
                <FontAwesomeIcon icon={"search"} aria-hidden="true" />
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <Row>
        <Col sm={8}>
          <h1 className="page-title">{title}</h1>
          <h1 className="page-subtitle">{subtitle}</h1>
        </Col>
        <Col>
          {/** Insert Buttons here **/}
          {withExport && (
            <Button
              type="export-csv"
              title="EXPORT TO CSV"
              role="export"
              className="export-btn"
              exportData={exportData}
              exportFileName={subtitle}
            />
          )}
        </Col>
        <hr />
      </Row>
    </>
  );
};

Header.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  withSearch: PropTypes.bool,
  withExport: PropTypes.bool,
  setSearch: PropTypes.func,
  setEndDate: PropTypes.func,
  setStartDate: PropTypes.func,
  endDate: PropTypes.any,
  startDate: PropTypes.any,
  exportData: PropTypes.array,
  extraButtons: PropTypes.array,
  className: PropTypes.string
};

export default Header;
