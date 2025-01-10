import React, { useRef, useState } from "react";
import "./Login.css";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../../images/logo-2.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { base64Encode } from "../util/APICalls";
import { Traft_Login_Api } from "../util/APIs";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkIfLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };
  const [isLoggedIn] = useState(checkIfLoggedIn());

  const signIn = async (email, password) => {
    try {
      await axios
        .post(Traft_Login_Api, { email, password })
        .then((response) => {
          console.log(response.data);
          if (response.data == "Error") {
            navigate("/login");
          } else {
            const token = base64Encode(response.data + "#_wretryyuil");
            //   setIsError(false);
            localStorage.setItem("token", token);
            navigate("/");
          }
        });
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          const customError = new Error(
            error.response.data.message || "An error occurred"
          );
          customError.status = status;
          throw customError;
        }
      }
    }
  };

  const processLogin = (event) => {
    event.preventDefault();
    signIn(email.current.value, password.current.value);
  };

  return (
    <div className="logincontainer">
      <div className="leftPan">
        <div className="leftPanBg" />
      </div>
      <div className="rightPan">
        <div className="rightPanContainer">
          <div className="banner">
            <img src={logo} alt="logo" />
          </div>
          <div className="bannerTitle">
            <p>Welcome to Traft! 👋🏻</p>
          </div>
          <div className="bannerDesc">
            <p>
              Sign in to access your account and start organizing your Crypto
              efficiently.
            </p>
          </div>
          <form onSubmit={(event) => processLogin(event)}>
            {isError && (
              <p className="loginError">Invalid username and password </p>
            )}
            <TextField
              inputRef={email}
              sx={{
                width: "100%",
                marginBottom: "1em",
                "& .MuiFormLabel-root": {
                  color: "rgb(177, 177, 176)",
                  width: "100%",
                  "&.Mui-focused": {
                    color: "#7c7cff", // Color when focused
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7c7cff", // Border color when focused
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-root": {
                  borderRadius: "9px",
                },
              }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{
                  "&.MuiInputLabel-root": {
                    color: "rgb(177, 177, 176)",
                    "&.Mui-focused": {
                      color: "#6c6cfc", // Color when focused
                    },
                  },
                }}
              >
                Password
              </InputLabel>
              <OutlinedInput
                required
                inputRef={password}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6c6cfc",
                    borderWidth: "2px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "9px",
                  },
                }}
                label="Password"
              />
            </FormControl>
            <div className="otherOperation">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#6c6cfc", // Change the color when checked
                        },
                        color: "rgb(186, 184, 182)", // Default color
                      }}
                    />
                  }
                  label=" Remember Me"
                  sx={{ color: "rgb(177, 177, 176)" }}
                />
              </FormGroup>
              <a>Forgot Password?</a>
            </div>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                fontSize: "1em",
                backgroundColor: "#7c7cff",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#6c6cfc",
                },
              }}
            >
              SIGN IN
            </Button>
          </form>
          <div className="newRegister">
            <p className="createAccountLink">
              New on our platform? <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
