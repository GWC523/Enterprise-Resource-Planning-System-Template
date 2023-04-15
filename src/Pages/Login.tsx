import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import toast from "react-hot-toast";
import { LoginUser } from "ApiCalls/authApi";
import { validateLogin } from "Helpers/Validations/LoginValidation";
import InputError from "Components/InputError/InputError";
import { refreshPage } from "Helpers/Utils/Common";
import { toastStyle } from "Helpers/Constants/StyleConstants";


//Images
import loginBanner from "../Assets/Images/login_banner.png";
import Button from "Components/Button/Button";

const Login: React.FC = () => {

  //States
  const [showPassword, setShowPassword] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const [isError, setError] = useState({
    username: false,
    password: false,
  });

  const [isClicked, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setLoginCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function submit() {
    /**SAMPLE CREDENTIALS:
     *  username: user
     *  password: user@123
     * **/

    //VALIDATE REQUIRED INPUTS
    if (validateLogin(loginCredentials, setError) && !isClicked) {
      setClick(true);
      setIsLoading(true);
      //INSERT POST REQUEST HERE
      const response = await LoginUser(
        loginCredentials.username,
        loginCredentials.password,
      );

      //HANDLE CONSOLE LOGS
      console.log(response);
      //HANDLE RESPONSE HERE
      if (response?.data?.status !== 200) {
        toast.error(response.data.messages.error, {
         style: toastStyle()
        });

        setIsLoading(false);
      } else {
        toast.success("Successful Login!", {
          style: toastStyle(),
        });

        setIsLoading(false);

        //SAVE ACCOUNT INFO TO LOCAL STORAGE
        localStorage.setItem("user", JSON.stringify(response.data.data.id));
        localStorage.setItem(
          "name",
          JSON.stringify(
            response.data.data.first_name + " " + response.data.data.last_name,
          ),
        );
        localStorage.setItem("type", JSON.stringify(response.data.data.type));
        localStorage.setItem("role", JSON.stringify(response.data.data.role));
        localStorage.setItem(
          "user-key",
          JSON.stringify(response.data.data.api_key).replace(/['"]+/g, ""),
        );
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
        setTimeout(() => {
          refreshPage();
        }, 2000);
      }
      setClick(false);
    }
  }

  return (
    <div>
      <div className="row login-container">
        <div className="col-lg-7 d-flex justify-content-center login-left-side">
          {/** COMPANY BANNER OR LOGO IS PLACED HERE **/}
          <img src={loginBanner} alt={"logo"} className="login-logo"></img>
        </div>
        <div className="col-lg-5 d-flex justify-content-left login-right-side">
          <ul className="background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="login-form">
            <div className="switch"></div>
            <div className="login-header">
              <h1 className="welcome-banner">Welcome</h1>
              <h2 className="instructions-banner">
                Please enter username and password to login.
              </h2>
            </div>
            <div>
              <div className="username-wrapper">
                <input
                  type="text"
                  data-testid="username-input"
                  name="username"
                  placeholder="Username"
                  className="login-input username-input"
                  autoComplete="off"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="user-icon">
                <FontAwesomeIcon icon={"user"} aria-hidden="true" />
              </div>
              <InputError
                isValid={isError.username}
                message={"Username is required"}
              />
            </div>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                data-testid="password-input"
                name="password"
                placeholder="Password"
                className="login-input"
                autoComplete="new-password"
                onChange={(e) => handleChange(e)}
              />
              <div className="eye-icon">
                <FontAwesomeIcon
                  icon={showPassword ? "eye" : "eye-slash"}
                  className={showPassword ? "eye" : "eye-slash"}
                  aria-hidden="true"
                  onClick={() => togglePassword()}
                />
              </div>
            </div>
            <div className="password-icon">
              <FontAwesomeIcon icon={"lock"} aria-hidden="true" />
            </div>
            <InputError
              isValid={isError.password}
              message={"Password is required"}
            />
            <br />
            <br />
            <div>
              {/*** On click, button shows a spinning loader ****/}
              <Button
                title="LOGIN"
                role="login"
                className="login-btn"
                onClick={submit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
