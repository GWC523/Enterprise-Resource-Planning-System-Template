import React, { useState } from "react";
import Navbar from "Components/Navbar/Navbar";
import PropTypes from "prop-types";
import Button from "Components/Button/Button";
import Table from "Components/Table/Table";
import Header from "Components/Header/Header";
import Row from "react-bootstrap/Row";

//css
import "./Users.css";
import { Navigate } from "react-router-dom";
import ModalPopUp from "Components/Modal/Modal";
import ExportPDF from "Components/ExportPDF/ExportPDF";

const headingColumns = ["USER", "ROLE", "STATUS", "BRANCH", "CREATED ON"];

function Users({ setIsChecked, isChecked }) {
  const [ready, setReady] = useState(true) //set to false when it is api dependent
  const [inactive, setInactive] = useState(false);
  const [activeRow, setActiveRow] = useState({id: "", name: ""});
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
  const [users, setUsers] = useState([
    {
      id: 1,
      user: "Gwyneth Chiu",
      role: "Admin",
      status: "Inactive",
      branch: "Sample Co. - Cebu City",
      registeredOn: new Date().toDateString()
    },
    {
      id: 2,
      user: "User Sample",
      role: "Admin",
      status: "Active",
      branch: "Sample Co. - Cebu City",
      registeredOn: new Date().toDateString()
    },
  ]);
  const [filteredData, setFilteredData] = useState(users);

  //SORTING
  const [toggleSort, setToggleSort] = useState({ index: 0, status: false });

  React.useEffect(() => {
    if (!toggleSort.status) {
      setUsers(
        [...users].sort((a, b) =>
          a[headingColumns[toggleSort.index].toLowerCase()] <
          b[headingColumns[toggleSort.index].toLowerCase()]
            ? -1
            : 1,
        ),
      );
    } else {
      setUsers(
        [...users].sort((a, b) =>
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
        title="Add User"
        role="add"
        className="add-btn"
        onClick={() => setNavigate("add-user")}
      />
    );
  }

  //EXPORT BUTTON
  function handleExport() {
    if (ready == true) {
      //Set ready equal to true when api request function is done giving the response
      return (
        <ExportPDF
          name={"Users"}
          data={users}
          header={headingColumns}
        />
      );
    } else {
      return (
        <button className="branches-export-btn" disabled>
          Loading Data...
        </button>
      );
    }
  }

  React.useEffect(() => {
    if(activeRow.name !== "") {
      handleShowDelete();
    }
  },[activeRow])

  React.useEffect(() => {
    let result = users.filter((user) => user.user.toLowerCase().includes(search.toLowerCase()));

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

  if (navigate === "add-user") {
    return <Navigate to="/add-user" />;
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
          type={"users"}
          title="Manager"
          subtitle="Users"
          withSearch={true}
          setSearch={setSearch}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          endDate={endDate}
          startDate={startDate}
          extraButtons={[handleExport, toAddForm]}
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
Users.propTypes = {
  setIsChecked: PropTypes.any,
  isChecked: PropTypes.bool,
};

export default Users;
