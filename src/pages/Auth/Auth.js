import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Card, CardMedia,
} from "@mui/material";

import ButtonMui from "@mui/material/Button";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Avatar, Button } from 'components/atoms';
import Input from 'components/atoms/Input';
import { signin, signup } from "../../store/actions/auth";
import icon from "../../assets/images/icon.png";

import { toastProperties } from "../../utils/toastProperties"
import backgroundStyle from "./backgroundStyle";


const theme = createTheme();

export default function SignUp() {


  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  };
  const [form, setForm] = useState(initialState);
  const [fileName, setFileName] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [disableSignIn, setDisableSignIn] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [errorPasswordMatch, setErrorMatch] = useState("");
  const [errorPasswordValidated, setErrorValidated] = useState("");

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  //  submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableSignIn(true);
    if (isSignup) {
      dispatch(
        signup(
          form,
          (res) => {
            toast.success(res?.data.message, {
              toastProperties
            });
          },
          (error) => {
            toast.error(
              error?.response?.data?.message ||
              "You dont have Authorized networks",
              {
                toastProperties
              }
            );
          }
        )
      );
    } else {
      dispatch(
        signin(
          form,
          (res) => {
            toast.success(res?.data.message, {
              toastProperties
            });
            history.push("/")
          },
          (error) => {
            toast.error(
              error?.response?.data?.message ||
              "You dont have Authorized networks",
              {
                toastProperties
              }
            );
          }
        )
      );
    }
    setDisableSignIn(false);
  }; // end submit form

  // checking match password
  useEffect(() => {
    if (form.password !== form.confirmPassword) {
      setErrorMatch("Password don't match")
    } else {
      setErrorMatch("")
    }
  }, [form.password, form.confirmPassword]);
  // end checking match password

  // validation password
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  useEffect(() => {
    const checkPass = validatePassword(form.password);
    if (form.password && checkPass === false) {
      setErrorValidated(`Your password must contain:\n At least 8 characters\n At least 3 of the following:\n Lower case letters (a-z)\n Upper case letters (A-Z)\n Numbers (0-9)\n Special characters (e.g. !@#$%^&*)`)
    } else {
      setErrorValidated("")
    }
  }, [form.password]);
  // end validation password

  // handle change form
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, [e.target.name]: file });
    setFileName(file.name);
  };

  // end handle change form

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Card
          variant="outlined"
          sx={{ marginTop: 2, }}
        >

          <Box sx={backgroundStyle}>
            <CardMedia
              component="img"
              style={{ width: "30%", height: "auto", }}
              image={icon}
            />
            <Typography variant="h6" sx={{ fontSize: '30px' }}>AWARD</Typography>
          </Box>
        </Card>
        <Card
          variant="outlined"
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box noValidate sx={{ mt: 3 }} >  {/* Box kedua */}
            <form onSubmit={handleSubmit} autoComplete="on">
              <Grid container spacing={2}>
                {isSignup && (
                  <>
                    <Input
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={onChange}
                      half
                    />
                    <Input
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={onChange}
                      half
                    />
                  </>
                )}
                <Input
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
                <Input
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  onChange={onChange}
                  type={showPassword ? 'text' : 'password'}
                  handleShowPassword={handleShowPassword}
                  isLogin={true}
                  error={Boolean(errorPasswordValidated)}
                  helperText={errorPasswordValidated}
                />
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={onChange}
                  handleShowPassword={handleShowPassword}
                  error={Boolean(errorPasswordMatch)}
                  helperText={errorPasswordMatch}
                />
                {isSignup && (
                  <>
                    <Grid item xs={12}>
                      <ButtonMui
                        sx={{
                          zIndex: 1,
                          marginTop: "-1px",
                          paddingTop: "8px",
                          paddingBottom: "9px",
                        }}
                        variant="contained"
                        component="label"
                      >
                        Browse
                        <input
                          type="file"
                          name="file"
                          hidden
                          onChange={onChangeFile}
                        />
                      </ButtonMui>
                      <TextField
                        inputProps={{ style: { textAlign: "center" } }}
                        disabled
                        size="small"
                        sx={{ marginLeft: "-2rem", border: "none" }}
                        onChange={onChangeFile}
                        value={fileName}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Button
                onClick={handleSubmit}
                type="submit"
                disabled={disableSignIn}
                fullWidth
                variant="contained"
                sx={{
                  mt: 3, mb: 2, backgroundColor: '#29b6f7',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#1d8bbc',
                  },
                  '&:focus': {
                    boxShadow: '0 0 0 0.2rem rgba(0,200,255,.5)',
                  },
                }}
                title={isSignup ? "Sign Up" : "Sign In"}
              />
              <Grid container justifyContent="flex-end">
                <Grid item xs={12} sm={6} textAlign='left'>
                  <Typography variant="subtitle1" onClick={switchMode}>
                    {isSignup
                      ? "Already have an account? Sign In"
                      : "Don't have an account? Sign Up"}
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Card>

      </Container>
    </ThemeProvider >
  );
}
