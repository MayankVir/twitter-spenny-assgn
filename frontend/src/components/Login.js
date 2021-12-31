import { useState } from "react";
import "../App.css";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  if (localStorage.getItem("token")) {
    navigate("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    username.trim();
    password.trim();
    if (username.length && password.length) {
      authService
        .login(username, password)
        .then((response) => {
          if (response.data.user) {
            toast.success("Login successfull");
            localStorage.setItem("token", response.data.user);
            navigate("/dashboard");
          } else if (response.data.error) {
            toast.error("Invalid Login Credentials");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
        });
    } else {
      toast.error("Invalid Username or Password");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="home">
        <div className="home__img">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="#1D9BF0">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        <div className="home__loginSignupBtn">
          <h1>Happening Now</h1>
          <h3>Join Twitter Today.</h3>

          <form onSubmit={handleSubmit}>
            <div className="home__username">
              <label htmlFor="">Username</label>
              <input type="text" onChange={handleUsername} />
            </div>
            <div className="home__password">
              <label htmlFor="">Password</label>
              <input type="password" onChange={handlePassword} />
            </div>
            <div>
              {loading ? (
                <>
                  <button type="submit" className="home__loginBtnBlur" disabled>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      link="http://www.w3.org/1999/xlink"
                      style={{
                        margin: "0px 10px",
                        background: "#155d8d",
                        shapeRendering: "auto",
                      }}
                      width="30px"
                      height="30px"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        stroke="white"
                        stroke-width="10"
                        r="35"
                        stroke-dasharray="164.93361431346415 56.97787143782138"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          repeatCount="indefinite"
                          dur="1s"
                          values="0 50 50;360 50 50"
                          keyTimes="0;1"
                        ></animateTransform>
                      </circle>
                    </svg>{" "}
                    Log In
                  </button>
                </>
              ) : (
                <>
                  <button type="submit" className="home__loginBtn">
                    Log In
                  </button>
                </>
              )}
            </div>
          </form>
          <div className="home__registerRedirect">
            Create an account -
            <Link to="/register" className="loginRegisterBtn">
              {" "}
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
