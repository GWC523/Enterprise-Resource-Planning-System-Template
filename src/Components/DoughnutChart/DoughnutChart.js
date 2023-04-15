import React, {useState} from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Row, Col } from "react-bootstrap";
import { saveAs } from "file-saver"
import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//css
import "./DoughnutChart.css"
import { numberWithCommas } from "Helpers/Utils/Common";

ChartJS.register(ArcElement, Tooltip);

export const earnings = [
  {
    label: "Deposit",
    value: 7000
  },
  {
    label: "Expense",
    value: 1500
  },
  {
    label: "Payable",
    value: 3000
  }
]

export const data = {
  datasets: [
    {
      label: "$",
      data: [1500,3000,7000],
      backgroundColor: [
        "rgba(94, 96, 240, 0.2)",
        "rgba(94, 96, 240, 0.5)",
        "rgba(94, 96, 240, 1)",
      ],
    },
  ],
};

const getCanvas = () => {
    //save to png
    const canvasSave = document.getElementById("earning-in-month");
    canvasSave.toBlob(function (blob) {
    saveAs(blob, "earning-in-month-" + new Date().toDateString() + ".png")
    })
}


export function DoughnutChart() {

  const [visible, setVisible] = useState(false);

  const options = {
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map(data => {
          sum += data;
        });
        let percentage = (value * 100 / sum).toFixed(2) + "%";
        return percentage;
      },
      color: "#000000",
      font: {
        weight: "bold"
      }
    }
  }
};

  return (
    <div className="data-visualization-cont-2 card-cont">
     <Row>
        <Col>
          <div className="card-label-2">Earning in Month</div>
        </Col>
         <Col className="d-flex justify-content-end">
                 {!visible && (<a onClick={() => setVisible(true)} className="download-icon-2">
                  <FontAwesomeIcon
                    icon={"bars"}
                    title={"download"}
                    aria-hidden="true"
                    className="download-icon"
                  />
                </a>)}
                {visible && (
                  <>
                  <div className="popup-backdrop" onClick={() => setVisible(false)}></div>
                  <div className="popup card-cont-2" id="small-popup">
                    <ul className="dropdown">
                      <li onClick={() => getCanvas()}>PNG</li>
                      <CSVLink data={!earnings ? [] : earnings} filename={"earning-in-month-" + new Date().toDateString()}>
                        <li onClick={() => getCanvas()}>CSV</li>
                      </CSVLink>
                    </ul>
                  </div>
                  </>
                )}
          </Col>
     </Row>
     <Row>
        <Col xs={7}>
          <div className="doughnut-container d-flex justify-content-center">
            <Doughnut options={options} data={data} plugins={[ChartDataLabels]} id="earning-in-month"/>
          </div>
        </Col>
        <Col xs={5}>
          <ul className="earning-legend">
            <li>{earnings[0].label}: ${numberWithCommas(earnings[0].value)}</li>
            <li>{earnings[1].label}: ${numberWithCommas(earnings[1].value)}</li>
            <li>{earnings[2].label}: ${numberWithCommas(earnings[2].value)}</li>
          </ul>
        </Col>
     </Row>
    </div>
  );
}
