import React, { useState } from "react";
import Navbar from "Components/Navbar/Navbar";
import PropTypes from "prop-types";
import Button from "Components/Button/Button";
import Table from "Components/Table/Table";
import Header from "Components/Header/Header";
import Row from "react-bootstrap/Row";

//css
import "./Customers.css";
import { Navigate } from "react-router-dom";
import ModalPopUp from "Components/Modal/Modal";
import { getCustomerDummies } from "Helpers/Constants/CustomerDummyData";

const headingColumns = ["NAME", "ADDRESS", "BRANCH", "REGISTERED ON"];

function Customers({ setIsChecked, isChecked }) {
  const [inactive, setInactive] = useState(false);
  const [activeRow, setActiveRow] = useState({ id: "", name: "" });
  const [search, setSearch] = useState("");
  const [navigate, setNavigate] = useState("");
  const [endDate, setEndDate] = useState("")
  const [startDate, setStartDate] = useState("")

  //DELETE MODAL
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = () => {
    handleCloseDelete();
    setShowDelete(true);
  };

  //DATA
  const [customers, setCustomers] = useState(getCustomerDummies(100));
  const [filteredData, setFilteredData] = useState(customers);

  //SORTING
  const [toggleSort, setToggleSort] = useState({ index: 0, status: false });

  React.useEffect(() => {
    if (!toggleSort.status) {
      setCustomers(
        [...customers].sort((a, b) =>
          a[headingColumns[toggleSort.index].toLowerCase()] <
          b[headingColumns[toggleSort.index].toLowerCase()]
            ? -1
            : 1,
        ),
      );
    } else {
      setCustomers(
        [...customers].sort((a, b) =>
          a[headingColumns[toggleSort.index].toLowerCase()] >
          b[headingColumns[toggleSort.index].toLowerCase()]
            ? -1
            : 1,
        ),
      );
    }
  }, [toggleSort]);

  //ADD FORM BUTTON
  function toAddForm() {
    return (
      <Button
        title="Add Customer"
        role="add"
        className="add-btn"
        onClick={() => setNavigate("add-customer")}
      />
    );
  }

  React.useEffect(() => {
    if (activeRow.name !== "") {
      setNavigate("edit-customer")
    }
  }, [activeRow]);

  React.useEffect(() => {
    let result = customers.filter((customer) => customer.name.toLowerCase().includes(search.toLowerCase()));

    setFilteredData(
      result.filter(row => {
        let filterPass = true
        const date = new Date(row.registeredOn)
        if (startDate) {
          filterPass = filterPass && (new Date(startDate) < date)
        }
        if (endDate) {
          filterPass = filterPass && (new Date(endDate) > date)
        }
        //if filterPass comes back `false` the row is filtered out
        return filterPass
      })
    )
  }, [startDate, endDate, search])

  if (navigate === "edit-customer") {
    return <Navigate to={"/edit-customer/" + activeRow.id} />;
  }

  if (navigate === "add-customer") {
    return <Navigate to="/add-customer" />;
  }

  return (
    <div className="page">
      <Navbar
        onCollapse={(e) => {
          setInactive(e);
        }}
        active={"MANAGE"}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
      />
      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <Header
          type={"customers"}
          title="Manager"
          subtitle="Customers"
          withSearch={true}
          setSearch={setSearch}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          endDate={endDate}
          startDate={startDate}
          exportData={filteredData}
          extraButtons={[toAddForm]}
          withExport={true}
          className="customer-subtitle"
        />
        <Row>
          <Table
            type={"users"}
            withSubData={false}
            tableData={filteredData}
            headingColumns={headingColumns}
            useLoader={true}
            isReady={true}
            setID={setActiveRow}
            toggleSort={toggleSort}
            setToggleSort={setToggleSort}
          />
        </Row>
        {/**DELETE MODAL */}
        <ModalPopUp
          type="delete"
          show={showDelete}
          handleClose={handleCloseDelete}
          title={"Delete User"}
          item={activeRow.name}
        />
      </div>
    </div>
  );
}

//DEFINE DATA TYPES
Customers.propTypes = {
  setIsChecked: PropTypes.any,
  isChecked: PropTypes.bool,
};

export default Customers;
