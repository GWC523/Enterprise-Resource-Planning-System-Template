import React, { useState } from "react";
import TableFooter from "./TableFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTable from "./Pagination";
import PropTypes from "prop-types";
import Moment from "moment";

//css
import "./Table.scss";

//images
import { formatDateSlash } from "../../Helpers/Utils/Common";
import TableLoader from "./TableLoader";

function Table({
  id,
  clickable,
  type,
  tableData,
  headingColumns,
  subHeadingColumns,
  movableColumns,
  breakOn = "small",
  givenClass,
  withSubData,
  setID,
  useLoader = false,
  isReady,
  exportToExcel,
  containerId,
  toggleSort,
  setToggleSort,
}) {
  //SUB HEADER NAVIGATION
  const [index, setIndex] = useState(0);

  //TRANSACTIONS
  const [startTransactionIndex, setStartTransactionIndex] = useState(0);
  const [endTransactionIndex, setEndTransactionIndex] = useState(6);

  //BRANCHES
  const [startBranchIndex, setStartBranchIndex] = useState(0);
  const [endBranchIndex, setEndBranchIndex] = useState(4);

  //PAGINATION
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(
    tableData
    ,page, 
    rowsPerPage);

  const next = () => {
    var i = index;
    if (tableData[0].branch_data.length - 1 > index) {
      setIndex(i + 1);
    }
  };

  const previous = () => {
    var i = index;
    if (index > 0) {
      setIndex(i - 1);
    }
  };

  let tableClass = "table-container__table";

  if (breakOn === "small") {
    tableClass += " table-container__table--break-sm";
  } else if (breakOn === "medium") {
    tableClass += " table-container_table--break-md";
  } else if (breakOn === "large") {
    tableClass += " table-container_table--break-lg";
  }

  /***
   * TABLE W/ SUBHEADERS
   */

  //SubHeader Data
  if (withSubData) {
    const mainData = tableData.map((row) => {
      let rowData = [];
      let i = 0;

      for (const key in row) {
        rowData.push({
          key: headingColumns[i],
          val: row[key],
        });
        i++;
      }

      return (
        <tr key={row.index}>
          <td>{formatDateSlash(row.tran_date)}</td>
          <td>{formatDateSlash(row.deposit_date)}</td>
          <td>{row.branch}</td>
          <td>{row.branch_code}</td>
          <td>{row.fusion_location_code}</td>
          <td>{row.outlet_type}</td>
          <td className="first-index">{row.csr_on_duty}</td>
          {row.branch_data.map((branch) => {
            return (
              <>
                <td>{branch.data.bank}</td>
                <td>{branch.data.bank_acc_num}</td>
                <td>{branch.data.deposit_ref_num}</td>
                <td>{branch.data.to_be_remitted}</td>
                <td>{branch.data.remitted_amount}</td>
                <td>{branch.data.over_short}</td>
                <td>{branch.data.reasons}</td>
              </>
            );
          })}
        </tr>
      );
    });

    return (
      <div className="table-container">
        <div className="search-table-container row"></div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((data, index) => {
                return <th key={index}>{data}</th>;
              })}
              <th colSpan="7">
                <button className="type-navigation-btn">
                  <button
                    className="previous-nav-btn"
                    onClick={() => previous()}
                  >
                    <FontAwesomeIcon
                      icon={"angle-left"}
                      alt={"open"}
                      className={"nav-icon"}
                      aria-hidden="true"
                    />
                  </button>
                  {isReady && tableData[0].branch_data[index].shippingType}
                  <button className="next-nav-btn" onClick={() => next()}>
                    <FontAwesomeIcon
                      icon={"angle-right"}
                      alt={"open"}
                      className={"nav-icon"}
                      aria-hidden="true"
                    />
                  </button>
                </button>
              </th>
            </tr>
            <tr>
              <th className=""></th>
              <th className=""></th>
              <th className=""></th>
              <th className=""></th>
              <th className=""></th>
              <th className=""></th>
              <th className="first-index"></th>
              {subHeadingColumns.map((data, index) => {
                return <th key={index}>{data}</th>;
              })}
            </tr>
          </thead>

          <tbody>
            {!isReady && useLoader ? (
              <td colSpan={15} key={index}>
                No data found
              </td>
            ) : (
              mainData
            )}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>
    );
  } else if (type === 'reports-daily-declaration"') {
    return (
      <div className="table-container">
        <div className="search-table-container row"></div>
        <table className={tableClass}>
          <thead>
            <tr>
              <th className="first-index">BRANCH</th>
              <th colSpan="5">
                <button className="type-navigation-btn">
                  <button
                    className="previous-nav-btn"
                    onClick={() => previous()}
                  >
                    <FontAwesomeIcon
                      icon={"angle-left"}
                      alt={"open"}
                      className={"nav-icon"}
                      aria-hidden="true"
                    />
                  </button>
                  {/* {tableData[index].shippingType} */}
                  <button className="next-nav-btn" onClick={() => next()}>
                    <FontAwesomeIcon
                      icon={"angle-right"}
                      alt={"open"}
                      className={"nav-icon"}
                      aria-hidden="true"
                    />
                  </button>
                </button>
              </th>
            </tr>
            <tr></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  } else {
    const data = slice.map((row, index) => {
      let i = 0;
      let rowData = [];

      if (type === "users") {
        for (const key in row) {
          rowData.push({
            key: headingColumns[i - 1],
            val: row[key],
          });
          i++;
        }
      } else {
        for (const key in row) {
          rowData.push({
            key: headingColumns[i],
            val: row[key],
          });
          i++;
        }
      }

      if (type === "users") {
        return (
          <tr key={row.index}>
            {rowData.slice(1).map((data, index) => (
              <td
                key={index}
                data-heading={data.key}
                className={data.val + " text-left"}
                onClick={() =>
                  setID({ id: row.id, status: row.status, name: row.user })
                }
              >
                {data.val}
                {data.value}
              </td>
            ))}
          </tr>
        );
      }

      return (
        <tr key={row.index}>
          {rowData.slice(1).map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={data.val + " text-left"}
            >
              {data.value}
            </td>
          ))}
        </tr>
      );
    });

    const transactionNext = () => {
      var end = endTransactionIndex;
      var start = startTransactionIndex;

      //number of total columns
      if (endTransactionIndex <= 10) {
        setEndTransactionIndex(end + 6);
        setStartTransactionIndex(start + 6);
      }
    };

    const transactionPrev = () => {
      var end = endTransactionIndex;
      var start = startTransactionIndex;
      if (startTransactionIndex > 0) {
        setEndTransactionIndex(end - 6);
        setStartTransactionIndex(start - 6);
      }
    };

    const branchNext = () => {
      var end = endBranchIndex;
      var start = startBranchIndex;

      //number of total columns
      if (endBranchIndex <= subHeadingColumns.length - 1) {
        setEndBranchIndex(end + 4);
        setStartBranchIndex(start + 4);
      }
    };

    const branchPrev = () => {
      var end = endBranchIndex;
      var start = startBranchIndex;
      if (startBranchIndex > 0) {
        setEndBranchIndex(end - 4);
        setStartBranchIndex(start - 4);
      }
    };

    //TABLE
    //BRANCHES TABLE
    if (type === "users") {
      return (
        <div className="table-container transaction-table-cont">
          <div className="search-table-container row"></div>
          <table className={tableClass + " max-width" + " table-loader"}>
            <thead>
              <tr>
                {headingColumns.map((data, index) => {
                  return (
                    <th key={index}>
                      {data}
                      {!toggleSort.status && (
                        <span
                          onClick={() =>
                            setToggleSort({
                              index: index,
                              status: !toggleSort.status,
                            })
                          }
                        >
                          <FontAwesomeIcon
                            icon={"angle-down"}
                            alt={"open"}
                            className={"sort-icon"}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                      {toggleSort.status && toggleSort.index === index && (
                        <span
                          onClick={() =>
                            setToggleSort({
                              index: index,
                              status: !toggleSort.status,
                            })
                          }
                        >
                          <FontAwesomeIcon
                            icon={"angle-up"}
                            alt={"open"}
                            className={"sort-icon active-sort"}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                      {toggleSort.status && toggleSort.index !== index && (
                        <span
                          onClick={() =>
                            setToggleSort({
                              index: index,
                              status: !toggleSort.status,
                            })
                          }
                        >
                          <FontAwesomeIcon
                            icon={"angle-down"}
                            alt={"open"}
                            className={"sort-icon"}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {!isReady && useLoader ? (
                <TableLoader tableHeaders={headingColumns} />
              ) : (
                data
              )}
            </tbody>
          </table>
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
            footerClass={givenClass}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        </div>
      );
    }

    //COMMON TABLE
    else {
      return (
        <div className="table-container transaction-table-cont">
          <div className="search-table-container row"></div>
          <table className={tableClass + " max-width" + " table-loader"}>
            <thead>
              <tr>
                {headingColumns.map((data, index) => {
                  return (
                    <th key={index} className="text-left">
                      {data}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {!isReady && useLoader ? (
                <TableLoader tableHeaders={headingColumns} data={data} />
              ) : (
                data
              )}
            </tbody>
          </table>
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
            footerClass={givenClass}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        </div>
      );
    }
  }
}
Table.propTypes = {
  id: PropTypes.number,
  clickable: PropTypes.bool,
  type: PropTypes.string,
  subHeadingColumns: PropTypes.array,
  movableColumns: PropTypes.array,
  givenClass: PropTypes.string,
  withSubData: PropTypes.bool,
  setID: PropTypes.any,
  useLoader: PropTypes.bool,
  isReady: PropTypes.bool,
  exportToExcel: PropTypes.bool,
  containerId: PropTypes.number,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  breakOn: PropTypes.oneOf(["small", "medium", "large"]),
  toggleSort: PropTypes.any,
  setToggleSort: PropTypes.any,
};

export default Table;
