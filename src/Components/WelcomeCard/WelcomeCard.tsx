import React from "react";
import PropTypes from "prop-types";


//css
import "./WelcomeCard.css";
import { getName } from "Helpers/Utils/Common";

const isPositive = (num:any) => {
  if(num >= 0) {
    return <span className="positive">{num}%</span>
  } else {
    return <span className="negative">{num}%</span>
  }
}

function WelcomeCard({user}) {

  return (
    <div className="welcome-card-cont">
        <div className="row">
            <div className="col-sm-12">
                <div className="welcome-card-details">
                    <span className="greetings">Welcome back, {getName()}</span>
                    <br/>
                    <span>Total Income is {isPositive(18.87)} higher vs previous month</span>
                 
                </div>
            </div>
        </div>
    </div>
  )
}

WelcomeCard.propTypes = {
  user: PropTypes.string,
};

export default WelcomeCard