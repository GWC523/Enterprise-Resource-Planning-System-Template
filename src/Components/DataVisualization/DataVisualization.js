import React, {useState} from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from "chart.js"
import { Line } from "react-chartjs-2"
import { saveAs } from "file-saver"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";
import { CSVLink } from "react-csv";

//css
import "./DataVisualization.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
)

export const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
}

export const exportData = [
  { month: "Jan",
    value: 150
  },
  { month: "Feb",
    value: 160
  },
  { month: "Mar",
    value: 150
  },
  { month: "Apr",
    value: 170
  },
  { month: "May",
    value: 140
  },
  { month: "Jun",
    value: 150
  },
  { month: "Jul",
    value: 130
  },
  { month: "Aug",
    value: 150
  },
  { month: "Sep",
    value: 150
  },
  { month: "Oct",
    value: 140
  },
  { month: "Nov",
    value: 150
  },
  { month: "Dec",
    value: 160
  }
]

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

const getData = (canvas) => {
  const ctx = canvas.getContext("2d")
  const gradient = ctx.createLinearGradient(0, 300, 0, 0)
  gradient.addColorStop(0.5, "rgb(94, 96, 240, 0.1)")
  gradient.addColorStop(0.6, "rgb(94, 96, 240, 0.3)")
  gradient.addColorStop(0.7, "rgb(94, 96, 240, 0.5)")
  gradient.addColorStop(0.8, "rgb(94, 96, 240, 0.8)")
  gradient.addColorStop(1, "rgb(94, 96, 240, 1)")

  return {
    labels,
    elements: {
      line: {
        tension: 0 // disables bezier curves
      }
    },
    datasets: [
      {
        data: [150, 160, 150, 170, 140, 150, 130, 150, 150, 140, 150, 160],
        backgroundColor: gradient,//ctx.createLinearGradient(0, 300, 0, 0),
        borderColor: "rgb(94, 96, 240, 1)",
        fill: true,
        tension: 0.5,
        pointRadius: 5,
        pointBackgroundColor: "#ffff",
        pointBorderWidth: 3,
        pointHoverBorderColor: "rgb(94, 96, 240, 1)",
        pointHoverRadius: 8,
        pointHoverBorderWidth: 5
      }
    ]
  }
}

const getCanvas = () => {
    //save to png
    const canvasSave = document.getElementById("visit-insights");
    canvasSave.toBlob(function (blob) {
    saveAs(blob, "visit-insights-" + new Date().toDateString() + ".png")
    })
}

const canvas = document.createElement("canvas")
const chartData = getData(canvas)


function DataVisualization() {

  const [visible, setVisible] = useState(false);

  return (<>
        <div className="data-visualization-cont card-cont">
            <div className="card-label">
              <Row>
                <Col>
                  Visit Insights 
                </Col>
                <Col className="d-flex justify-content-end">
                 {!visible && (<a onClick={() => setVisible(true)} className="download-icon">
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
                      <CSVLink data={!exportData ? [] : exportData} filename={"visit-insights-" + new Date().toDateString()}>
                        <li>CSV</li>
                      </CSVLink>
                    </ul>
                  </div>
                  </>
                )}

                </Col>
              </Row>
            <Row>
                <Line options={options} data={chartData} id="visit-insights"/>
            </Row>
           </div>
        </div>
        </>)
}

export default DataVisualization
